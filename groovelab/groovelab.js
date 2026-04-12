'use strict';

// ============================================================
// INSTRUMENTS  — mapped to drum-ogg.js soundfont keys
// drum-ogg.js exposes MIDI.Soundfont.acoustic_grand_piano
// Key mapping: MIDI note = key_number - 50  (e.g. D6=86 → drum 36 = kick)
// ============================================================
const INSTRUMENTS = [
    { name: "Chinese", abbr: "CH",  key: "F#7" }, // MIDI 52 – Chinese Cymbal
    { name: "Splash",  abbr: "SP",  key: "A7"  }, // MIDI 55 – Splash Cymbal
    { name: "Cowbell", abbr: "CB",  key: "Bb7" }, // MIDI 56 – Cowbell
    { name: "Crash",   abbr: "CR",  key: "Eb7" }, // MIDI 49 – Crash Cymbal 1
    { name: "HH Open", abbr: "HHo", key: "C7"  }, // MIDI 46 – Open Hi-Hat
    { name: "HH Cls",  abbr: "HH",  key: "Ab6" }, // MIDI 42 – Closed Hi-Hat
    { name: "Ride",    abbr: "RD",  key: "F7"  }, // MIDI 51 – Ride Cymbal 1
    { name: "Ride Bell",abbr: "RB",  key: "G7"  }, // MIDI 53 – Ride Bell
    { name: "Hi Tom",  abbr: "T1",  key: "E7"  }, // MIDI 50 – High Tom
    { name: "Mid Tom", abbr: "T2",  key: "D7"  }, // MIDI 48 – Hi-Mid Tom
    { name: "Snare",   abbr: "SN",  key: "E6"  }, // MIDI 38 – Acoustic Snare
    { name: "Side Stk",abbr: "SS",  key: "Eb6" }, // MIDI 37 – Side Stick
    { name: "Flr Tom", abbr: "FT",  key: "G6"  }, // MIDI 45 – Low Tom
    { name: "Kick",    abbr: "KK",  key: "D6"  }, // MIDI 36 – Bass Drum 1
    { name: "Ped HH",  abbr: "PH",  key: "Bb6" }, // MIDI 44 – Pedal Hi-Hat
];
const N_INST  = INSTRUMENTS.length; // 15
const N_STEPS = 16; // preset array size

// ============================================================
// TIME SIGNATURES
// ============================================================
// subdiv: steps per "felt beat" (4 for simple, 6 for compound)
// steps: total grid columns per bar
const TIME_SIGNATURES = [
    { name: '2/4',  steps: 8,  subdiv: 4 }, // 2 beats × 4 sixteenths
    { name: '3/4',  steps: 12, subdiv: 4 }, // 3 beats × 4 sixteenths
    { name: '4/4',  steps: 16, subdiv: 4 }, // default
    { name: '5/4',  steps: 20, subdiv: 4 }, // 5 beats × 4 sixteenths
    { name: '7/4',  steps: 28, subdiv: 4 }, // 7 beats × 4 sixteenths
    { name: '6/8',  steps: 12, subdiv: 6 }, // 2 dotted-quarter beats × 6 steps
    { name: '12/8', steps: 12 , subdiv: 3 }, // 4 dotted-quarter beats × 6 steps
];

const instrumentGroups = [
    { name: "Cymbal",  rows: [0, 1, 2, 3, 6, 7] },
    { name: "Hi-Hat",  rows: [4, 5] },
    { name: "Toms",    rows: [8, 9] },
    { name: "Snare",   rows: [10, 11] },
    { name: "Flr Tom", rows: [12] },
    { name: "Kick",    rows: [13] },
    { name: "Ped HH",  rows: [14] },
];
const groupVolumeArray = [70, 80, 75, 90, 80, 100, 80];
const groupPanArray    = [0, 0, 0, 0, 0, 0, 0];

function getGroupForRow(row) {
    for (let g = 0; g < instrumentGroups.length; g++) {
        if (instrumentGroups[g].rows.includes(row)) return g;
    }
    return 0;
}

// ============================================================
// VELOCITY
// ============================================================
// 0=off, 1=ghost, 2=normal, 3=accent
const velocityColors = [
    "#1a1730", // off   – very dark
    "#4c1d95", // ghost – dark violet
    "#7c3aed", // normal – violet
    "#06b6d4", // accent – cyan
];
const velocityMultiplier = [0, 0.5, 1.0, 1.5];

// ============================================================
// PRESETS  (rows: CH, SP, CB, CR, HHo, HH, RD, RB, T1, T2, SN, SS, FT, KK, PH)
// ============================================================
const empty = Array.from({length: N_INST}, () => Array(N_STEPS).fill(0));

