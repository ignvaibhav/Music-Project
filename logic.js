let currentAudio = null;
let currentIndex = -1;


/* random❌ sequential✔️ music logic */

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
  
    // var n = Math.floor(Math.random() * 6);  

    let music = ["sounds/dhh/dhh1.mp3","sounds/dhh/dhh2.mp3","sounds/dhh/dhh3.mp3","sounds/dhh/dhh4.mp3", "sounds/dhh/dhh6.mp3"]
    
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

const supBro = (a) => {
    setTimeout(()=>{
        gsap.to([".turntable", ".record"], {
            opacity: 1,
            background: `url(images/${a}.png)`,
            duration: 2,
            delay: 0.3
          });
    },2000)
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
            ab();
            supBro("bollywood");
            setTimeout(()=>{
                bollywood();
            },2000)
            break;
        case "DHH":
            ab();
            supBro("dhh");
            setTimeout(()=>{
                dhh();
            },2000)
            break;
        case "Rock":
            ab();
            supBro("rock");
            setTimeout(()=>{
                rock();
            },2000)
            break;
        case "Metal":
            ab();
            supBro("metal");
            setTimeout(()=>{
                metal();
            },2000)
            break;
        case "EDM":
            ab();
            supBro("edm");
            setTimeout(()=>{
                edm();
            },2000)
            break;
        case "Classical":
            ab();
            supBro("classical");
            setTimeout(()=>{
                classical();
            },2000)
            break;
        case "Punjabi":
            ab();
            supBro("punjabi");
            setTimeout(()=>{
                punjabi();
            },2000)
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
            ab();
            supBro("bollywood");
            setTimeout(()=>{
                bollywood();
            },2000)
            break;
        case "x":
            ab();
            supBro("dhh");
            setTimeout(()=>{
                dhh();
            },2000)
            break;
        case "c":
            ab();
            supBro("rock");
            setTimeout(()=>{
                rock();
            },2000)
            break;
        case "v":
            ab();
            supBro("metal");
            setTimeout(()=>{
                metal();
            },2000)
            break;
        case "b":
            ab();
            supBro("edm");
            setTimeout(()=>{
                edm();
            },2000)
            break;
        case "n":
            ab();
            supBro("punjabi");
            setTimeout(()=>{
                punjabi();
            },2000)
            break;
        case "m":
            ab();
            supBro("classical");
            setTimeout(()=>{
                classical();
            },2000)
            break;
        case "0":
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // This provides a smooth scrolling effect
              });
            gsap.to(".page2", {
                opacity: 0,
                display: "none",
                duration: 0.5,
                delay: 0.2
            });
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

/* yet to decide for feedback */

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

function bc() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

function ab(){
    gsap.to(".page2", {
        opacity: 1,
        display: "flex",
        duration: 2,
        delay: 0.5
    });

    setTimeout(()=>{
        bc();
    },1000)

    setTimeout(()=>{
        playBtn.textContent = '⏸';
        arm.style.transform = 'rotate(0deg)';
        record.style.animationPlayState = 'running';
    }, 2000)
}

function playButton() {
    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
    }
    else{
        currentAudio.play();
    }
}