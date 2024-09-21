// Initialize Swiper.js
let vaibhav = "bollywood"

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
                vaibhav = genre;
                console.log("vaibhav",vaibhav);
                try {
                    genre_name(vaibhav);
                } catch (error) {
                    console.error("Error in genre_name function:", error);
                }

                background_changer(vaibhav);
                
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
    bollywood: ["sounds/bollywood/Badtameez Dil - Pritam, Benny Dayal.mp3","sounds/bollywood/Chaleya - Arijit Singh.mp3","sounds/bollywood/Mitwa - Shankar-Ehsaan-Loy.mp3","sounds/bollywood/Senorita - Farhan, Hrithik, Abhay.mp3","sounds/bollywood/Tera Hone Laga Hoon - Atif Aslam.mp3"],
    dhh: ["sounds/dhh/Baazigar - Divine.mp3","sounds/dhh/Cute Vol.1 - Raftaar.mp3","sounds/dhh/Joota Japani - KRSNA.mp3","sounds/dhh/Namastute - Seedhe Maut.mp3", "sounds/dhh/Trap Praa - Raaftaar, Prabh.mp3"],
    rock: ["sounds/rock/Sadda Haq - Mohit Chauhan.mp3","sounds/rock/Enter Sandman - Metallica.mp3", "sounds/rock/Stairway to Heaven - Led Zeppelin.mp3","sounds/rock/Sweet Child o mine - Guns n Roses.mp3","sounds/rock/What I've Done - Linkin Park.mp3"],
    metal: ["sounds/metal/Bleed - Meshuggah.mp3", "sounds/metal/Gaddar - Bloodywood.mp3", "sounds/metal/Psychosocial - Slipknot.mp3", "sounds/metal/Silvera - Gojira.mp3", "sounds/metal/Walk with me in hell - Lamb Of God.mp3"],
    classical: ["sounds/classical/Moonlight Sonata Third movt. - Beethoven.mp3","sounds/classical/Nocturne Op. 9 No. 2 - Chopin.mp3","sounds/classical/Summer - Vivaldi.mp3","sounds/classical/Symphony No. 5 in C minor - Beethoven.mp3","sounds/classical/Violin Concerto in E major - Bach.mp3"],
    edm: ["sounds/edm/Alone - Marshmello.mp3","sounds/edm/Animals - Martin Garrix.mp3","sounds/edm/Levels - Avicii.mp3","sounds/edm/The Nights - Avicii.mp3","sounds/edm/The Spectre - Alan Walker.mp3"],
    punjabi: ["sounds/punjabi/Desi Kalakaar - Honey Singh.mp3","sounds/punjabi/Lahore - Guru Randhawa.mp3","sounds/punjabi/Naah - Harrdy Sandhu.mp3","sounds/punjabi/Naina - Diljit Dosanjh, Badshah.mp3","sounds/punjabi/No love - Shubh.mp3"]
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

function feedbackAppear() {
    gsap.to('.feedback',{
        display : "block",
        y: -30,
        duration: 0.8,
        opacity: 1
    })
}

function feedbackPlaylist(heading, inf, feedback, playlist){
    document.querySelector('.heading').innerHTML = heading;
    document.querySelector('.info').innerHTML = inf;
    document.querySelector('.feedbacktext').innerHTML = feedback;
    let p = document.querySelector('.playlist_spotify')
    p.setAttribute("src", playlist);
}

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


function genre_name(vaibhav) {
    console.log(vaibhav);
    console.log("njenk");
    let f = vaibhav.toLowerCase();

    document.querySelector('.genre_name').innerHTML = f;
}