// Preset rows: CH, SP, CB, CR, HHo, HH, RD, RB, T1, T2, SN, SS, FT, KK, PH
const rockBeat = [
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // chinese
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // splash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // cowbell
    [3,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // crash – beat 1
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hh open
    [2,0,2,0, 2,0,2,0, 2,0,2,0, 2,0,2,0], // hh closed – 8th notes
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride bell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hi tom
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // mid tom
    [0,0,0,0, 2,0,0,0, 0,0,0,0, 2,0,0,0], // snare – beats 2,4
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // side stick
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // floor tom
    [2,0,0,0, 0,0,0,0, 2,0,0,0, 0,0,0,0], // kick  – beats 1,3
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // pedal hh
];

const funkBeat = [
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // chinese
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // splash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // cowbell
    [3,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // crash
    [0,0,0,0, 0,0,0,2, 0,0,0,0, 0,0,0,0], // hh open – 2e+
    [3,1,3,1, 2,1,3,0, 2,1,2,1, 3,1,2,1], // hh closed – 16ths w/ accents
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride bell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hi tom
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // mid tom
    [0,0,0,0, 3,0,1,0, 0,0,0,0, 3,0,1,0], // snare – accent + ghost
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // side stick
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // floor tom
    [3,0,0,1, 0,0,0,0, 2,0,0,1, 0,0,0,0], // funk kick – 1, 1a, 3, 3a
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // pedal hh
];

const hipHopBeat = [
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // chinese
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // splash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // cowbell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // crash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hh open
    [2,0,1,0, 2,0,1,0, 2,0,1,0, 2,0,1,0], // hh closed – 8ths + ghost 16ths
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride bell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hi tom
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // mid tom
    [0,0,0,0, 2,0,0,0, 0,0,0,0, 2,0,0,0], // snare – 2,4
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // side stick
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // floor tom
    [2,0,0,0, 0,0,1,0, 0,0,2,0, 0,0,0,0], // boom bap kick
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // pedal hh
];

const jazzBeat = [
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // chinese
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // splash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // cowbell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // crash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hh open
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hh closed
    [3,0,2,0, 3,0,2,0, 3,0,2,0, 3,0,2,0], // ride – jazz ride 8ths
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride bell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hi tom
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // mid tom
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0], // snare – feather 2,4
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // side stick
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // floor tom
    [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0], // kick  – feather 1,3
    [0,0,2,0, 0,0,2,0, 0,0,2,0, 0,0,2,0], // pedal hh – beats 2,4 (&)
];

const reggaeBeat = [
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // chinese
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // splash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // cowbell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // crash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hh open
    [0,0,0,0, 2,0,0,0, 0,0,0,0, 2,0,0,0], // hh closed – offbeats
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride bell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hi tom
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // mid tom
    [0,0,0,0, 0,0,0,0, 2,0,0,0, 0,0,0,0], // one-drop snare – beat 3
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // side stick
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // floor tom
    [0,0,0,0, 0,0,0,0, 2,0,0,0, 0,0,0,0], // kick – beat 1
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // pedal hh
];

const bossaBeat = [
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // chinese
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // splash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // cowbell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // crash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hh open
    [2,0,2,0, 2,0,2,0, 2,0,2,0, 2,0,2,0], // bossa clave hi-hat
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride bell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hi tom
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // mid tom
    [2,0,0,0, 0,0,2,0, 0,0,0,0, 2,0,0,0], // rim – bossa rimshot
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // side stick
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // floor tom
    [2,0,0,0, 0,0,2,0, 2,0,0,0, 0,0,2,0], // bossa kick
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // pedal hh
];

const eighthNoteSyncopBeat = [
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // chinese
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // splash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // cowbell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // crash – beat 1
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hh open
    [2,0,2,0, 2,0,2,0, 2,0,2,0, 2,0,2,0], // hh closed – 8th notes
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride bell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hi tom
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // mid tom
    [0,0,0,0, 3,0,0,2, 0,0,0,0, 3,0,0,0], // snare – beats 2,4 accented
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // side stick
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // floor tom
    [2,0,0,2, 0,0,2,0, 0,0,2,0, 0,2,0,0], // kick – 1, +2, 3, +4
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // pedal hh
];

const discoBeat = [
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // chinese
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // splash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // cowbell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // crash – beat 1
    [0,0,2,0, 0,0,2,0, 0,0,2,0, 0,0,2,0], // hh open
    [2,0,0,0, 2,0,0,0, 2,0,0,0, 2,0,0,0], // hh closed – 8th notes
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride bell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hi tom
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // mid tom
    [0,0,0,0, 2,0,0,0, 0,0,0,0, 2,0,0,0], // snare – beats 2,4 accented
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // side stick
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // floor tom
    [2,0,0,0, 2,0,0,0, 2,0,0,0, 2,0,0,0], // kick – 1, +2, 3, +4
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // pedal hh
];

const trainBeat = [
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // chinese
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // splash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // cowbell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // crash – beat 1
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hh open
    [0,0,2,0, 0,0,2,0, 0,0,0,0, 0,0,0,0], // hh closed – 8th notes
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride bell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hi tom
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // mid tom
    [1,1,2,1, 1,1,2,1, 0,0,0,0, 0,0,0,0], // snare – beats 2,4 accented
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // side stick
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // floor tom
    [2,0,0,0, 2,0,0,0, 0,0,0,0, 0,0,0,0], // kick – 1, +2, 3, +4
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // pedal hh
];

const halfTimeShuffleBeat = [
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // chinese
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // splash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // cowbell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // crash – beat 1
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hh open
    [2,0,0,0, 2,0,2,0, 0,0,2,0, 2,0,0,0], // hh closed – 8th notes
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // ride bell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hi tom
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // mid tom
    [0,0,1,0, 0,0,0,0, 1,0,0,0, 2,0,1,0], // snare – beats 2,4 accented
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // side stick
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // floor tom
    [2,0,0,0, 0,0,0,0, 0,0,2,0, 0,0,0,0], // kick – 1, +2, 3, +4
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // pedal hh
];

const rideBellBeat = [
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // chinese
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // splash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // cowbell
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // crash
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hh open
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hh closed
    [2,0,2,0, 2,0,2,0, 2,0,2,0, 2,0,2,0], // ride – 8th notes
    [3,0,0,0, 0,0,0,0, 3,0,0,0, 0,0,0,0], // ride bell – beats 1,3
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // hi tom
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // mid tom
    [0,0,0,0, 2,0,0,0, 0,0,0,0, 2,0,0,0], // snare – beats 2,4
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // side stick
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // floor tom
    [2,0,0,0, 0,0,0,0, 2,0,0,0, 0,0,0,0], // kick – beats 1,3
    [0,0,2,0, 0,0,2,0, 0,0,2,0, 0,0,2,0], // pedal hh – beats 2,4 (&)
];

const beatArray   = [empty, rockBeat, funkBeat, hipHopBeat, jazzBeat, reggaeBeat, bossaBeat, eighthNoteSyncopBeat, discoBeat, trainBeat, halfTimeShuffleBeat, rideBellBeat];
const beatBpmArray = [120,  120,      96,        90,         140,       160,          110,       90,           110,       90,        140,                   120];

// ============================================================
// STATE
// ============================================================
const MAX_MEASURES = 4;
const STORAGE_KEY = 'groovelab_custom';
let customGrooves  = []; // [{name, timeSig, bpm, measures:[...]}] persisted to localStorage
let undoStack      = []; // snapshots of measures[] for undo, max 20
let measures           = [];   // measures[0..3], each = [N_INST][nSteps]
let measuresVisited    = [];   // measuresVisited[m] = true once user has opened bar m
let currentMeasureIdx  = 0;
let playbackMeasureIdx = 0;
let currentBeat        = null; // always === measures[currentMeasureIdx]
let measureSelect;

let timerID;
let isPlaying = false;
let mode = 0;  // 0=labels, 1=volume, 2=pan
const scheduleAheadTime = 0.1; // seconds
const lookahead = 25;          // ms
let nextNoteTime;
let currentTime = 0;

const audioCtx = new (window.AudioContext || window.webkitAudioContext);
let sound_delay = (60000 / 120) / 4;
const audioBuffers = [];
const gainNodes    = [];
const pannerNodes  = [];

let nSteps = 16;          // active step count for current time sig
let currentTimeSigIdx = 2; // index into TIME_SIGNATURES (4/4)

let beatSelect;
let bpmSelect;
let timeSigSelect;
let instrumentTable;
let playButton;

// ============================================================
// MEASURES
// ============================================================
function initMeasures() {
    measures = Array.from({length: MAX_MEASURES}, () =>
        Array.from({length: N_INST}, () => Array(nSteps).fill(0))
    );
    measuresVisited = Array(MAX_MEASURES).fill(false);
    measuresVisited[0] = true;
    currentMeasureIdx = 0;
    currentBeat = measures[0];
}

function changeMeasure() {
    const newIdx = parseInt(measureSelect.value);
    if (newIdx === currentMeasureIdx) return;
    if (!measuresVisited[newIdx]) {
        const prevIdx = newIdx - 1;
        if (prevIdx >= 0) {
            pushUndo();
            measures[newIdx] = measures[prevIdx].map(row => [...row]);
        }
        measuresVisited[newIdx] = true;
    }
    currentMeasureIdx = newIdx;
    currentBeat = measures[currentMeasureIdx];
    renderBeat();
}

function measureHasNotes(m) {
    return measures[m].some(row => row.some(v => v > 0));
}

function getActiveMeasures() {
    const active = [0];
    for (let m = 1; m < MAX_MEASURES; m++) {
        if (measureHasNotes(m)) active.push(m);
    }
    return active;
}

// ============================================================
// INIT
// ============================================================
(function(window, document, undefined) {
    window.onload = init;

    function init() {
        beatSelect      = document.getElementById('beatSelect');
        bpmSelect       = document.getElementById('bpmSelect');
        timeSigSelect   = document.getElementById('timeSigSelect');
        instrumentTable = document.getElementById('instrumentTable');
        playButton      = document.getElementById('playButton');
        measureSelect   = document.getElementById('measureSelect');

        initMeasures();
        initHeader();
        initTable();
        initAudio();
        initHitControls();
        loadCustomGrooves();

        if (!loadSharedPattern()) {
            changeBeat();
        }
        changeBpm();
    }
})(window, document, undefined);

// ============================================================
// TIME SIGNATURE HELPERS
// ============================================================
function getHeaderLabel(ts, stepIdx) {
    if (ts.subdiv === 4) {
        // Simple time: sequential beat numbers on downbeats, e/&/a for subdivisions
        const pos = stepIdx % 4;
        return pos === 0 ? String(Math.floor(stepIdx / 4) + 1) : ['e', '&', 'a'][pos - 1];
    } else {
        // Compound time (6/8, 12/8): triplet groups — 1,&,a,2,&,a,...
        const pos = stepIdx % 3;
        return pos === 0 ? String(Math.floor(stepIdx / 3) + 1) : ['&', 'a'][pos - 1];
    }
}

function getStepSelectorLabel(ts, stepIdx) {
    if (ts.subdiv === 4) {
        const beat = Math.floor(stepIdx / 4) + 1;
        const sub  = ['', 'e', '&', 'a'][stepIdx % 4];
        return String(beat) + sub;
    } else {
        const beat = Math.floor(stepIdx / 6) + 1;
        const sub  = ['1', '+', '2', '+', '3', '+'][stepIdx % 6];
        return String(beat) + '.' + sub;
    }
}

// ============================================================
// HIT CONTROLS — alternate input for small-screen precision
// ============================================================
function initHitControls() {
    const instSel = document.getElementById('instSelect');
    INSTRUMENTS.forEach((inst, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = inst.abbr + ' – ' + inst.name;
        instSel.appendChild(opt);
    });
    updateStepSelect();
}

function updateStepSelect() {
    const ts = TIME_SIGNATURES[currentTimeSigIdx];
    const stepSel = document.getElementById('stepSelect');
    while (stepSel.firstChild) stepSel.removeChild(stepSel.firstChild);
    for (let i = 0; i < ts.steps; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = getStepSelectorLabel(ts, i);
        stepSel.appendChild(opt);
    }
}

function hitSelected() {
    const instIdx = parseInt(document.getElementById('instSelect').value);
    const stepIdx = parseInt(document.getElementById('stepSelect').value);

    const tbody = instrumentTable.getElementsByTagName('tbody')[0];
    const tr    = tbody.getElementsByTagName('tr')[instIdx];
    if (!tr) return;
    const btn = tr.getElementsByTagName('td')[stepIdx + 1].getElementsByTagName('input')[0];
    if (!btn) return;
    changeNote(btn);
}

// ============================================================
// TABLE BUILD
// ============================================================
function initHeader() {
    const ts    = TIME_SIGNATURES[currentTimeSigIdx];
    const tfoot = instrumentTable.getElementsByTagName('tfoot')[0];
    while (tfoot.firstChild) tfoot.removeChild(tfoot.firstChild);

    const tr = document.createElement('tr');
    tfoot.appendChild(tr);

    for (let i = 0; i <= nSteps; i++) {
        const th = document.createElement('th');
        if (i === 0) {
            const btn = document.createElement('input');
            btn.type = 'button';
            btn.className = 'modeButton';
            btn.value = 'V/P';
            btn.addEventListener('click', () => {
                mode = (mode + 1) % 3;
                initTable();
                renderBeat();
            });
            th.appendChild(btn);
        } else {
            const beatIdx = i - 1;
            if (beatIdx % ts.subdiv === 0) th.classList.add('downbeat');
            if (Math.floor(beatIdx / ts.subdiv) % 2 === 1) th.classList.add('beatAlt');
            th.textContent = getHeaderLabel(ts, beatIdx);
        }
        tr.appendChild(th);
    }
}

function initTable() {
    const ts    = TIME_SIGNATURES[currentTimeSigIdx];
    const tbody = instrumentTable.getElementsByTagName('tbody')[0];
    while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

    for (let row = 0; row < N_INST; row++) {
        const tr = document.createElement('tr');
        tbody.appendChild(tr);

        const gIdx = getGroupForRow(row);
        const group = instrumentGroups[gIdx];
        const isFirstRow = (group.rows[0] === row);

        for (let col = 0; col <= nSteps; col++) {
            const td = document.createElement('td');
            tr.appendChild(td);

            if (col === 0) {
                if (mode === 0) {
                    td.textContent = INSTRUMENTS[row].abbr;
                    td.title = INSTRUMENTS[row].name;
                } else if (isFirstRow) {
                    const slider = document.createElement('input');
                    slider.type  = 'range';
                    slider.step  = mode === 1 ? '10' : '0.5';
                    slider.className = mode === 1 ? 'volumeSlider' : 'panSlider';
                    if (mode === 1) {
                        slider.min = '0'; slider.max = '100';
                        slider.value = groupVolumeArray[gIdx];
                        const g = gIdx;
                        slider.addEventListener('change', e => changeVolume(e.target.value, g));
                    } else {
                        slider.min = '-1'; slider.max = '1';
                        slider.value = groupPanArray[gIdx];
                        const g = gIdx;
                        slider.addEventListener('change', e => changePanning(e.target.value, g));
                    }
                    td.appendChild(slider);
                } else {
                    td.textContent = group.name;
                    td.className = 'groupLabel';
                }
            } else {
                const beatCol  = col - 1;
                const beatGrp  = Math.floor(beatCol / ts.subdiv);
                if (beatCol % ts.subdiv === 0) td.classList.add('downbeat');
                if (beatGrp % 2 === 1) td.classList.add('beatAlt');
                const btn = document.createElement('input');
                btn.type = 'button';
                btn.className = 'noteButton';
                btn.dataset.beatCol  = beatCol;
                btn.dataset.offColor = beatGrp % 2 === 1 ? '#252040' : '#1a1730';
                btn.addEventListener('click', e => changeNote(e.target));
                td.appendChild(btn);
            }
        }
    }
}

function renderBeat() {
    const tbody = instrumentTable.getElementsByTagName('tbody')[0];
    const rows  = tbody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const tds = rows[i].getElementsByTagName('td');
        for (let j = 1; j <= nSteps; j++) {
            const btn = tds[j] && tds[j].getElementsByTagName('input')[0];
            if (btn) {
                const vel = (currentBeat[i] && currentBeat[i][j - 1]) || 0;
                btn.style.background = vel === 0 ? (btn.dataset.offColor || velocityColors[0]) : velocityColors[vel];
            }
        }
    }
}

