////////////////////////MODEL //////////////////////////////////////
const soundFiles = ["./audio/gunga-chi.wav", "./audio/gunga-din.wav", "./audio/gunga-don.wav",
    "./audio/medio-chi.wav", "./audio/medio-din.wav", "./audio/medio-don.wav",
    "./audio/viola-chi.wav", "./audio/viola-din.wav", "./audio/viola-don.wav",
    "./audio/atabaqueDak.wav", "./audio/atabaqueDum.wav",
    "./audio/pandeiro-slap.wav", "./audio/pandeiro-tum.wav",
    "./audio/agogo_dom.wav", "./audio/agogo_dim.wav",
    "./audio/palma.wav",
    "./audio/metro-1.wav", "./audio/metro-n.wav",];
const soundLabel = ["Gun chi", "Gun din", "Gun don",
    "Med chi", "Med din", "Med don",
    "Vio chi", "Vio din", "Vio don",
     "Ata Dak", "Ata Dum",
    "Pan dak", "Pan tum",
    "Ago dom", "Ago dim",
    "palma",
    "metro-1", "metro-n",];


const saoBentoGrandeAngola = [
    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//gunga chi
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//gunga din
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0],//gunga don

    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//medio chi
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//medio din
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0],//medio don

    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola chi
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola din
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0],//viola don


    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//atabaque dak
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //atabaque dum


    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//pandeiro don
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //pandeiro dim

    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//agogo don
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //agogo din

    [0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], //clap

    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//metro 1
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], //metro n
];
const angola = [
    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//gunga chi
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//gunga din
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//gunga don

    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//medio chi
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//medio din
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//medio don


    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola chi
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//viola din
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola don


    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//atabaque dak
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //atabaque dum


    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//pandeiro dak
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //pandeiro dum

    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//agogo don
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //agogo dim

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //clap


    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//metro 1
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], //metro n
];
const saoBentoPequenoAngola = [
    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//gunga chi
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//gunga din
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//gunga don

    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//medio chi
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//medio din
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//medio don

    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola chi
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola din
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//viola don

    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//atabaque dak
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //atabaque dum


    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//pandeiro don
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //pandeiro dim

    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//agogo don
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //agogo din

    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], //clap

    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//metro 1
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], //metro n
];

const saoBentoGrandeRegional = [
    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//gunga chi
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],//gunga din
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//gunga don

    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//medio chi
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],//medio din
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//medio don

    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola chi
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],//viola din
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//viola don


    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//atabaque dak
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //atabaque dum


    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//pandeiro don
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //pandeiro dim];
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//agogo don
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //agogo din
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], //clap

    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//metro 1
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], //metro n
];

const benguela = [
    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//gunga chi
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],//gunga din
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//gunga don

    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//medio chi
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],//medio din
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//medio don

    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola chi
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],//viola din
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola don


    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//atabaque dak
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //atabaque dum


    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//pandeiro don
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //pandeiro dim];
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//agogo don
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], //agogo din
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], //clap

    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//metro 1
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], //metro n
];

const empty = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//gunga chi
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//gunga din
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//gunga don

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//medio chi
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//medio din
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//medio don

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola chi
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola din
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola don


    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//atabaque dak
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //atabaque dum


    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//pandeiro don
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //pandeiro dim];

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//agogo don
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //agogo din

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //clap

    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//metro 1
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], //metro n
];

const violaVariation1 = [[2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0],//viola chi
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],//viola din
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola don
];
const violaVariation2 = [[2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola chi
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola din
    [0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 2],//viola don
];
const violaVariation3 = [[2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola chi
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],//viola din
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0],//viola don
];
const violaVariation4 = [[2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola chi
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola din
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0],//viola don
];
const violaVariation5 = [[2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola chi
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola din
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0],//viola don
];
const violaVariation6 = [[2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],//viola chi
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0],//viola din
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//viola don
];
const violaArray = [violaVariation1, violaVariation2, violaVariation3, violaVariation4, violaVariation5, violaVariation6];
const beatArray = [saoBentoGrandeAngola, angola, saoBentoPequenoAngola, saoBentoGrandeRegional, benguela, empty];
const beatBPMArray = [168, 108, 120, 176, 120, 120];

// Instrument groups: maps each group to its row indices
const instrumentGroups = [
    { name: "Gunga",    rows: [0, 1, 2] },
    { name: "Medio",    rows: [3, 4, 5] },
    { name: "Viola",    rows: [6, 7, 8] },
    { name: "Atabaque", rows: [9, 10] },
    { name: "Pandeiro", rows: [11, 12] },
    { name: "Agogo",    rows: [13, 14] },
    { name: "Palma",    rows: [15] },
    { name: "Metro",    rows: [16, 17] },
];

