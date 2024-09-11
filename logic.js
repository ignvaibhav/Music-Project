import AudioMotionAnalyzer from 'audiomotion-analyzer';

let currentAudio = null;
const container = document.getElementById('container');
const audioSource = document.getElementById('currentAudio');
const audioMotion = new AudioMotionAnalyzer(container, { source: audioSource });


function handleMusicClick() {
    const clickedButton = this.innerHTML;

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    switch (clickedButton) {
        case "Bollywood":
            playAudio("sounds/bollywood.mp3");
            break;
        case "DHH":
            playAudio("sounds/dhh.mp3");
            break;
        case "Rock":
            playAudio("sounds/rock.mp3");
            break;
        case "EDM":
            playAudio("sounds/edm.mp3");
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

    switch (event.key) {
        case "z":
            playAudio("sounds/bollywood.mp3");
            break;
        case "x":
            playAudio("sounds/dhh.mp3");
            break;
        case "c":
            playAudio("sounds/rock.mp3");
            break;
        case "v":
            playAudio("sounds/edm.mp3");
            break;
        case " ":
            if (currentAudio && !currentAudio.paused) {
                currentAudio.pause();
            }
            break;
        default:
            console.log("Invalid key");
    }
});

// This is the crucial change
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