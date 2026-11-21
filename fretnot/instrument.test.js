const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const script = fs.readFileSync(path.join(__dirname, 'guitar.js'), 'utf8');

function createApp() {
    const strokes = [];
    let points = [];
    const canvasContext = {
        beginPath() { points = []; },
        moveTo(x, y) { points.push([x, y]); },
        lineTo(x, y) { points.push([x, y]); },
        stroke() { strokes.push(points); },
        clearRect() {}, fillRect() {}, arc() {}, fill() {}, fillText() {}
    };
    const elements = {
        keySelect: { value: '0' },
        modeSelect: { value: '12' },
        rootChordSelect: { value: '-1', options: Array.from({ length: 13 }, () => ({})) },
        chordSelect: { value: '0', options: Array.from({ length: 20 }, () => ({})) },
        visualizationSelect: { value: 'Natural' },
        tuningSelect: { value: '0', disabled: false },
        instrumentSelect: { value: 'guitar' },
        instrumentStatus: {},
        fixedTuningStatus: {},
        calculatedKeyInput: {},
        calculatedChordInput: {},
        settingsButton: { addEventListener() {} },
        settingsDialog: { showModal() {} },
        fretCanvas: {
            clientWidth: 400, clientHeight: 800, width: 0, height: 0,
            getContext() { return canvasContext; }, addEventListener() {}
        }
    };
    const loads = [];
    const programs = [];
    const notes = [];
    const alerts = [];
    const context = vm.createContext({
        window: {
            AudioContext: class { resume() {} },
            addEventListener() {},
            alert(message) { alerts.push(message); }
        },
        document: { getElementById(id) { return elements[id]; } },
        MIDI: {
            loadPlugin(options) { loads.push(options); },
            programChange(channel, program) { programs.push(program); },
            noteOn(channel, note) { notes.push(note); }
        },
        console: { log() {} }
    });
    vm.runInContext(script, context);
    context.window.onload();
    return { context, elements, loads, programs, notes, alerts, strokes };
}

function stringCount(app) {
    return app.strokes.filter(points =>
        points.length === 2 && points[0][1] === 0 && points[1][1] === 800).length;
}

test('switches between guitar and standard bass fretboards and pitches', () => {
    const app = createApp();
    const { context, elements, loads, programs, notes, strokes } = app;
    assert.equal(stringCount(app), 6);
    assert.equal(loads[0].instruments, 'acoustic_guitar_nylon');
    loads[0].onsuccess();
    assert.deepEqual(programs, [24]);

    elements.tuningSelect.value = '3';
    elements.instrumentSelect.value = 'bass';
    strokes.length = 0;
    context.changeInstrument();
    assert.equal(stringCount(app), 4);
    assert.equal(elements.tuningSelect.disabled, true);
    assert.equal(elements.tuningSelect.hidden, true);
    assert.equal(loads[1].instruments, 'slap_bass_1');
    context.canvasDownXY(50, 10, 1);
    assert.deepEqual(notes, []);
    loads[1].onsuccess();
    assert.deepEqual(programs, [24, 36]);
    assert.deepEqual(Array.from(context.retrieveTuning()), ['E', 'A', 'D', 'G']);
    for (const x of [50, 150, 250, 350]) context.canvasDownXY(x, 10, 1);
    context.canvasDownXY(50, 100, 1);
    assert.deepEqual(notes, [28, 33, 38, 43, 29]);

    elements.instrumentSelect.value = 'guitar';
    strokes.length = 0;
    context.changeInstrument();
    assert.equal(stringCount(app), 6);
    assert.equal(elements.tuningSelect.disabled, false);
    assert.equal(elements.tuningSelect.hidden, false);
    assert.equal(elements.tuningSelect.value, '3');
    assert.deepEqual(programs, [24, 36, 24]);
    assert.equal(loads.length, 2);
});

test('serializes soundfont loads when the selection changes during loading', () => {
    const { context, elements, loads, programs } = createApp();
    elements.instrumentSelect.value = 'bass';
    context.changeInstrument();
    assert.equal(loads.length, 1);
    loads[0].onsuccess();
    assert.equal(loads[1].instruments, 'slap_bass_1');
    elements.instrumentSelect.value = 'guitar';
    context.changeInstrument();
    loads[1].onsuccess();
    assert.deepEqual(programs, [24]);
});

test('reports soundfont failures and can retry after switching instruments', () => {
    const { context, elements, loads, alerts } = createApp();
    loads[0].onsuccess();
    elements.instrumentSelect.value = 'bass';
    context.changeInstrument();
    loads[1].onerror(new Error('offline'));
    assert.match(elements.instrumentStatus.textContent, /Failed to load bass/);
    assert.match(alerts[0], /offline/);
    elements.instrumentSelect.value = 'guitar';
    context.changeInstrument();
    elements.instrumentSelect.value = 'bass';
    context.changeInstrument();
    assert.equal(loads[2].instruments, 'slap_bass_1');
});

test('ukulele renders and plays re-entrant standard tuning with steel guitar sound', () => {
    const app = createApp();
    const { context, elements, loads, programs, notes, strokes } = app;
    loads[0].onsuccess();
    elements.tuningSelect.value = '3';
    elements.instrumentSelect.value = 'ukulele';
    strokes.length = 0;
    context.changeInstrument();
    assert.equal(stringCount(app), 4);
    assert.deepEqual(Array.from(context.retrieveTuning()), ['G', 'C', 'E', 'A']);
    assert.equal(elements.tuningSelect.disabled, true);
    assert.equal(elements.fixedTuningStatus.textContent, 'Standard: G4 C4 E4 A4');
    assert.equal(loads[1].instruments, 'acoustic_guitar_steel');
    loads[1].onsuccess();
    assert.deepEqual(programs, [24, 25]);
    for (const x of [50, 150, 250, 350]) context.canvasDownXY(x, 10, 1);
    context.canvasDownXY(50, 100, 1);
    const twelfthFret = (context.calculateFretHeight(12) + context.calculateFretHeight(13)) / 2;
    context.canvasDownXY(150, twelfthFret, 1);
    assert.deepEqual(notes, [67, 60, 64, 69, 68, 72]);

    elements.instrumentSelect.value = 'bass';
    context.changeInstrument();
    assert.equal(elements.fixedTuningStatus.textContent, 'Standard: E1 A1 D2 G2');
    loads[2].onsuccess();
    elements.instrumentSelect.value = 'ukulele';
    context.changeInstrument();
    assert.equal(programs.at(-1), 25);
    assert.equal(loads.length, 3);
    elements.instrumentSelect.value = 'guitar';
    context.changeInstrument();
    assert.equal(elements.tuningSelect.value, '3');
    assert.equal(elements.tuningSelect.disabled, false);
    assert.equal(elements.fixedTuningStatus.textContent, '');
    assert.equal(programs.at(-1), 24);
});

test('ukulele patterns account for C–E and stop at the last string', () => {
    const { context, elements, loads, strokes } = createApp();
    loads[0].onsuccess();
    elements.instrumentSelect.value = 'ukulele';
    context.changeInstrument();
    elements.visualizationSelect.value = 'Chair';
    context.renderFretboard();

    strokes.length = 0;
    context.drawNoteIndex(1, 1);
    const connector = strokes.find(points =>
        points.length === 2 && points[1][0] > points[0][0]);
    assert.ok(connector);
    assert.ok(connector[1][1] > connector[0][1]);

    strokes.length = 0;
    context.drawNoteIndex(4, 3);
    assert.equal(strokes.some(points =>
        points.length === 2 && points[1][0] > points[0][0]), false);
});