// Volume and pan are now per instrument group (8 groups)
var groupVolumeArray = [50, 50, 50, 50, 50, 50, 50, 50];
var groupPanArray = [-1, -1, -1, 1, 1, 1, 1, 1];

// Helper: get group index for a given row
function getGroupForRow(rowIndex) {
    for (let g = 0; g < instrumentGroups.length; g++) {
        if (instrumentGroups[g].rows.includes(rowIndex)) return g;
    }
    return 0;
}

let timerID; // global or scoped outside functions
var currentBeat = beatArray[0];
let isPlaying = false;
let mode = 0; // 0= labels 1=volume 2=pan

// Subdivision: 8 = 8th notes (8 visible columns), 16 = 16th notes (16 visible columns)
let subdivision = 8;

// Maps visible column indices to actual beat array indices
function getVisibleColumns() {
    if (subdivision === 16) {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    } else {
        // 8th notes: every other column (0, 2, 4, 6, 8, 10, 12, 14)
        return [0, 2, 4, 6, 8, 10, 12, 14];
    }
}

function getVisibleLabels() {
    if (subdivision === 16) {
        return ["1", "e", "&", "a", "2", "e", "&", "a", "3", "e", "&", "a", "4", "e", "&", "a"];
    } else {
        return ["1", "&", "2", "&", "3", "&", "4", "&"];
    }
}

////////DOM CACHING//////////////////
var beatSelect;
var violaSelect;
var bpmInput;
var instrumentTable;
var playButton;

(function (window, document, undefined) {
    window.onload = init;

    function init() {
        console.log("init");

        //Cache DOMs
        beatSelect = document.getElementById('beatSelect');
        violaSelect = document.getElementById('violaSelect');
        bpmInput = document.getElementById('bpmSelect');
        instrumentTable = document.getElementById('instrumentTable');
        playButton = document.getElementById('playButton');
        initHeader();
        initTable();
        initAudio();

        // Check for shared pattern in URL first
        if (!loadSharedPattern()) {
            changeBeat();
        }
        changeBpm();

        console.log("initiated");
    }

})(window, document, undefined);

//////////////////////////// CONFIGURATION ////////////////////////////
function changeBeat() {
    var beatIndex = beatSelect.value;
    console.log("beat" + beatIndex);
    currentBeat = beatArray[beatIndex];
    bpmInput.value = beatBPMArray[beatIndex];
    changeBpm();
    renderBeatArray();
}

function changePanning(panValue, groupIndex) {
    console.log("Pan:", panValue, "Group:", groupIndex);
    groupPanArray[groupIndex] = parseFloat(panValue);
    const rows = instrumentGroups[groupIndex].rows;
    for (let i = 0; i < rows.length; i++) {
        if (pannerNodes[rows[i]]) {
            pannerNodes[rows[i]].pan.value = parseFloat(panValue);
        }
    }
}

function toggleSubdivision() {
    subdivision = (subdivision === 8) ? 16 : 8;
    document.getElementById('subdivButton').value = (subdivision === 8) ? "16th" : "8th";
    // Rebuild header and table for new column count
    let tHead = instrumentTable.getElementsByTagName("tfoot")[0];
    while (tHead.firstChild) {
        tHead.removeChild(tHead.firstChild);
    }
    initHeader();
    initTable();
    renderBeatArray();
}

function initHeader() {
    let tHead = instrumentTable.getElementsByTagName("tfoot")[0];
    let labels = getVisibleLabels();
    let numCols = labels.length;

    let newHeaderRow = document.createElement("tr");
    tHead.appendChild(newHeaderRow);
    for (let i = 0; i < numCols + 1; i++) {
        let newCell = document.createElement("th");
        newHeaderRow.appendChild(newCell);
        if (i === 0) {
            let modeButton = document.createElement("input");
            modeButton.type = "button";
            modeButton.className = "modeButton";
            modeButton.value = "Vol/Pan";
            modeButton.addEventListener("click", (event) => {
                mode = mode + 1;
                if (mode > 2) {
                    mode = 0;
                }
                initTable();
                renderBeatArray();
            });
            newCell.appendChild(modeButton);
        } else {
            let visCols = getVisibleColumns();
            let beatCol = visCols[i - 1];
            if (beatCol % 4 === 0) {
                newCell.classList.add("downbeat");
            }
            newCell.innerHTML = labels[i - 1];
        }
    }
}

