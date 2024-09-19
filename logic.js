// Initialize Swiper.js
document.addEventListener("DOMContentLoaded", function() {
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        keyboard: {
            enabled: true,
        },
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 10,
            stretch: -120,
            depth: 300,
            modifier: 1,
            slideShadows: true,
        },
        loop: true,
        mousewheel: {
            invert: false,
            sensitivity: 1,
            eventsTarget: '.swiper-slide'
        },
        on: {
            slideChange: function () {
                var activeSlide = this.slides[this.activeIndex];
                var genre = activeSlide.getAttribute('data-genre');
                console.log(genre);
                switchActiveIcon(genre);
            }
        }
    });
    
    const clickSound = document.getElementById("click-sound");
    
    // Play sound function
    function playClickSound() {
        // Reset the audio to start
        console.log("feuife");
        
        clickSound.currentTime = 0;
        clickSound.play();
    }
    
    // Detect scroll and play the sound
    swiper.on('slideChange', function () {
        playClickSound(); // Play click sound on slide change
    });

    function switchActiveIcon(genre) {
        console.log('Switching to genre:', genre);
    
        // Remove active class from all icons with animation
        const allIcons = document.querySelectorAll('.icon');
        console.log('Found', allIcons.length, 'icons');
        allIcons.forEach(function(icon) {
            gsap.to(icon, {
                opacity: 0, // Fade out effect
                duration: 0.2,
                onComplete: () => {
                    icon.classList.remove('active');
                    console.log('Removed active class from', icon.className);
                }
            });
        });
    
        // Add active class to the matching icon with animation
        const iconClass = genre.toLowerCase() + '_icon';
        const activeIcon = document.querySelector('.' + iconClass);
        console.log('Looking for icon with class:', iconClass);
    
        if (activeIcon) {
            // Ensure the icon is not already active
            if (!activeIcon.classList.contains('active')) {
                // Add active class with animation
                gsap.fromTo(activeIcon, 
                    { scale: 1, opacity: 0, bottom: "10px" }, // Start from scaled down and transparent
                    { scale: 3, opacity: 1, duration: 0.3, bottom: "0px" } // Animate to original size and opacity
                );
                activeIcon.classList.add('active');
                console.log('Added active class to', activeIcon.className);
            }
        } else {
            console.error('Could not find icon for genre:', genre);
        }
    }
    

    // Event listener for swiper slide clicks
    document.querySelectorAll(".swiper-slide").forEach((slide) => {
        slide.addEventListener("click", handleMusicClick);
    });
});



// Global variables
let currentGenre = null;
let currentAudio = null;
let currentIndex = 0;
const playBtn = document.querySelector("#play-button");
const arm = document.querySelector(".arm");
const record = document.querySelector(".record");

function nextsong(currentIndex) {
    console.log(currentIndex);
    currentIndex++;
    console.log(currentIndex);
    
}

const playlists = {
    bollywood: ["sounds/bollywood/Senorita.mp3","sounds/bollywood/Badtameez Dil.mp3","sounds/bollywood/Mitwa.mp3","sounds/bollywood/Tera Hone Laga Hoon.mp3","sounds/bollywood/Chaleya.mp3"],
    dhh: ["sounds/dhh/dhh1.mp3","sounds/dhh/dhh2.mp3","sounds/dhh/dhh3.mp3","sounds/dhh/dhh4.mp3", "sounds/dhh/dhh6.mp3"],
    rock: ["sounds/rock/rock1.mp3","sounds/rock/rock2.mp3","sounds/rock/rock3.mp3","sounds/rock/rock4.mp3","sounds/rock/rock5.mp3"],
    metal: ["sounds/metal/metal1.mp3", "sounds/metal/metal2.mp3", "sounds/metal/metal3.mp3", "sounds/metal/metal4.mp3", "sounds/metal/metal5.mp3"],
    classical: ["sounds/classical/classical1.mp3","sounds/classical/classical2.mp3","sounds/classical/classical3.mp3","sounds/classical/classical4.mp3","sounds/classical/classical5.mp3"],
    edm: ["sounds/edm/edm1.mp3","sounds/edm/edm2.mp3","sounds/edm/edm3.mp3","sounds/edm/edm4.mp3","sounds/edm/edm5.mp3"],
    punjabi: ["sounds/punjabi/punjabi1.mp3","sounds/punjabi/punjabi2.mp3","sounds/punjabi/punjabi3.mp3","sounds/punjabi/punjabi4.mp3","sounds/punjabi/punjabi5.mp3"]
};

