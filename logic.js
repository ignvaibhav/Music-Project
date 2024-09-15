let currentAudio = null;
let currentIndex = -1;

//random music logic

function bollywood() {
    console.log("entered");    
    
    // var n = Math.floor(Math.random() * 5);        // more effecient random num gen

    let music = ["sounds/bollywood/bollywood1.mp3","sounds/bollywood/bollywood2.mp3","sounds/bollywood/bollywood3.mp3","sounds/bollywood/bollywood4.mp3","sounds/bollywood/bollywood5.mp3"]

    // console.log(n);
    console.log(currentIndex);

    playAudio(music[currentIndex]);
    console.log("exited"); 
}
function dhh() {
    console.log("entered");
  
    var n = Math.floor(Math.random() * 6);  

    let music = ["sounds/dhh/dhh1.mp3","sounds/dhh/dhh2.mp3","sounds/dhh/dhh3.mp3","sounds/dhh/dhh4.mp3","sounds/dhh/dhh5.mp3","sounds/dhh/dhh6.mp3"]

    playAudio(music[currentIndex]);
    console.log("exited");
    
}
function rock() {
    console.log("entered");

    let music = ["sounds/rock/rock1.mp3","sounds/rock/rock2.mp3","sounds/rock/rock3.mp3","sounds/rock/rock4.mp3","sounds/rock/rock5.mp3"]
    
    playAudio(music[currentIndex]);
    console.log("exited");
    
}

function metal() {
    console.log("entered");

    let music = ["sounds/metal/metal1.mp3", "sounds/metal/metal2.mp3", "sounds/metal/metal3.mp3", "sounds/metal/metal4.mp3", "sounds/metal/metal5.mp3"]

    playAudio(music[currentIndex]);
    console.log("exited");
    
}

function classical() {

    console.log("entered");

    let music = ["sounds/classical/classical1.mp3","sounds/classical/classical2.mp3","sounds/classical/classical3.mp3","sounds/classical/classical4.mp3","sounds/classical/classical5.mp3"]

    
    playAudio(music[currentIndex]);
    console.log("exited");
    
}

function edm() {
    
    console.log("entered");

    let music = ["sounds/edm/edm1.mp3","sounds/edm/edm2.mp3","sounds/edm/edm3.mp3","sounds/edm/edm4.mp3","sounds/edm/edm5.mp3"]
  
   playAudio(music[currentIndex]);
    console.log("exited");
    
}

function punjabi() {
    
    console.log("entered");

    let music = ["sounds/punjabi/punjabi1.mp3","sounds/punjabi/punjabi2.mp3","sounds/punjabi/punjabi3.mp3","sounds/punjabi/punjabi4.mp3","sounds/punjabi/punjabi5.mp3"]


   playAudio(music[currentIndex]);
    console.log("exited");
    
}

function handleMusicClick() {
    const clickedButton = this.innerHTML;

    currentIndex = currentIndex + 1;

    if (currentIndex === 5) {
        currentIndex = 0;
    }

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }


    switch (clickedButton) {
        case "Bollywood":
            console.log("level1");
            bollywood();
            break;
        case "DHH":
            dhh();
            break;
        case "Rock":
            rock();
            break;
        case "Metal":
            metal();
            break;
        case "EDM":
            edm();
            break;
        case "Classical":
            classical();
            break;
        case "Punjabi":
            punjabi();
            break;
        default:
            console.log("Invalid genre");
    }
}

function showPopup() {
    console.log("Showing popup");
    gsap.to(".feedback", {
        duration: 0.8,
        opacity: "100%",
        y: 100,
        ease: "power2.out",
    });

}

function playAudio(src) {
    currentAudio = new Audio(src);
    currentAudio.play();
    gsap.to(".vishnu", {
        opacity: "10%"
    });
    gsap.to(".card", {
        opacity: "10%"
    });
    gsap.to(".judger", {
        opacity: "10%"
    });
    gsap.to(".underline", {
        opacity: "10%"
    });
    currentAudio.addEventListener('ended', showPopup);
}

document.addEventListener("keydown", (event) => {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

      currentIndex = currentIndex + 1;

    if (currentIndex === 5) {
        currentIndex = 0;
    }

    switch (event.key) {
        case "z":
            bollywood();
            break;
        case "x":
            dhh();
            break;
        case "c":
            rock();
            break;
        case "v":
            metal();
            break;
        case "b":
            edm();
            break;
        case "n":
            punjabi();
            break;
        case "m":
            classical();
            break;
        case "0":
            gsap.to(".vishnu", {
                opacity: "100%"
            });
            gsap.to(".card", {
                opacity: "100%"
            });
            gsap.to(".judger", {
                opacity: "100%"
            });
            gsap.to(".underline", {
                opacity: "100%"
            });
            if (currentAudio && !currentAudio.paused) {
                currentAudio.pause();
            }
            break;
        default:
            console.log("Invalid key");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".card").forEach((card) => {
        card.addEventListener("click", handleMusicClick);
    });
});


function yes() {
    console.log("Yes clicked");
    gsap.to(".feedback", {
        opacity: "0%"
    });
    gsap.to(".spotify-player-container", {
        duration: 0.7,
        opacity: 1,
        y: -500,
        ease: "power2.out",
        display: "inline"
    });
}