function pushUndo() {
    undoStack.push(measures.map(m => m.map(row => [...row])));
    if (undoStack.length > 20) undoStack.shift();
}

function undo() {
    if (!undoStack.length) return;
    measures = undoStack.pop();
    currentBeat = measures[currentMeasureIdx];
    renderBeat();
}

function changeNote(btn) {
    pushUndo();
    const row     = btn.parentElement.parentElement.rowIndex;
    const beatCol = parseInt(btn.dataset.beatCol);
    const cur     = (currentBeat[row] && currentBeat[row][beatCol]) || 0;
    currentBeat[row][beatCol] = (cur + 1) % 4;
    const newVel = currentBeat[row][beatCol];
    btn.style.background = newVel === 0 ? (btn.dataset.offColor || velocityColors[0]) : velocityColors[newVel];
}

// ============================================================
// CONTROLS
// ============================================================
function changeBeat() {
    const val = beatSelect.value;

    if (val.startsWith('c')) {
        // Custom saved groove
        const groove = customGrooves[parseInt(val.slice(1))];
        if (!groove) return;
        currentTimeSigIdx = groove.timeSig;
        timeSigSelect.value = groove.timeSig;
        nSteps = TIME_SIGNATURES[currentTimeSigIdx].steps;
        initMeasures();
        for (let m = 0; m < groove.measures.length && m < MAX_MEASURES; m++) {
            for (let r = 0; r < N_INST && r < groove.measures[m].length; r++) {
                measures[m][r] = [...groove.measures[m][r]];
                while (measures[m][r].length < nSteps) measures[m][r].push(0);
            }
            measuresVisited[m] = true;
        }
        bpmSelect.value = groove.bpm;
        currentMeasureIdx = 0;
        measureSelect.value = 0;
        currentBeat = measures[0];
        changeBpm();
        renderBeat();
        return;
    }

    const idx    = parseInt(val);
    const preset = beatArray[idx].map(row => [...row]);
    for (let r = 0; r < N_INST; r++) {
        while (preset[r].length < nSteps) preset[r].push(0);
    }
    // Load preset into measure 0, clear other measures
    measures[0] = preset;
    for (let m = 1; m < MAX_MEASURES; m++) {
        measures[m] = Array.from({length: N_INST}, () => Array(nSteps).fill(0));
    }
    measuresVisited = Array(MAX_MEASURES).fill(false);
    measuresVisited[0] = true;
    currentMeasureIdx = 0;
    measureSelect.value = 0;
    currentBeat = measures[0];
    bpmSelect.value = beatBpmArray[idx];
    changeBpm();
    renderBeat();
}

