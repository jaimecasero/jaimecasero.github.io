const SERVICE_UUID = "0000ffe5-0000-1000-8000-00805f9a34fb";

let audioCtx = null;

function getAudioCtx() {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
}

function playKickSynth(velocity) {
    const ctx = getAudioCtx();
    const vol = Number(document.getElementById("audioVol").value) * (velocity / 127);
    const now = ctx.currentTime;

    // Sine sweep: 150 Hz → 40 Hz over 80 ms (body of the kick)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
    oscGain.gain.setValueAtTime(vol, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);

    // Noise transient: click/snap at the attack
    const bufSize = ctx.sampleRate * 0.04;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1);
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(vol * 0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
}

// Commands per datasheet section 5.1
const CMD_RATE_200HZ  = [0xFF, 0xAA, 0x03, 0x0A, 0x00];
const CMD_SAVE        = [0xFF, 0xAA, 0x00, 0x00, 0x00];
const CMD_BATT        = [0xFF, 0xAA, 0x27, 0x64, 0x00];

// Detector states
const IDLE     = 0;
const TRACKING = 1;
const COOLDOWN = 2;

const app = {
    midiOutput: null,
    writeChar: null,
    imu: { ax:0, ay:0, az:0, wx:0, wy:0, wz:0, roll:0, pitch:0, yaw:0 },
    kick: {
        threshold:      2.5,   // g — triggers tracking
        resetThreshold: 0.5,   // g — signal must drop below this to re-arm after a kick
        minCooldownMs:  80,    // ms — minimum hold in COOLDOWN to suppress same-strike bounce
        minVel: 40,
        maxVel: 127,
        state:      IDLE,
        peak:       0,
        trackStart: 0,
        fireTime:   0,
        PEAK_WINDOW_MS: 40
    }
};

function s16(lo, hi) {
    let v = (hi << 8) | lo;
    if (v > 32767) v -= 65536;
    return v;
}

async function sendCmd(bytes) {
    if (!app.writeChar) return;
    await app.writeChar.writeValueWithoutResponse(new Uint8Array(bytes));
}

async function connectBluetooth() {
    const btn = document.getElementById("connectBtn");
    btn.disabled = true;
    setStatus("Connecting…");
    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ namePrefix: "WT" }],
            optionalServices: [SERVICE_UUID]
        });
        setStatus(device.name);
        const server  = await device.gatt.connect();
        const service = await server.getPrimaryService(SERVICE_UUID);
        const chars   = await service.getCharacteristics();

        const notify = chars.find(c => c.properties.notify);
        // write or writeWithoutResponse
        app.writeChar = chars.find(c => c.properties.writeWithoutResponse || c.properties.write) || null;

        await notify.startNotifications();
        notify.addEventListener("characteristicvaluechanged", onPacket);

        // Set 100 Hz and save so detection has enough resolution
        await sendCmd(CMD_RATE_200HZ);
        await sendCmd(CMD_SAVE);

        // Request battery level right after connect
        await readBattery();

        btn.innerText = "Connected";
        btn.style.background = "#197";
    } catch(e) {
        btn.disabled = false;
        setStatus("Failed: " + e.message);
    }
}

async function readBattery() {
    await sendCmd(CMD_BATT);
    // Response arrives via onPacket as a 0x55 0x71 packet; handled there
}

function batteryPct(raw) {
    if (raw > 396) return 100;
    if (raw > 393) return 90;
    if (raw > 387) return 75;
    if (raw > 382) return 60;
    if (raw > 379) return 50;
    if (raw > 377) return 40;
    if (raw > 373) return 30;
    if (raw > 370) return 20;
    if (raw > 368) return 15;
    if (raw > 350) return 10;
    if (raw > 340) return 5;
    return 0;
}

function onPacket(event) {
    const b = new Uint8Array(event.target.value.buffer);
    if (b.length < 2 || b[0] !== 0x55) return;

    if (b[1] === 0x61 && b.length >= 20) {
        // Default streaming packet: accel + gyro + angle
        app.imu.ax = s16(b[2],  b[3])  * 16   / 32768;
        app.imu.ay = s16(b[4],  b[5])  * 16   / 32768;
        app.imu.az = s16(b[6],  b[7])  * 16   / 32768;
        app.imu.wx = s16(b[8],  b[9])  * 2000 / 32768;
        app.imu.wy = s16(b[10], b[11]) * 2000 / 32768;
        app.imu.wz = s16(b[12], b[13]) * 2000 / 32768;
        app.imu.roll  = s16(b[14], b[15]) * 180 / 32768;
        app.imu.pitch = s16(b[16], b[17]) * 180 / 32768;
        app.imu.yaw   = s16(b[18], b[19]) * 180 / 32768;
        detectKick();
        return;
    }

    if (b[1] === 0x71 && b.length >= 6) {
        // Single-register response: 0x55 0x71 regL regH d0L d0H …
        const reg = (b[3] << 8) | b[2];
        if (reg === 0x0064) {
            // Battery voltage register
            const raw = (b[5] << 8) | b[4];
            const pct = batteryPct(raw);
            updateBatteryUI(pct);
        }
    }
}

