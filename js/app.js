//Lets select all required tags or elements

let allMusic = [{
        name: "Faded",
        artist: "Alan Walker",
        img: "music-1",
        src: "music-1",
    },
    {
        name: "Selfish Love",
        artist: "Selena Gomez",
        img: "music-2",
        src: "music-2",
    },
    {
        name: "Shape of you",
        artist: "ED-Sheeran",
        img: "music-3",
        src: "music-3",
    },
    {
        name: "On my way",
        artist: "sabarina carpenter",
        img: "music-4",
        src: "music-4",
    },
    {
        name: "Waka Waka",
        artist: "Shakira",
        img: "music-5",
        src: "music-5",
    },
    {
        name: "Jab koi baat",
        artist: "Atif Aslam",
        img: "music-6",
        src: "music-6",
    },
];

const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist");
mainAudio = wrapper.querySelector("#main-audio");
playPauseBtn = wrapper.querySelector(".play-pause");
prevBtn = wrapper.querySelector("#prev");
nextBtn = wrapper.querySelector("#next");
progressArea = wrapper.querySelector(".progress-area");
progressBar = wrapper.querySelector(".progress-bar");
musicList = wrapper.querySelector(".music-list");
showMoreBtn = wrapper.querySelector("#more-music");
hideMusicBtn = wrapper.querySelector("#close");

let musicIndex = Math.floor((Math.random()* allMusic.length) + 1)

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingNow()
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `audio/${allMusic[indexNumb - 1].src}.mp3`;
}

//next music function
function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
    playingNow()
}

//prev music function
function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? (musicIndex = 6) : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
    playingNow()
}

//Play Music Function
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

//Pause music function
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
});

//next music btn event
nextBtn.addEventListener("click", () => {
    nextMusic();
});

// prev music btn event
prevBtn.addEventListener("click", () => {
    prevMusic();
});

//Update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; //getting current time of song
    const duration = e.target.duration; //getting total duration of song
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current");
    let musicDuration = wrapper.querySelector(".duration");
    mainAudio.addEventListener("loadeddata", () => {
        // update song total duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSeconds = Math.floor(audioDuration % 60);

        if (totalSeconds < 10) {
            totalSeconds = `0${totalSeconds}`;
        }
        musicDuration.innerText = `${totalMin}.${totalSeconds}`;
    });
    //Its about starting time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);

    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}.${currentSec}`;
});

// lets update playing song current time according to the progress bar width
progressArea.addEventListener("click", (e) => {
    let progressWidthval = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
    playingNow()
});

//  Work on repeat , shuffle song according to their icon
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    // first we get innertext of the icon then we'll change accordingly.
    let getText = repeatBtn.innerText;

    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song Looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});

mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;

    switch (getText) {
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor(math.random() * allMusic.length + 1);
            do {
                randIndex = Math.floor(math.random() * allMusic.length + 1);
            } while (musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingNow()
            break;
    }
});

showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

const ulTag = wrapper.querySelector("ul");
// let create li tags according to array length for list
for (let i = 0; i < allMusic.length; i++) {
    //let's pass the song name, artist from the array
    let liTag = `<li li-index="${i+1}">
                <div class="row">
                <span>${allMusic[i].name}</span>
                <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="audio/${
    allMusic[i].src
}.mp3"></audio>
            </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`)
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`)

    liAudioTag.addEventListener("loadeddata",()=>{
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSeconds = Math.floor(audioDuration % 60);

        if (totalSeconds < 10) {
            totalSeconds = `0${totalSeconds}`;
        }
        liAudioDuration.innerText = `${totalMin}.${totalSeconds}`;
        liAudioDuration.setAttribute('t-duration',`${totalMin}.${totalSeconds}`)})
}

const allLiTag = ulTag.querySelectorAll("li")
function playingNow(){
    for(let j = 0; j<allLiTag.length; j++){
        let audioTag = allLiTag[j].querySelector('.audio-duration')

        if(allLiTag[j].classList.contains("playing")){
            allLiTag[j].classList.remove("playing")
            let adDuration = audioTag.getAttribute("t-duration")
            audioTag.innerText = adDuration
        }

        if(allLiTag[j].getAttribute("li-index") ==musicIndex){
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing"
        }
        allLiTag[j].setAttribute("onclick","clicked(this)")
    }
    
}

function clicked(element){
    let getLiIndex = element.getAttribute("li-index")
    musicIndex = getLiIndex
    loadMusic(musicIndex)
    playMusic()
    playingNow()
}