function changeTimeSig() {
    currentTimeSigIdx = parseInt(timeSigSelect.value);
    nSteps = TIME_SIGNATURES[currentTimeSigIdx].steps;
    // Extend all measures if the new time sig needs more steps
    for (let m = 0; m < MAX_MEASURES; m++) {
        for (let r = 0; r < N_INST; r++) {
            while (measures[m][r].length < nSteps) measures[m][r].push(0);
        }
    }
    initHeader();
    initTable();
    renderBeat();
    updateStepSelect();
}

function clearMeasure() {
    pushUndo();
    measures[currentMeasureIdx] = Array.from({length: N_INST}, () => Array(nSteps).fill(0));
    currentBeat = measures[currentMeasureIdx];
    renderBeat();
}

function addCustomOption(name, idx) {
    const opt = document.createElement('option');
    opt.value = 'c' + idx;
    opt.text = '\u2605 ' + name;
    beatSelect.appendChild(opt);
}

function loadCustomGrooves() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) customGrooves = JSON.parse(saved);
    } catch(e) { customGrooves = []; }
    customGrooves.forEach((g, i) => addCustomOption(g.name, i));
}

function saveGroove() {
    const name = prompt('Name this groove:');
    if (!name || !name.trim()) return;
    const groove = {
        name: name.trim(),
        timeSig: currentTimeSigIdx,
        bpm: parseInt(bpmSelect.value),
        measures: measures.map(m => m.map(row => [...row]))
    };
    customGrooves.push(groove);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(customGrooves)); }
    catch(e) { alert('Could not save: storage full.'); customGrooves.pop(); return; }
    const idx = customGrooves.length - 1;
    addCustomOption(groove.name, idx);
    beatSelect.value = 'c' + idx;
}

