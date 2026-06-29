const SERVICE_UUID = "0000ffe5-0000-1000-8000-00805f9a34fb";

const app = {

    midiOutput:null,

    imu:{
        ax:0,
        ay:0,
        az:0,
        wx:0,
        wy:0,
        wz:0,
        roll:0,
        pitch:0,
        yaw:0
    }

};

function s16(lo,hi){

    let v=(hi<<8)|lo;

    if(v>32767)
        v-=65536;

    return v;

}

async function connectBluetooth(){

    const device =
        await navigator.bluetooth.requestDevice({

            filters:[
                {namePrefix:"WT"}
            ],

            optionalServices:[
                SERVICE_UUID
            ]

        });

    document.getElementById("status").innerText=device.name;

    const server =
        await device.gatt.connect();

    const service =
        await server.getPrimaryService(SERVICE_UUID);

    const chars =
        await service.getCharacteristics();

    const notify =
        chars.find(c=>c.properties.notify);

    await notify.startNotifications();

    notify.addEventListener(
        "characteristicvaluechanged",
        onPacket
    );

}

function onPacket(event){

    const b =
        new Uint8Array(event.target.value.buffer);

    if(b.length<20)
        return;

    if(b[0]!=0x55)
        return;

    if(b[1]!=0x61)
        return;

    app.imu.ax=s16(b[2],b[3])*16/32768;
    app.imu.ay=s16(b[4],b[5])*16/32768;
    app.imu.az=s16(b[6],b[7])*16/32768;

    app.imu.wx=s16(b[8],b[9])*2000/32768;
    app.imu.wy=s16(b[10],b[11])*2000/32768;
    app.imu.wz=s16(b[12],b[13])*2000/32768;

    app.imu.roll=s16(b[14],b[15])*180/32768;
    app.imu.pitch=s16(b[16],b[17])*180/32768;
    app.imu.yaw=s16(b[18],b[19])*180/32768;

}

function render(){

    ax.innerText=app.imu.ax.toFixed(2)+" g";
    ay.innerText=app.imu.ay.toFixed(2)+" g";
    az.innerText=app.imu.az.toFixed(2)+" g";

    wx.innerText=app.imu.wx.toFixed(1)+" °/s";
    wy.innerText=app.imu.wy.toFixed(1)+" °/s";
    wz.innerText=app.imu.wz.toFixed(1)+" °/s";

    roll.innerText=app.imu.roll.toFixed(1)+" °";
    pitch.innerText=app.imu.pitch.toFixed(1)+" °";
    yaw.innerText=app.imu.yaw.toFixed(1)+" °";

    requestAnimationFrame(render);

}

async function initMidi(){

    if(!navigator.requestMIDIAccess)
        return;

    const midi =
        await navigator.requestMIDIAccess();

    const select =
        document.getElementById("midiOutputs");

    for(const output of midi.outputs.values()){

        const option=document.createElement("option");

        option.value=output.id;
        option.textContent=output.name;

        select.appendChild(option);

    }

    if(select.options.length){

        app.midiOutput=
            midi.outputs.get(select.options[0].value);

    }

    select.onchange=()=>{

        app.midiOutput=
            midi.outputs.get(select.value);

    };

}

function sendMidi(){

    if(!app.midiOutput)
        return;

    const note=
        Number(document.getElementById("note").value);

    app.midiOutput.send([0x90,note,127]);

    setTimeout(()=>{

        app.midiOutput.send([0x80,note,0]);

    },30);

}

document
    .getElementById("connectBtn")
    .onclick=connectBluetooth;

document
    .getElementById("testBtn")
    .onclick=sendMidi;

initMidi();

render();