function initTable() {
    let tBody = instrumentTable.getElementsByTagName("tbody")[0];
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    let visCols = getVisibleColumns();
    let numCols = visCols.length;

    for (let i = 0; i < MAX_NOTE; i++) {
        let newTableRow = document.createElement("tr");
        tBody.appendChild(newTableRow);

        // Determine which group this row belongs to and if it's the first row
        let groupIndex = getGroupForRow(i);
        let group = instrumentGroups[groupIndex];
        let isFirstRowOfGroup = (group.rows[0] === i);

        for (let j = 0; j < numCols + 1; j++) {
            let newCell = document.createElement("td");
            newTableRow.appendChild(newCell);
            if (j === 0) {
                if (mode === 0) {
                    newCell.innerHTML = soundLabel[i];
                } else if (isFirstRowOfGroup) {
                    if (mode === 1) {
                        let volSlide = document.createElement("input");
                        volSlide.type = "range";
                        volSlide.min = "0";
                        volSlide.max = "100";
                        volSlide.value = groupVolumeArray[groupIndex];
                        volSlide.className = "volumeSlider";
                        volSlide.step = "10";
                        const gIdx = groupIndex;
                        volSlide.addEventListener("change", (event) => {
                            changeVolume(event.target.value, gIdx);
                        });
                        newCell.appendChild(volSlide);
                    } else if (mode === 2) {
                        let panSlide = document.createElement("input");
                        panSlide.type = "range";
                        panSlide.min = "-1";
                        panSlide.max = "1";
                        panSlide.value = groupPanArray[groupIndex];
                        panSlide.className = "panSlider";
                        panSlide.step = "1";
                        const gIdx = groupIndex;
                        panSlide.addEventListener("change", (event) => {
                            changePanning(event.target.value, gIdx);
                        });
                        newCell.appendChild(panSlide);
                    }
                } else {
                    newCell.innerHTML = group.name;
                    newCell.className = "groupLabel";
                }
            } else {
                // Highlight downbeat columns (beats 1, 2, 3, 4 = indices 0, 4, 8, 12)
                let beatCol = visCols[j - 1];
                if (beatCol % 4 === 0) {
                    newCell.classList.add("downbeat");
                }
                let newButton = document.createElement("input");
                newButton.type = "button";
                newButton.className = "noteButton";
                // Store the actual beat index on the button for easy lookup
                newButton.dataset.beatCol = visCols[j - 1];
                newButton.addEventListener("click", (event) => {
                    changeNote(event.target);
                });
                newCell.appendChild(newButton);
            }
        }
    }
}

function renderBeatArray() {
    let tBody = instrumentTable.getElementsByTagName("tbody")[0];
    let bodyRowArray = tBody.getElementsByTagName("tr");
    let visCols = getVisibleColumns();

    for (let i = 0; i < bodyRowArray.length; i++) {
        let tr = bodyRowArray[i];
        if (tr !== undefined) {
            for (let j = 0; j < visCols.length; j++) {
                let td = tr.getElementsByTagName("td")[j + 1];
                if (td) {
                    let tdButton = td.getElementsByTagName("input")[0];
                    if (tdButton) {
                        let beatCol = visCols[j];
                        let velocity = currentBeat[i][beatCol] || 0;
                        tdButton.style.background = velocityColors[velocity];
                    }
                }
            }
        }
    }
}

function changeBpm() {
    sound_delay = (60000 / bpmInput.value) / 4;
    console.log("delay" + sound_delay);
}

function changeViola() {
    if (violaSelect.value < 0) {
        //set viola same as gunga
        currentBeat[6] = currentBeat[0];
        currentBeat[7] = currentBeat[1];
        currentBeat[8] = currentBeat[2];
    } else {
        //set viol to corresponding viola array position
        currentBeat[6] = violaArray[violaSelect.value][0];
        currentBeat[7] = violaArray[violaSelect.value][1];
        currentBeat[8] = violaArray[violaSelect.value][2];

    }
    renderBeatArray();
}

function changeVolume(volumeLevel, groupIndex) {
    console.log("volume:" + volumeLevel + " group:" + groupIndex);
    groupVolumeArray[groupIndex] = volumeLevel;
    const newVolume = volumeLevel / 100;
    const rows = instrumentGroups[groupIndex].rows;
    for (let i = 0; i < rows.length; i++) {
        if (gainNodes[rows[i]]) {
            gainNodes[rows[i]].gain.value = newVolume;
        }
    }
}

// Velocity colors: 0=off, 1=soft, 2=normal, 3=loud
const velocityColors = ["white", "#FFA500", "#FF7500", "#FF0000"];
const velocityMultiplier = [0, 0.5, 1.0, 1.5]; // volume multipliers per velocity level