function tapAxis() {
    const axis = document.getElementById("tapAxis").value;
    const i = app.imu;
    if (axis === "x") return Math.abs(i.ax);
    if (axis === "z") return Math.abs(i.az);
    return Math.abs(i.ay);
}

function detectKick() {
    const k = app.kick;
    const now = performance.now();
    const dyn = tapAxis();

    if (k.state === IDLE) {
        if (dyn > k.threshold) {
            k.state     = TRACKING;
            k.peak      = dyn;
            k.trackStart = now;
        }

    } else if (k.state === TRACKING) {
        if (dyn > k.peak) k.peak = dyn;
        if (now - k.trackStart > k.PEAK_WINDOW_MS) {
            k.state    = COOLDOWN;
            k.fireTime = now;
            const vel = Math.min(k.maxVel,
                Math.round(k.minVel + (k.maxVel - k.minVel) * (k.peak - k.threshold) / 6));
            fireKick(vel);
        }

    } else { // COOLDOWN
        // Re-arm only once the signal has settled AND min hold has elapsed —
        // prevents the same strike's tail from re-triggering immediately.
        if ((now - k.fireTime) > k.minCooldownMs && dyn < k.resetThreshold) {
            k.state = IDLE;
        }
    }
}

function outputMode() {
    return document.getElementById("modeMidi").classList.contains("active") ? "midi" : "audio";
}

function fireKick(velocity) {
    if (outputMode() === "midi") {
        sendMidiNote(velocity);
    } else {
        playKickSynth(velocity);
    }
    flashKick(velocity);
}

function sendMidiNote(velocity) {
    if (!app.midiOutput) return;
    const note = Number(document.getElementById("note").value);
    app.midiOutput.send([0x99, note, velocity]);
    setTimeout(() => app.midiOutput.send([0x89, note, 0]), 50);
}

function flashKick(velocity) {
    const el = document.getElementById("kickIndicator");
    el.classList.add("active");
    document.getElementById("kickVel").innerText = "vel " + velocity;
    setTimeout(() => el.classList.remove("active"), 200);
}

function updateBatteryUI(pct) {
    const fill  = document.getElementById("batteryFill");
    const label = document.getElementById("batteryPct");
    const icon  = document.getElementById("batteryIcon");
    const w = Math.round(20 * pct / 100);
    fill.setAttribute("width", w);
    label.innerText = pct + "%";
    const color = pct > 30 ? "#4c4" : pct > 15 ? "#fa0" : "#e33";
    fill.setAttribute("fill", color);
    icon.style.color = "#888";
}

function setStatus(msg) {
    document.getElementById("status").innerText = msg;
}

function render() {
    const i = app.imu;
    document.getElementById("ax").innerText  = i.ax.toFixed(2) + " g";
    document.getElementById("ay").innerText  = i.ay.toFixed(2) + " g";
    document.getElementById("az").innerText  = i.az.toFixed(2) + " g";
    document.getElementById("wx").innerText  = i.wx.toFixed(1) + " °/s";
    document.getElementById("wy").innerText  = i.wy.toFixed(1) + " °/s";
    document.getElementById("wz").innerText  = i.wz.toFixed(1) + " °/s";
    document.getElementById("dyn").innerText = tapAxis().toFixed(2) + " g";
    requestAnimationFrame(render);
}

let midiAccess;

async function initMidi() {
    try {
        midiAccess = await navigator.requestMIDIAccess();
    } catch(e) {
        document.getElementById("midiStatus").innerText = "MIDI unavailable";
        return;
    }
    const select = document.getElementById("midiOutputs");

    function refreshOutputs() {
        select.innerHTML = "";
        for (const output of midiAccess.outputs.values()) {
            const opt = document.createElement("option");
            opt.value = output.id;
            opt.textContent = output.name;
            select.appendChild(opt);
        }
        if (select.options.length) {
            select.selectedIndex = 0;
            select.onchange();
        }
    }

    select.onchange = () => {
        app.midiOutput = midiAccess.outputs.get(select.value);
    };

    midiAccess.onstatechange = refreshOutputs;
    refreshOutputs();
}

function syncKickSettings() {
    const k = app.kick;
    k.threshold       = Number(document.getElementById("threshold").value);
    k.resetThreshold  = Number(document.getElementById("resetThreshold").value);
    k.minCooldownMs   = Number(document.getElementById("minCooldown").value);
    k.minVel          = Number(document.getElementById("minVel").value);
    k.maxVel          = Number(document.getElementById("maxVel").value);
}

document.getElementById("connectBtn").onclick = connectBluetooth;
document.getElementById("testBtn").onclick    = () => fireKick(100);
document.querySelectorAll(".kick-setting").forEach(el => el.addEventListener("input", syncKickSettings));

document.getElementById("modeAudio").onclick = () => {
    document.getElementById("modeAudio").classList.add("active");
    document.getElementById("modeMidi").classList.remove("active");
    document.getElementById("audioPanel").hidden = false;
    document.getElementById("midiPanel").hidden  = true;
};
document.getElementById("modeMidi").onclick = () => {
    document.getElementById("modeMidi").classList.add("active");
    document.getElementById("modeAudio").classList.remove("active");
    document.getElementById("midiPanel").hidden  = false;
    document.getElementById("audioPanel").hidden = true;
};

initMidi();
render();