function changeBpm() {
    sound_delay = (60000 / parseInt(bpmSelect.value)) / 4;
}

function changeVolume(value, gIdx) {
    groupVolumeArray[gIdx] = value;
    const gain = value / 100;
    instrumentGroups[gIdx].rows.forEach(row => {
        if (gainNodes[row]) gainNodes[row].gain.value = gain;
    });
}

function changePanning(value, gIdx) {
    groupPanArray[gIdx] = parseFloat(value);
    instrumentGroups[gIdx].rows.forEach(row => {
        if (pannerNodes[row]) pannerNodes[row].pan.value = parseFloat(value);
    });
}

// ============================================================
// AUDIO
// ============================================================
async function initAudio() {
    await loadSounds();
    setupGains();
}

async function loadSounds() {
    const sf = window.MIDI && window.MIDI.Soundfont && window.MIDI.Soundfont.acoustic_grand_piano;
    if (!sf) {
        console.error('GrooveLab: drum soundfont not available');
        return;
    }
    const promises = INSTRUMENTS.map(async (inst, i) => {
        const dataURI = sf[inst.key];
        if (!dataURI) { console.warn('No sample for key', inst.key); return; }
        const response    = await fetch(dataURI);
        const arrayBuffer = await response.arrayBuffer();
        audioBuffers[i]   = await audioCtx.decodeAudioData(arrayBuffer);
    });
    await Promise.all(promises);
    console.log('GrooveLab: drum sounds loaded');
}

