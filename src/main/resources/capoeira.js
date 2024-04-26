////////////////////////MODEL //////////////////////////////////////
const saoBentoGrandeAngola = [
    [false,false,false,false, false,false,false,false, false,false,false,false, true ,false,true ,false, false,false,false,false, false,false,false,false, false,false,false,false, true ,false,true ,false],//gunga chi
    [true ,false,false,false, false,false,false,false, false,false,false,false, false,false,false,false, true ,false,false,false, false,false,false,false, false,false,false,false, false,false,false,false],//gunga din
    [false,false,false,false, true ,false,false,false, true ,false,false,false, false,false,false,false, false,false,false,false, true ,false,false,false, true ,false,false,false, false,false,false,false],//gunga don
    [false,false,false,false, false,false,false,false, false,false,false,false, false,false,false,false, false,false,false,false, false,false,false,false, false,false,false,false, true ,false,true ,false],//viola chi
    [false,false,false,false, true ,false,false,false, true ,false,false,false, false,false,true ,false, false,false,false,false, true ,false,false,false, false,false,false,false, false,false,false,false],//viola din
    [true ,false,false,false, false,false,true ,false, false,false,true ,false, false,false,false,false, true ,false,false,false, false,false,false,false, false,false,false,false, false,false,false,false],//viola don
    [true ,false,false,false, false,false,true ,false, false,false,false,false, true ,false,false,false, true ,false,false,false, false,false,true ,false, false,false,false,false, true ,false,false,false] //clap
];
const beatArray = [saoBentoGrandeAngola];

var currentBeat= beatArray[0];

////////DOM CACHING//////////////////
var beatSelect;
var bpmInput;
var instrumentTable;
var tempoTable;

(function(window, document, undefined){
window.onload = init;

  function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
	console.log("init");

	//Cache DOMs
    beatSelect = document.getElementById('beatSelect');
    bpmInput = document.getElementById('bpmInput');
    instrumentTable = document.getElementById('instrumentTable');
    tempoTable = document.getElementById('tempoTable');


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
    renderBeatArray();
}

function renderBeatArray() {
    for (var i =0; i < MAX_NOTE; i++) {
        var tr = instrumentTable.getElementsByTagName("tr")[i];
        for (var j =0; j < MAX_BEATS; j++) {
            var td = tr.getElementsByTagName("td")[j];
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

function changeNote(tdElement) {
    console.log(tdElement.cellIndex);
    console.log(tdElement.parentElement.rowIndex);
    currentBeat[tdElement.parentElement.rowIndex][tdElement.cellIndex] = !currentBeat[tdElement.parentElement.rowIndex][tdElement.cellIndex];
    renderBeatArray();
}

function muteNote(tdElement, instrumentIndex) {
    console.log(tdElement.cellIndex);
    console.log(tdElement.parentElement.rowIndex);
    audioElement[tdElement.parentElement.rowIndex].muted = !audioElement[tdElement.parentElement.rowIndex].muted;
}



////////////////////// audio ctrl //////////////////////

// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext);
const reverbImpulseURL = "./factory.hall.wav";
var convolver;
var sound_delay = 80;
var currentTime = 0;
const audioElement = [];
const MAX_NOTE = 7;
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
    var row = tempoTable.getElementsByTagName("tr")[0];
    var td = row.getElementsByTagName("td")[currentTime];
    td.style.background = "#D6EEEE";
    var prevTd;
    if (currentTime === 0) {
        prevTd = row.getElementsByTagName("td")[31];
    } else {
        prevTd = row.getElementsByTagName("td")[currentTime - 1];
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
    request.open( "GET", url, true );
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