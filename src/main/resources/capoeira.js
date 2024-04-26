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
var logInput;
(function(window, document, undefined){
window.onload = init;

  function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
	console.log("init");

	//Cache DOMs
    beatSelect = document.getElementById('beatSelect');
    bpmInput = document.getElementById('bpmInput');
    logInput = document.getElementById('logInput');

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
}

function changeBpm() {
    sound_delay = (60000 / bpmInput.value) / 4  ;
    console.log("delay" + sound_delay);
}

function changeNote(tdElement, instrumentIndex) {
    console.log(tdElement.rowIndex);
}



////////////////////// audio ctrl //////////////////////

// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext);
var convolver;
var sound_delay = 80;
var currentTime = 0;
const audioElement = [];
const MAX_NOTE = 7;

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


    console.log("audio started")
}
