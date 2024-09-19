
function bollywood() {
    console.log("entered");
    
    let m = Math.random() * (1 - 4) + 5;
    let n = (Math.floor(m))-1;
    let music = ["sounds/bollywood.mp3","sounds/dhh.mp3","sounds/rock.mp3","sounds/edm.mp3"]
    console.log(n);
    playAudio(music[n]);
    console.log("exited");
    
}
bollywood();