function nextSong() {
    if (currentGenre) {
        currentIndex = (currentIndex + 1) % playlists[currentGenre].length;
        playAudio(playlists[currentGenre][currentIndex]);
        updateSongInfo();
    } else {
        console.log("No genre selected");
    }
}

function prevSong() {
    if (currentGenre) {
        currentIndex = (currentIndex - 1 + playlists[currentGenre].length) % playlists[currentGenre].length;
        playAudio(playlists[currentGenre][currentIndex]);
        updateSongInfo();
    } else {
        console.log("No genre selected");
    }
}

function updateSongInfo() {
    const songPath = playlists[currentGenre][currentIndex];
    const parts = songPath.split("/");
    const songName = parts[parts.length - 1].slice(0, -4);
    const songInfo = document.querySelector('.song-info');
    songInfo.innerHTML = `${songName}`;
}

//genres functions

function bollywood() {
    console.log("entered bollywood");    
    
    currentGenre = 'bollywood';
    currentIndex = 0;
    playAudio(playlists.bollywood[currentIndex]);
    updateSongInfo();

    console.log("exited"); 

    gsap.to(['.turnable','.record'],{
        background : 'url(./images/colored/bollywood.png)'
    })
    gsap.to('.record',{
        animation: 'spin 5s linear infinite'
    })
    updatePlayButtonState()
}

function dhh() {
    console.log("entered dhh");
  
    currentGenre = 'dhh';
    currentIndex = 0;
    playAudio(playlists.dhh[currentIndex]);
    updateSongInfo();
    
    console.log("exited"); 

    gsap.to(['.turnable','.record'],{
        background : 'url(./images/colored/dhh.png)'
    })
    gsap.to('.record',{
        animation: 'spin 5s linear infinite'
    })
    
    updatePlayButtonState()
}

function rock() {
    console.log("entered rock");

    currentGenre = 'rock';
    currentIndex = 0;
    playAudio(playlists.rock[currentIndex]);
    updateSongInfo();

    console.log("exited"); 

    gsap.to(['.turnable','.record'],{
        background : 'url(./images/colored/rock.png)'
    })
    gsap.to('.record',{
        animation: 'spin 5s linear infinite'
    })
    
    updatePlayButtonState()
}

function metal() {
    console.log("entered metal");

    currentGenre = 'metal';
    currentIndex = 0;
    playAudio(playlists.metal[currentIndex]);
    updateSongInfo();

    console.log("exited");

    gsap.to(['.turnable','.record'],{
        background : 'url(./images/colored/metal.png)'
    })
    gsap.to('.record',{
        animation: 'spin 5s linear infinite'
    })

    updatePlayButtonState()
}

function classical() {
    console.log("entered classical");

    currentGenre = 'classical';
    currentIndex = 0;
    playAudio(playlists.classical[currentIndex]);
    updateSongInfo();

    console.log("exited");

    gsap.to(['.turnable','.record'],{
        background : 'url(./images/colored/classical.png)'
    })
    gsap.to('.record',{
        animation: 'spin 5s linear infinite'
    })
    
    updatePlayButtonState()
}

function edm() {
    console.log("entered edm");

    currentGenre = 'edm';
    currentIndex = 0;
    playAudio(playlists.edm[currentIndex]);
    updateSongInfo();

    console.log("exited");

    gsap.to(['.turnable','.record'],{
        background : 'url(./images/colored/edm.png)'
    })
    gsap.to('.record',{
        animation: 'spin 5s linear infinite'
    })
    
    updatePlayButtonState()
}

