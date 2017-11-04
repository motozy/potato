window.AudioContext = window.webkitAudioContext || window.AudioContext;
var ctx = null;
var osc = null;
var timer = null;

function playOscillator(noteNumber) {
    if(!ctx){
        ctx = new AudioContext();
    }
    if(osc){
        osc.stop();
        osc = null;
    }
    if(noteNumber){
        osc = ctx.createOscillator();
        osc.connect(ctx.destination);
        osc.type = "square";
        osc.frequency.value = 440 * Math.pow(2, (noteNumber - 69) / 12);
        osc.start();
    }
}

function potato() {
    const notes = [ 79, 77, 79, 0 ];
    var index = 0;

    var potato = document.getElementById("potato");
    potato.className = "waiting";
    potato.onclick = function(){
        if(timer){
            potato.className = "waiting";
            clearInterval(timer);
            timer = null;
            playOscillator(0);
        }else{
            potato.className = "ready";
            index = 0;
            timer = setInterval(function(){
                playOscillator(notes[index])
                index = (index + 1) % notes.length;
            }, 250);
        }
    };
}

potato();