function setupGains() {
    for (let i = 0; i < N_INST; i++) {
        const gainNode = audioCtx.createGain();
        gainNode.connect(audioCtx.destination);
        gainNodes[i] = gainNode;

        const pannerNode = audioCtx.createStereoPanner();
        pannerNode.connect(gainNode);
        pannerNodes[i] = pannerNode;

        const g = getGroupForRow(i);
        gainNode.gain.value  = groupVolumeArray[g] / 100;
        pannerNode.pan.value = groupPanArray[g];
    }
}

// ============================================================
// SEQUENCER
// ============================================================
function scheduler() {
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
        scheduleNote(currentTime, nextNoteTime);
        nextNote();
    }
    timerID = setTimeout(scheduler, lookahead);
}

function scheduleNote(index, when) {
    const beat = measures[playbackMeasureIdx];
    for (let i = 0; i < N_INST; i++) {
        const vel = (beat[i] && beat[i][index]) || 0;
        if (vel > 0 && audioBuffers[i] && pannerNodes[i]) {
            const source  = audioCtx.createBufferSource();
            source.buffer = audioBuffers[i];
            const velGain = audioCtx.createGain();
            velGain.gain.value = velocityMultiplier[vel];
            source.connect(velGain);
            velGain.connect(pannerNodes[i]);
            source.start(when);
        }
    }
    const mIdx = playbackMeasureIdx;
    setTimeout(() => renderNextColumn(index, mIdx), Math.max(0, (when - audioCtx.currentTime) * 1000));
}

function nextNote() {
    nextNoteTime += sound_delay / 1000;
    currentTime++;
    if (currentTime >= nSteps) {
        currentTime = 0;
        const active = getActiveMeasures();
        if (active.length > 1) {
            const pos = active.indexOf(playbackMeasureIdx);
            playbackMeasureIdx = active[(pos + 1) % active.length];
        }
    }
}

function playPause() {
    if (isPlaying) {
        stop();
        playButton.value = 'Play';
    } else {
        startPlayback();
        playButton.value = 'Pause';
    }
    isPlaying = !isPlaying;
}

function startPlayback() {
    audioCtx.resume().then(() => {
        currentTime        = 0;
        playbackMeasureIdx = 0;
        nextNoteTime       = audioCtx.currentTime;
        scheduler();
    });
}

function stop() {
    if (timerID) { clearTimeout(timerID); timerID = null; }
}

function renderNextColumn(beatIdx, mIdx) {
    // Switch displayed measure when playback advances to a new one
    if (mIdx !== undefined && mIdx !== currentMeasureIdx) {
        currentMeasureIdx = mIdx;
        currentBeat = measures[currentMeasureIdx];
        measureSelect.value = mIdx;
        renderBeat();
    }
    const tfoot  = instrumentTable.getElementsByTagName('tfoot')[0];
    const tr     = tfoot.getElementsByTagName('tr')[0];
    const allTh  = tr.getElementsByTagName('th');
    const prevIdx = (beatIdx === 0) ? nSteps - 1 : beatIdx - 1;

    if (allTh[beatIdx + 1]) allTh[beatIdx + 1].style.background = '#1e3a5f';
    if (allTh[prevIdx + 1]) allTh[prevIdx + 1].style.background = '';
}