function punjabi() {
    console.log("entered punjabi");

    currentGenre = 'punjabi';
    currentIndex = 0;
    playAudio(playlists.punjabi[currentIndex]);
    updateSongInfo();

    console.log("exited");

    gsap.to(['.turnable','.record'],{
        background : 'url(./images/colored/punjabi.png)'
    })
    gsap.to('.record',{
        animation: 'spin 5s linear infinite'
    })
    
    updatePlayButtonState()
}

// Play Button Function *have to fix*

function playButton() {
    const arm = document.querySelector('.arm')
    const playBtn = document.querySelector("#playBtn");
    
    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        gsap.to('.record',{
            animation: 'spin 5s linear infinite paused'
        })
        playBtn.textContent = '▶';
        arm.style.transform = 'rotate(-20deg)';
    } else {
        if (!currentAudio) {
            // If no audio is playing, default to Bollywood genre
            bollywood();
        } else {
            currentAudio.play();
            gsap.to('.record',{
                animation: 'spin 5s linear infinite'
            })
            playBtn.textContent = '⏸';
            arm.style.transform = 'rotate(0deg)';
        }
    }
}

function updatePlayButtonState() {
    const playBtn = document.querySelector("#playBtn");
    const arm = document.querySelector('.arm');
    
    if (currentAudio && !currentAudio.paused) {
        playBtn.textContent = '⏸';
        arm.style.transform = 'rotate(0deg)';
        gsap.to('.record', {
            animation: 'spin 5s linear infinite'
        });
    } else {
        playBtn.textContent = '▶';
        arm.style.transform = 'rotate(-20deg)';
        gsap.to('.record', {
            animation: 'spin 5s linear infinite paused'
        });
    }
}



/*--------------------- Handle Mouse Click ---------------------*/
function handleMusicClick(event) {
    const clickedGenre = event.currentTarget.getAttribute('data-genre');
    console.log(clickedGenre);

    currentIndex = (currentIndex + 1) % 5;

    if (currentAudio) {
        currentAudio.pause();
        console.log("audio paused in handleMusicClick");
        currentAudio.currentTime = 0;
    }

    ab();
    setTimeout(() => {
        switch (clickedGenre) {
            case "bollywood":
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
        // Update play button state after new audio is loaded
        updatePlayButtonState();
    }, 1400);
}

/*--------------------- Function to show popup *have to fix* ---------------------*/

function showPopup() {
    console.log("Showing popup");
    gsap.to(".feedback", {
        duration: 0.8,
        opacity: "100%",
        y: 100,
        ease: "power2.out",
    });
}

/*--------------------- Function to play audio ---------------------*/
function playAudio(src) {
    if (currentAudio) {
        currentAudio.pause();
    }
    currentAudio = new Audio(src);
    currentAudio.play();
    currentAudio.addEventListener('ended', nextSong);
    updatePlayButtonState();
}

// Function to show Spotify player *have to fix* 
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

/*--------------------- bc() is for scroll bottom ---------------------*/
function bc() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

/*--------------------- ab() is for bottom page visible gsap & calling bc() ---------------------*/
function ab() {
    gsap.to(".page2", {
        opacity: 1,
        display: "flex",
        duration: 2,
        delay: 0.5
    });

    setTimeout(() => {
        bc();
    }, 1000)
}

/*--------------------- Event listener for keydown events ---------------------*/

document.addEventListener("keydown", (event) => {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentIndex = (currentIndex + 1) % 5;

    switch (event.key) {
        case "z":
            ab();

            setTimeout(() => {
                bollywood();
            }, 2000)
            break;
        case "x":
            ab();
        
            setTimeout(() => {
                dhh();
            }, 2000)
            break;
        case "c":
            ab();
            
            setTimeout(() => {
                rock();
            }, 2000)
            break;
        case "v":
            ab();
            s
            setTimeout(() => {
                metal();
            }, 2000)
            break;
        case "b":
            ab();
        
            setTimeout(() => {
                edm();
            }, 2000)
            break;
        case "n":
            ab();
            sup
            setTimeout(() => {
                punjabi();
            }, 2000)
            break;
        case "m":
            ab();
            supBr
            setTimeout(() => {
                classical();
            }, 2000)
            break;
        case "0":
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
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