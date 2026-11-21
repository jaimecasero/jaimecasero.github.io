const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const script = html.match(/<script>\s*(\/\/ ─── Audio Engine[\s\S]*?)<\/script>/);
assert.ok(script, 'App script not found');

const elements = new Map();
function element() {
  return {
    style: {}, dataset: {}, classList: { add() {}, remove() {} },
    appendChild() {}, querySelectorAll() { return []; }
  };
}
const context = vm.createContext({
  document: {
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, element());
      return elements.get(id);
    },
    createElement: element
  },
  performance: { now: () => 0 },
  setTimeout() {}
});
vm.runInContext(script[1], context);
const run = code => vm.runInContext(code, context);

test('C modes use the correct diatonic spelling', () => {
  const expected = [
    'C4 D4 E4 F4 G4 A4 B4',
    'C4 D4 Eb4 F4 G4 A4 Bb4',
    'C4 Db4 Eb4 F4 G4 Ab4 Bb4',
    'C4 D4 E4 F#4 G4 A4 B4',
    'C4 D4 E4 F4 G4 A4 Bb4',
    'C4 D4 Eb4 F4 G4 Ab4 Bb4',
    'C4 Db4 Eb4 F4 Gb4 Ab4 Bb4'
  ];
  assert.deepEqual(Array.from(run(`MODES.map(mode =>
    mode.iv.map(iv => modeMidiToNoteName(60 + iv, 60, mode)).join(' '))`)), expected);
});

test('sharp roots retain scale letters, double sharps and written octaves', () => {
  assert.equal(run(`MODES[0].iv.map(iv =>
    modeMidiToNoteName(61 + iv, 61, MODES[0])).join(' ')`),
    'C#4 D#4 E#4 F#4 G#4 A#4 B#4');
  assert.equal(run(`MODES[3].iv.map(iv =>
    modeMidiToNoteName(68 + iv, 68, MODES[3])).join(' ')`),
    'G#4 A#4 B#4 C##5 D#5 E#5 F##5');
  assert.equal(run('modeMidiToNoteName(84, 61, MODES[0])'), 'B#5');
});

test('every selectable key and mode spells generated notes with the right pitches and letters', () => {
  const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const letters = 'CDEFGAB';
  const pitches = [0, 2, 4, 5, 7, 9, 11];
  for (let root = 60; root < 72; root++) {
    for (let mode = 0; mode < 7; mode++) {
      const notes = Array.from(run(`genMelody(${root}, MODES[${mode}])`));
      const intervals = Array.from(run(`MODES[${mode}].iv`));
      for (const midi of notes) {
        const name = run(`modeMidiToNoteName(${midi}, ${root}, MODES[${mode}])`);
        const match = /^([A-G])([#b]*)(-?\d+)$/.exec(name);
        assert.ok(match, name);
        const degree = intervals.indexOf((midi - root + 12) % 12);
        assert.equal(match[1], letters[(letters.indexOf(names[root % 12][0]) + degree) % 7]);
        const accidental = [...match[2]].reduce((n, c) => n + (c === '#' ? 1 : -1), 0);
        assert.equal((Number(match[3]) + 1) * 12 + pitches[letters.indexOf(match[1])] + accidental, midi);
      }
    }
  }
});

test('mode answer reveal uses spelled notes and preserves characteristic highlights', () => {
  run(`question = { type: 'mode', modeIdx: 1, rootMidi: 60, melody: [60, 62, 63, 69, 70] };
    answered = false; handleAnswer(1);`);
  assert.match(elements.get('mgFeedback').innerHTML,
    /<span>C4<\/span> <span>D4<\/span> <span class="note-char">Eb4<\/span> <span class="note-char">A4<\/span> <span>Bb4<\/span>/);
  assert.equal(run('midiToNoteName(63)'), 'D#4');
});