function changeNote(tdButton) {
    let row = tdButton.parentElement.parentElement.rowIndex;
    let beatCol = parseInt(tdButton.dataset.beatCol);
    let current = currentBeat[row][beatCol] || 0;
    currentBeat[row][beatCol] = (current + 1) % 4;
    renderBeatArray();
}


let scheduleAheadTime = 0.1; // seconds
let lookahead = 25; // ms
let nextNoteTime;

function scheduler() {
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
        scheduleNote(currentTime, nextNoteTime);
        nextNote();
    }
    timerID = setTimeout(scheduler, lookahead);
}

// Playback always uses all 16 columns regardless of subdivision view
function scheduleNote(index, when) {
    for (let i = 0; i < MAX_NOTE; i++) {
        let velocity = currentBeat[i][index] || 0;
        if (velocity > 0) {
            const source = audioCtx.createBufferSource();
            source.buffer = audioBuffers[i];
            // Create a per-note gain for velocity
            const velocityGain = audioCtx.createGain();
            velocityGain.gain.value = velocityMultiplier[velocity];
            velocityGain.connect(pannerNodes[i]);
            source.connect(velocityGain);
            source.start(when);
        }
    }

    // Delay UI update slightly to match audio
    setTimeout(() => renderNextColumn(index), (when - audioCtx.currentTime) * 1000);
}

function nextNote() {
    nextNoteTime += sound_delay / 1000;
    currentTime++;
    if (currentTime >= MAX_BEATS) currentTime = 0;
}

function playPause() {
    if (isPlaying) {
        stop();
        playButton.value = "Play";
    } else {
        startPlayback();
        playButton.value = "Pause";
    }
    isPlaying = !isPlaying;
}

function startPlayback() {
    nextNoteTime = audioCtx.currentTime;
    audioCtx.resume().then(() => {
        loadSounds().then(() => {
            currentTime = 0;
            nextNoteTime = audioCtx.currentTime;
            scheduler();
        });
    });
}

function renderNextColumn(beatIndex) {
    let tHead = instrumentTable.getElementsByTagName("tfoot")[0];
    let row = tHead.getElementsByTagName("tr")[0];
    let visCols = getVisibleColumns();

    // Find the visible column index for this beat index
    let visIdx = visCols.indexOf(beatIndex);

    // Clear previous highlight
    let allTh = row.getElementsByTagName("th");
    // Find the previous beat index
    let prevBeatIndex = (beatIndex === 0) ? MAX_BEATS - 1 : beatIndex - 1;
    let prevVisIdx = visCols.indexOf(prevBeatIndex);

    if (visIdx >= 0) {
        allTh[visIdx + 1].style.background = "#D6EEEE";
    }
    if (prevVisIdx >= 0) {
        allTh[prevVisIdx + 1].style.background = "black";
    }
}


////////////////////// audio ctrl //////////////////////

// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext);
var sound_delay = 80;
var currentTime = 0;
const MAX_NOTE = 18;
const MAX_BEATS = 16;
const gainNodes = [];
const pannerNodes = [];

function setupGains() {
    for (let i = 0; i < audioBuffers.length; i++) {
        const gainNode = audioCtx.createGain();
        gainNode.connect(audioCtx.destination);
        gainNodes[i] = gainNode;
        // Stereo panning setup - use group pan values
        const pannerNode = audioCtx.createStereoPanner();
        pannerNode.connect(gainNode);
        pannerNodes[i] = pannerNode;
        let groupIndex = getGroupForRow(i);
        pannerNode.pan.value = groupPanArray[groupIndex];
        gainNode.gain.value = groupVolumeArray[groupIndex] / 100;
    }
    console.log("gain/panners nodes set up");
}

function stop() {
    if (timerID) {
        clearTimeout(timerID);
        timerID = null;
    }
}

let audioBuffers = [];

async function loadSounds() {
    for (let i = 0; i < soundFiles.length; i++) {
        const response = await fetch(soundFiles[i]);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await audioCtx.decodeAudioData(arrayBuffer);
        audioBuffers[i] = buffer;
    }
    console.log("sounds loaded");
}

async function initAudio() {
    console.log("init audio");
    await loadSounds();
    setupGains();
}


////////////////////// SHAREABLE PATTERNS //////////////////////