// ============================================================
// SHARE — URL-encoded pattern
// ============================================================
function encodePattern() {
    // Find highest measure index that has notes (always encode at least measure 0)
    let nActive = 1;
    for (let m = MAX_MEASURES - 1; m >= 1; m--) {
        if (measureHasNotes(m)) { nActive = m + 1; break; }
    }

    // Header: byte0=beat, byte1=(nActive<<4)|(timeSigIdx+1), byte2=bpm
    // High nibble of byte1 is 1-4 → new multi-measure sparse format
    // (old format had high nibble 0, values 0-7 — no collision)
    const parts = [
        parseInt(beatSelect.value),
        (nActive << 4) | (currentTimeSigIdx + 1),
        parseInt(bpmSelect.value)
    ];

    const bytesPerRow = Math.ceil(nSteps / 4);
    for (let m = 0; m < nActive; m++) {
        // 15-bit bitmask: bit r set if row r has at least one note
        let bitmask = 0;
        for (let r = 0; r < N_INST; r++) {
            if (measures[m][r].some(v => v > 0)) bitmask |= (1 << r);
        }
        parts.push((bitmask >> 8) & 0xFF);
        parts.push(bitmask & 0xFF);
        // Encode only non-zero rows (2 bits per step, packed MSB-first)
        for (let r = 0; r < N_INST; r++) {
            if (!(bitmask & (1 << r))) continue;
            for (let b = 0; b < bytesPerRow; b++) {
                let byteVal = 0;
                for (let s = 0; s < 4; s++) {
                    const col = b * 4 + s;
                    const vel = col < nSteps ? (measures[m][r][col] || 0) : 0;
                    byteVal |= ((vel & 0x3) << (6 - s * 2));
                }
                parts.push(byteVal);
            }
        }
    }

    let binary = '';
    parts.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodePattern(encoded) {
    try {
        let b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4) b64 += '=';
        const binary = atob(b64);
        const bytes  = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

        const byte1      = bytes[1];
        const highNibble = (byte1 >> 4) & 0x0F;
        const lowNibble  = byte1 & 0x0F;

        if (highNibble >= 1 && highNibble <= MAX_MEASURES) {
            // ── New sparse multi-measure format ──
            const nActive    = highNibble;
            const timeSigIdx = (lowNibble >= 1 && lowNibble <= TIME_SIGNATURES.length)
                               ? lowNibble - 1 : 2;
            const stepsToRead = TIME_SIGNATURES[timeSigIdx].steps;
            const bytesPerRow = Math.ceil(stepsToRead / 4);

            const state = { beat: bytes[0], bpm: bytes[2], timeSig: timeSigIdx, measures: [] };
            let pos = 3;
            for (let m = 0; m < nActive; m++) {
                const bitmask = ((bytes[pos] || 0) << 8) | (bytes[pos + 1] || 0);
                pos += 2;
                const grid = Array.from({length: N_INST}, () => Array(stepsToRead).fill(0));
                for (let r = 0; r < N_INST; r++) {
                    if (!(bitmask & (1 << r))) continue;
                    for (let b = 0; b < bytesPerRow; b++) {
                        const byteVal = bytes[pos++] || 0;
                        for (let s = 0; s < 4; s++) {
                            const col = b * 4 + s;
                            if (col < stepsToRead) grid[r][col] = (byteVal >>> (6 - s * 2)) & 0x3;
                        }
                    }
                }
                state.measures.push(grid);
            }
            return state;
        } else {
            // ── Legacy dense single-measure format ──
            let timeSigIdx, stepsToRead, bytesPerRow;
            if (byte1 > 0 && byte1 <= TIME_SIGNATURES.length) {
                timeSigIdx  = byte1 - 1;
                stepsToRead = TIME_SIGNATURES[timeSigIdx].steps;
                bytesPerRow = Math.ceil(stepsToRead / 4);
            } else {
                timeSigIdx  = 2;
                stepsToRead = 16;
                bytesPerRow = 4;
            }
            const state = { beat: bytes[0], bpm: bytes[2], timeSig: timeSigIdx, measures: [] };
            const grid  = [];
            for (let row = 0; row < N_INST; row++) {
                const offset = 3 + row * bytesPerRow;
                const rowArr = [];
                for (let b = 0; b < bytesPerRow; b++) {
                    const byteVal = bytes[offset + b] || 0;
                    for (let s = 0; s < 4; s++) {
                        const col = b * 4 + s;
                        if (col < stepsToRead) rowArr.push((byteVal >>> (6 - s * 2)) & 0x3);
                    }
                }
                grid.push(rowArr);
            }
            state.measures.push(grid);
            return state;
        }
    } catch(e) {
        console.error('GrooveLab: decode error', e);
        return null;
    }
}