function background_changer(genre) {
    switch (genre) {
        case "bollywood":
            gsap.to(('.page1'),{
                background: 'linear-gradient(to bottom, rgba(54,58,172,1) 0%, rgba(53,187,189,1) 35%, rgba(112,221,139,1) 76%, rgba(168,204,177,1) 100%)'
            })
            gsap.to(('.page2'),{
                background: 'linear-gradient(to top, rgba(54,58,172,1) 0%, rgba(53,187,189,1) 35%, rgba(112,221,139,1) 76%, rgba(168,204,177,1) 100%)'
            })
            break;            
        case "DHH":
            gsap.to(('.page1'),{
                background: 'linear-gradient(to bottom, rgba(49,46,22,1) 0%, rgba(54,64,33,1) 0%, rgba(167,143,69,1) 60%, rgba(201,185,134,1) 100%)'
            })
            gsap.to(('.page2'),{
                background: 'linear-gradient(to top, rgba(49,46,22,1) 0%, rgba(54,64,33,1) 0%, rgba(167,143,69,1) 60%, rgba(201,185,134,1) 100%)'
            })
            break;
        case "Rock":
            gsap.to(('.page1'),{
                // background: 'url(rock.png) no-repeat center center / cover'
                background: 'linear-gradient(to bottom, rgba(57,4,6,1) 0%, rgba(237,27,36,1) 69%, rgba(213,113,117,1) 100%)'
            })
            gsap.to(('.page2'),{
                // background: 'url(rock.png) no-repeat center center / cover'
                background: 'linear-gradient(to top, rgba(57,4,6,1) 0%, rgba(237,27,36,1) 69%, rgba(213,113,117,1) 100%)'
            })
            break;
        case "Metal":
            gsap.to(('.page1'),{
                background: 'linear-gradient(to bottom, rgba(0,10,46,1) 37%, rgba(215,193,155,1) 73%, rgba(205,194,175,1) 100%)'
            })
            gsap.to(('.page2'),{
                background: 'linear-gradient(to top, rgba(0,10,46,1) 37%, rgba(215,193,155,1) 73%, rgba(205,194,175,1) 100%)'
            })
            break;
        case "EDM":
            gsap.to(('.page1'),{
                background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(89,45,136,1) 27%, rgba(161,98,180,1) 52%, rgba(202,128,175,1) 100%)'
            })
            gsap.to(('.page2'),{
                background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(89,45,136,1) 27%, rgba(161,98,180,1) 52%, rgba(202,128,175,1) 100%)'
            })
            break;
        case "Classical":
            gsap.to('.page1', {
                background: 'linear-gradient(to bottom, rgba(99,41,4,1) 0%, rgba(204,144,93,1) 63%, rgba(255,213,173,1) 100%)'
            });
            gsap.to('.page2', {
                background: 'linear-gradient(to top, rgba(99,41,4,1) 0%, rgba(204,144,93,1) 63%, rgba(255,213,173,1) 100%)'
            });
            
            break;
        case "Punjabi":
            gsap.to(('.page1'),{
                background: 'linear-gradient(to bottom, rgba(246,75,128,1) 0%, rgba(255,207,32,1) 53%, rgba(238,224,172,1) 100%)'
            })
            gsap.to(('.page2'),{
                background: 'linear-gradient(to top, rgba(246,75,128,1) 0%, rgba(255,207,32,1) 53%, rgba(238,224,172,1) 100%)'
            })
            break;
        default:
            console.log("Invalid genre");
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
        gsap.to((".spotify-player-container"),{
            duration: 0.5,
            opacity: 0,
            y: -500,
            ease: "power2.out",
            display: "none"
        })
        gsap.to((".feedback"),{
            display: "none",
            duration: 0.7
        })
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
        }
            switch (clickedGenre) {
                case "bollywood":
                    feedbackPlaylist("Bollywood", "Bollywood music is a genre that blends traditional Indian music with contemporary pop and electronic sounds. It features upbeat rhythms, catchy melodies, and emotionally charged lyrics that often explore themes of love, heartbreak, and self-discovery. This genre is characterized by the use of electronic instruments, such as synthesizers and drum machines, and is often accompanied by colorful music videos that showcase elaborate dance routines. The singers who dominate this genre have powerful, emotive voices.", "wanna listen more", "https://open.spotify.com/embed/playlist/2HibxdzVLGDPR5GIrm4cza?utm_source=generator&theme=0")
                    bollywood();
                    
                    setTimeout(()=>{
                        feedbackAppear();
                    },6000);
                    break;
                case "DHH":
                    feedbackPlaylist("Desi Hip Hop", "Desi hip hop is a genre of music that blends traditional Indian music with modern hip hop beats and lyrics. It often includes elements of Punjabi music and language, and is known for its energetic and upbeat sound. The genre has gained popularity in recent years, with many artists incorporating their own unique styles and cultural influences into their music.", "wanna listen more", "https://open.spotify.com/embed/playlist/7hCUgCmtC02mQe4lUg5ZSs?utm_source=generator&theme=0")
                    dhh();
                    
                    setTimeout(()=>{
                        feedbackAppear();
                    },6000);
                    break;
                case "Rock":
                    feedbackPlaylist("Rock", "Rock music is a genre characterized by its heavy use of electric guitars, drums, and bass. It often features powerful vocals and lyrics that touch on themes of rebellion, love, and angst; songs in this genre vary from being relaxed and laid back to more aggressive types. This genre has evolved over time, with sub-genres such as alternative rock, indie rock, and classic rock. Some of the defining characteristics of rock music include its high energy, catchy melodies, and memorable hooks. It has been a popular genre for decades.", "wanna listen more", "https://open.spotify.com/embed/playlist/7dowgSWOmvdpwNkGFMUs6e?utm_source=generator&theme=0")
                    rock();
                    
                    setTimeout(()=>{
                        feedbackAppear();
                    },6000);
                    break;
                case "Metal":
                    feedbackPlaylist("Metal", "Metal music is a genre that is characterized by its heavy and aggressive sound, often featuring distorted guitars, fast-paced drumming, and powerful vocals. It has roots in rock and roll, but has evolved over the years to include a wide range of sub-genres, including thrash, heavy, and power metal. Metal music often deals with themes of rebellion, anger, and darkness, and is known for its intense live performances.", "wanna listen more", "https://open.spotify.com/embed/playlist/3pBfUFu8MkyiCYyZe849Ks?utm_source=generator&theme=0")
                    metal();
                    
                    setTimeout(()=>{
                        feedbackAppear();
                    },6000);
                    break;
                case "EDM":
                    feedbackPlaylist("EDM", "EDM is a genre of electronic dance music that is characterized by its upbeat tempo, heavy basslines, prominent use of synthesizers and catchy melodies. It incorporates elements of various sub-genres such as house, techno, and trance. The music is often played at festivals and clubs, and is known for its high-energy and crowd-pleasing nature. It has gained mainstream popularity in recent years, with many artists achieving commercial success.", "wanna listen more", "https://open.spotify.com/embed/playlist/3pDxuMpz94eDs7WFqudTbZ?utm_source=generator&theme=0")
                    edm();
                    
                    setTimeout(()=>{
                        feedbackAppear();
                    },6000);
                    break;
                case "Classical":
                    feedbackPlaylist("Classical", "Classical music is a genre that emerged in the 18th century and is characterized by its formal structure, use of orchestral instruments, and emphasis on melody and harmony. It is often associated with the works of composers such as Bach, Mozart, and Chopin, who are known for their intricate compositions, technical skill, and emotional depth. Classical music has endured through the centuries and continues to be celebrated for its beauty and complexity.", "wanna listen more", "https://open.spotify.com/embed/playlist/3HYK6ri0GkvRcM6GkKh0hJ?utm_source=generator&theme=0")
                    classical();
                    
                    setTimeout(()=>{
                        feedbackAppear();
                    },6000);
                    break;
                case "Punjabi":
                    feedbackPlaylist("Punjabi", "Punjabi music is a genre that blends traditional Punjabi folk music with contemporary pop and hip-hop elements. It is characterized by upbeat rhythms, catchy melodies, and lyrics that often touch on themes of love, partying, gang activities and the like. The genre has gained popularity in recent years, particularly among youth from all over India, also being incorporated into Bollywood movies, and has produced several successful artists who have achieved mainstream success both in India and abroad.", "wanna listen more?", "https://open.spotify.com/embed/playlist/0a8gfAB5pIeR5x2ln5ARq0?utm_source=generator&theme=0")
                    punjabi();
                    
                    setTimeout(()=>{
                        feedbackAppear();
                    },6000);
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

function no() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
    }
    
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
    gsap.to(".feedback", {
        opacity: 0,
        duration: 1,
        display: none,
        y: 500
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
            gsap.to(".feedback", {
                opacity: 0,
                display: none,
                y: 500
            });


            break;
        default:
            console.log("Invalid key");
    }
});