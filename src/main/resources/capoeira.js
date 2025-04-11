////////////////////////MODEL //////////////////////////////////////
const saoBentoGrandeAngola = [
    [1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],//gunga chi
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//gunga din
    [0,0,0,0, 0,0,0,0, 1,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 1,0,0,0],//gunga don

    [1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],//medio chi
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//medio din
    [0,0,0,0, 0,0,0,0, 1,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 1,0,0,0],//medio don

    [1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,1,0],//viola chi
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//viola din
    [0,0,0,0, 0,0,0,0, 1,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 1,0,0,0],//viola don

    [0,0,1,0, 0,0,0,0, 1,0,0,0, 1,0,0,0, 0,0,1,0, 0,0,0,0, 1,0,0,0, 1,0,0,0], //clap

    [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//atabaque dak
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0], //atabaque dum

    [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//agogo don
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0], //agogo din

    [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//pandeiro don
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0], //pandeiro dim

];
const angola = [
    [1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],//gunga chi
    [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//gunga din
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//gunga don

    [1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],//medio chi
    [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//medio din
    [1,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//medio don


    [1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],//viola chi
    [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//viola din
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//viola don

    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], //clap
    [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//atabaque dak
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0], //atabaque dum
    [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//agogo don
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0], //agogo dim
    [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//pandeiro dak
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0], //pandeiro dum
];
const saoBentoPequenoAngola = [
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0],//gunga chi
    [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],//gunga din
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//gunga don

    [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0],//medio chi
    [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],//medio din
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//medio don

    [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0],//viola chi
    [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],//viola din
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//viola don

    [1,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0], //clap
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//atabaque dak
    [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0], //atabaque dum
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//agogo don
    [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0], //agogo din
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//pandeiro dak
    [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0], //pandeiro dum

];

const saoBentoGrandeRegional = [
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0],//gunga chi
    [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//gunga din
    [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//gunga don

    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0],//medio chi
    [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//medio din
    [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//medio don


    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0],//viola chi
    [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//viola din
    [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//viola don

    [1,0,0,0, 1,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0, 0,0,0,0], //clap
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//atabaque dak
    [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,1,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,1,0], //atabaque dum
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//agogo don
    [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] //agogo din
];

const violaVariation1 = [
    [1,0,1,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],//viola chi
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//viola din
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//viola don
];
const violaVariation2 = [
    [1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,1,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//viola chi
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],//viola din
    [0,0,0,0, 1,0,1,0, 1,0,1,0, 1,0,0,1, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//viola don
];
const violaVariation3 = [
    [1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//viola chi
    [0,0,0,0, 0,0,0,0, 1,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],//viola din
    [0,0,0,0, 1,0,0,0, 0,0,1,0, 0,0,1,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//viola don
];
const violaVariation4 = [
    [1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//viola chi
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],//viola din
    [0,0,0,0, 0,0,1,0, 0,0,1,0, 1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//viola don
];
const violaVariation5 = [
    [1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//viola chi
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],//viola din
    [0,0,0,0, 0,0,1,0, 0,1,0,1, 0,0,1,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//viola don
];
const violaVariation6 = [
    [1,0,1,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],//viola chi
    [0,0,0,0, 0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],//viola din
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0],//viola don
];
const violaArray = [violaVariation1,violaVariation2, violaVariation3, violaVariation4, violaVariation5,violaVariation6];
const beatArray = [saoBentoGrandeAngola, angola, saoBentoPequenoAngola, saoBentoGrandeRegional];
const beatBPMArray = [150, 120, 140, 180];

var currentBeat= beatArray[0];

////////DOM CACHING//////////////////
var beatSelect;
var violaSelect;
var bpmInput;
var instrumentTable;

(function(window, document, undefined){
window.onload = init;

  function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
	console.log("init");

	//Cache DOMs
    beatSelect = document.getElementById('beatSelect');
    violaSelect = document.getElementById('violaSelect');
    bpmInput = document.getElementById('bpmInput');
    instrumentTable = document.getElementById('instrumentTable');


	initAudio();
    changeBeat();
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

function renderBeatArray() {
    for (var i =0; i < MAX_NOTE; i++) {
        var tr = instrumentTable.getElementsByTagName("tr")[i + 1];
        for (var j =0; j < MAX_BEATS; j++) {
            var td = tr.getElementsByTagName("input")[j + 1];
            if (currentBeat[i][j]) {
                td.style.background = "orangered";
            } else {
                td.style.background = "white";

            }
        }
    }
}

function changeBpm() {
    sound_delay = (60000 / bpmInput.value) / 4  ;
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

function changeVolume(volumeLevel, intrumentArray) {
    var newVolume = volumeLevel  / 100;
    for(var i = 0; i < intrumentArray.length; i++) {
        audioElement[intrumentArray[i]].volume = newVolume;
    }
}

function changeNote(tdButton) {

    currentBeat[tdButton.parentElement.parentElement.rowIndex - 1][tdButton.parentElement.cellIndex - 1] = !currentBeat[tdButton.parentElement.parentElement.rowIndex - 1][tdButton.parentElement.cellIndex - 1];
    renderBeatArray();
}

function muteNote(tdButton, instrumentIndex) {
    audioElement[tdButton.parentElement.parentElement.rowIndex].muted = !audioElement[tdButton.parentElement.parentElement.rowIndex].muted;
    if (audioElement[tdButton.parentElement.parentElement.rowIndex].muted) {
        tdButton.parentElement.style.background ="red";
    } else {
        tdButton.parentElement.style.background ="green";
    }
}



////////////////////// audio ctrl //////////////////////

// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext);
const reverbImpulseURL = "./factory.hall.wav";
var convolver;
var sound_delay = 80;
var currentTime = 0;
const audioElement = [];
const MAX_NOTE = 16;
const MAX_BEATS=32;

var playing = false;
function play() {
    playing = true;
    currentTime = 0;
    setTimeout(playNextTime, sound_delay, 0);
}


function stop() {
    playing = false;
}



function playNextTime() {
    audioCtx.resume();
    var row = instrumentTable.getElementsByTagName("tr")[0];
    var tempoTableCurrent = currentTime + 1;
    var td = row.getElementsByTagName("th")[tempoTableCurrent];
    td.style.background = "#D6EEEE";
    var prevTd;
    if (tempoTableCurrent === 1) {
        prevTd = row.getElementsByTagName("th")[32];
    } else {
        prevTd = row.getElementsByTagName("th")[tempoTableCurrent - 1];
    }
    prevTd.style.background = "black";


    for (var i = 0; i < MAX_NOTE; i++) {
        if (currentBeat[i][currentTime]) {
            audioElement[i].currentTime = 0;
            audioElement[i].play();
        }
    }
    if (playing) {
        currentTime = currentTime + 1;
        if (currentTime >= currentBeat[0].length) {
            currentTime = 0;
        }
        setTimeout(playNextTime, sound_delay, 0);
    }
}



function initAudio() {
    console.log("init audio");

    for (var i = 0; i < MAX_NOTE; i++) {

        audioElement[i] = document.getElementById('audio' + i);
        console.log("audio element found");
    };


    convolver = audioCtx.createConvolver();
    convolver.connect(audioCtx.destination);
    loadImpulse(reverbImpulseURL);

    console.log("audio started")
}

var loadImpulse = function ( url )
{
    var request = new XMLHttpRequest();
    request.open( "GET", url, 1 );
    request.responseType = "arraybuffer";
    request.onload = function ()
    {
        audioCtx.decodeAudioData( request.response, function ( buffer ) {
            convolver.buffer = buffer;
        }, function ( e ) { console.log( e ); } );
    };request.onerror = function ( e )
{
    console.log( e );
};
    request.send();
};