function exportMidi() {
    const TICKS = 480; // ticks per quarter note
    const ts = TIME_SIGNATURES[currentTimeSigIdx];
    const ticksPerStep = (ts.subdiv === 3) ? 240 : 120; // 8th note for 12/8, 16th for rest
    const bpm = parseInt(bpmSelect.value);
    const usecPerBeat = Math.round(60000000 / bpm);

    // MIDI note numbers matching INSTRUMENTS order
    const MIDI_NOTES = [52, 55, 56, 49, 46, 42, 51, 53, 50, 48, 38, 37, 45, 36, 44];
    const velMap = [0, 40, 80, 110]; // off / ghost / normal / accent

    // Collect note-on events from all active measures
    const activeMeasures = getActiveMeasures();
    const onEvents = [];
    let measureStartTick = 0;
    activeMeasures.forEach(m => {
        for (let step = 0; step < nSteps; step++) {
            const tick = measureStartTick + step * ticksPerStep;
            for (let r = 0; r < N_INST; r++) {
                const v = measures[m][r][step];
                if (v > 0) onEvents.push({tick, note: MIDI_NOTES[r], vel: velMap[v]});
            }
        }
        measureStartTick += nSteps * ticksPerStep;
    });

    // Build interleaved note-on / note-off list sorted by tick
    const allEvents = [];
    onEvents.forEach(e => {
        allEvents.push({tick: e.tick,                    cmd: 0x99, note: e.note, vel: e.vel});
        allEvents.push({tick: e.tick + ticksPerStep - 1, cmd: 0x89, note: e.note, vel: 0});
    });
    allEvents.sort((a, b) => a.tick - b.tick || (a.cmd === 0x89 ? -1 : 1));

    // Variable-length quantity encoder
    const track = [];
    function vlq(v) {
        if (v < 0x80)   { track.push(v); return; }
        if (v < 0x4000) { track.push(0x80 | (v >> 7), v & 0x7F); return; }
        track.push(0x80 | (v >> 14), 0x80 | ((v >> 7) & 0x7F), v & 0x7F);
    }

    // Tempo meta event
    vlq(0); track.push(0xFF, 0x51, 0x03,
        (usecPerBeat >> 16) & 0xFF, (usecPerBeat >> 8) & 0xFF, usecPerBeat & 0xFF);

    // Time signature meta event
    const [numStr, denStr] = ts.name.split('/');
    vlq(0); track.push(0xFF, 0x58, 0x04,
        parseInt(numStr), Math.log2(parseInt(denStr)), 24, 8);

    // Note events
    let cursor = 0;
    allEvents.forEach(e => {
        vlq(e.tick - cursor);
        cursor = e.tick;
        track.push(e.cmd, e.note, e.vel);
    });

    // End of track
    vlq(0); track.push(0xFF, 0x2F, 0x00);

    // Assemble MIDI file bytes
    const buf = new ArrayBuffer(14 + 8 + track.length);
    const dv  = new DataView(buf);
    let p = 0;
    const str = s => { for (let i = 0; i < s.length; i++) dv.setUint8(p++, s.charCodeAt(i)); };
    const u32 = v => { dv.setUint32(p, v); p += 4; };
    const u16 = v => { dv.setUint16(p, v); p += 2; };

    str('MThd'); u32(6); u16(0); u16(1); u16(TICKS);
    str('MTrk'); u32(track.length);
    track.forEach(b => dv.setUint8(p++, b));

    // Trigger download
    const name = beatSelect.options[beatSelect.selectedIndex].text
        .replace(/★\s*/g, '').replace(/[^a-z0-9_\- ]/gi, '').trim() || 'groove';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([buf], {type: 'audio/midi'}));
    a.download = name + '.mid';
    a.click();
    URL.revokeObjectURL(a.href);
}

function sharePattern() {
    const encoded = encodePattern();
    const url = window.location.origin + window.location.pathname + '?g=' + encoded;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url)
            .then(() => showShareFeedback('Link copied!'))
            .catch(() => fallbackCopy(url));
    } else {
        fallbackCopy(url);
    }
}

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showShareFeedback('Link copied!'); }
    catch(e) { console.log('Share URL:', text); }
    document.body.removeChild(ta);
}

function showShareFeedback(msg) {
    const btn  = document.getElementById('shareButton');
    const orig = btn.value;
    btn.value  = msg;
    btn.classList.add('share-success');
    setTimeout(() => { btn.value = orig; btn.classList.remove('share-success'); }, 2000);
}

function loadSharedPattern() {
    const params  = new URLSearchParams(window.location.search);
    const encoded = params.get('g');
    if (!encoded) return false;

    const state = decodePattern(encoded);
    if (!state) return false;

    if (state.beat >= 0 && state.beat < beatArray.length) beatSelect.value = state.beat;

    if (state.timeSig !== undefined && state.timeSig >= 0 && state.timeSig < TIME_SIGNATURES.length) {
        timeSigSelect.value = state.timeSig;
        currentTimeSigIdx   = state.timeSig;
        nSteps = TIME_SIGNATURES[currentTimeSigIdx].steps;
        initHeader();
        initTable();
        updateStepSelect();
    }

    let bpmFound = false;
    for (const opt of bpmSelect.options) {
        if (parseInt(opt.value) === state.bpm) { bpmSelect.value = state.bpm; bpmFound = true; break; }
    }
    if (!bpmFound) {
        const opt = document.createElement('option');
        opt.value = state.bpm; opt.text = state.bpm + ' BPM';
        bpmSelect.appendChild(opt);
        bpmSelect.value = state.bpm;
    }

    // Load all measures
    initMeasures();
    if (state.measures) {
        for (let m = 0; m < state.measures.length && m < MAX_MEASURES; m++) {
            for (let r = 0; r < N_INST && r < state.measures[m].length; r++) {
                if (Array.isArray(state.measures[m][r])) measures[m][r] = state.measures[m][r];
            }
            for (let r = 0; r < N_INST; r++) {
                while (measures[m][r].length < nSteps) measures[m][r].push(0);
            }
            measuresVisited[m] = true;
        }
    }
    currentMeasureIdx = 0;
    measureSelect.value = 0;
    currentBeat = measures[0];

    changeBpm();
    renderBeat();
    showSharedBanner();
    return true;
}

function showSharedBanner() {
    const banner = document.createElement('div');
    banner.className = 'shared-banner';
    banner.innerHTML = 'Shared groove loaded! <span onclick="this.parentElement.remove()" style="cursor:pointer;margin-left:12px">&#x2715;</span>';
    document.body.insertBefore(banner, document.body.firstChild);
    setTimeout(() => {
        if (banner.parentElement) {
            banner.classList.add('banner-fade');
            setTimeout(() => { if (banner.parentElement) banner.remove(); }, 500);
        }
    }, 4000);
}