function encodePattern() {
    // Header: 3 bytes [beatIndex, violaIndex+1 (offset to avoid negative), bpm]
    // Grid: 18 rows × 4 bytes each (16 cells × 2 bits = 32 bits per row) = 72 bytes
    // Total: 75 bytes → ~100 chars base64
    const bytes = new Uint8Array(75);
    bytes[0] = parseInt(beatSelect.value);
    bytes[1] = parseInt(violaSelect.value) + 2;
    bytes[2] = parseInt(bpmInput.value);

    for (let row = 0; row < MAX_NOTE; row++) {
        // Pack 16 cells × 2 bits = 32 bits into 4 bytes
        let bits = 0;
        for (let col = 0; col < MAX_BEATS; col++) {
            let vel = (currentBeat[row] && currentBeat[row][col]) || 0;
            bits |= ((vel & 0x3) << (30 - col * 2));
        }
        const offset = 3 + row * 4;
        bytes[offset]     = (bits >>> 24) & 0xFF;
        bytes[offset + 1] = (bits >>> 16) & 0xFF;
        bytes[offset + 2] = (bits >>> 8) & 0xFF;
        bytes[offset + 3] = bits & 0xFF;
    }

    // Convert to URL-safe base64
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function decodePattern(encoded) {
    try {
        // Restore base64 padding
        let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) base64 += '=';
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        const state = {
            b: bytes[0],
            v: bytes[1] - 2,
            bpm: bytes[2],
            g: []
        };

        for (let row = 0; row < MAX_NOTE; row++) {
            const offset = 3 + row * 4;
            const bits = (bytes[offset] << 24) | (bytes[offset + 1] << 16) |
                         (bytes[offset + 2] << 8) | bytes[offset + 3];
            const rowArr = [];
            for (let col = 0; col < MAX_BEATS; col++) {
                rowArr.push((bits >>> (30 - col * 2)) & 0x3);
            }
            state.g.push(rowArr);
        }

        return state;
    } catch (e) {
        console.error("Failed to decode pattern:", e);
        return null;
    }
}

function sharePattern() {
    const encoded = encodePattern();
    const url = window.location.origin + window.location.pathname + '?p=' + encoded;

    // Copy to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showShareFeedback("Link copied!");
        }).catch(() => {
            fallbackCopyToClipboard(url);
        });
    } else {
        fallbackCopyToClipboard(url);
    }
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showShareFeedback("Link copied!");
    } catch (e) {
        showShareFeedback("Copy failed — check console");
        console.log("Share URL:", text);
    }
    document.body.removeChild(textarea);
}

function showShareFeedback(message) {
    const btn = document.getElementById('shareButton');
    const originalValue = btn.value;
    btn.value = message;
    btn.classList.add('share-success');
    setTimeout(() => {
        btn.value = originalValue;
        btn.classList.remove('share-success');
    }, 2000);
}

function loadSharedPattern() {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('p');
    if (!encoded) return false;

    const state = decodePattern(encoded);
    if (!state) return false;

    console.log("Loading shared pattern:", state);

    // Apply beat selection
    if (state.b !== undefined && state.b >= 0 && state.b < beatArray.length) {
        beatSelect.value = state.b;
    }

    // Apply viola selection
    if (state.v !== undefined) {
        violaSelect.value = state.v;
    }

    // Apply BPM
    if (state.bpm !== undefined) {
        // Set closest BPM option or exact value
        let bpmFound = false;
        for (let i = 0; i < bpmInput.options.length; i++) {
            if (parseInt(bpmInput.options[i].value) === state.bpm) {
                bpmInput.value = state.bpm;
                bpmFound = true;
                break;
            }
        }
        if (!bpmFound) {
            // Add a custom option for this BPM
            const opt = document.createElement('option');
            opt.value = state.bpm;
            opt.text = 'Custom (' + state.bpm + ')';
            bpmInput.appendChild(opt);
            bpmInput.value = state.bpm;
        }
    }

    // First load the base beat pattern
    currentBeat = beatArray[beatSelect.value].map(row => [...row]);

    // Overlay the shared grid directly (already decoded as arrays of 0/1/2/3)
    if (state.g && Array.isArray(state.g)) {
        for (let i = 0; i < state.g.length && i < currentBeat.length; i++) {
            if (Array.isArray(state.g[i])) {
                currentBeat[i] = state.g[i];
            }
        }
    }

    changeBpm();
    renderBeatArray();

    // Show a subtle indicator that a shared pattern was loaded
    showSharedPatternBanner();

    return true;
}

function showSharedPatternBanner() {
    const banner = document.createElement('div');
    banner.id = 'sharedBanner';
    banner.className = 'shared-banner';
    banner.innerHTML = 'Shared pattern loaded! <span class="banner-close" onclick="this.parentElement.remove()">✕</span>';
    document.body.insertBefore(banner, document.body.firstChild);
    setTimeout(() => {
        if (banner.parentElement) banner.classList.add('banner-fade');
        setTimeout(() => { if (banner.parentElement) banner.remove(); }, 500);
    }, 4000);
}