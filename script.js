import { spotifyLibrary } from "./songs.js"
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${minutes}:${paddedSeconds}`;
}


function printSongList() {
    let songsList = document.querySelector(".songs-list")
    spotifyLibrary.forEach((song) => {
        const divElem = document.createElement("div")
        divElem.classList.add("sidebar-song")
        divElem.innerHTML = `
        <img src=${song.cover} width="30" alt="${song.title}">
        <div>
            <p>${song.title}</p>
            <div class="play-btn">${song.artist}</div>
        </div>
        <img src="assets/play.svg" alt="pause" width="20">
        `
        songsList.append(divElem)

    })
    spotifyLibrary.forEach((song) => {
        const cards = document.querySelector(".cards")
        let divElem = document.createElement("div")
        divElem.classList.add("card")
        divElem.innerHTML = `
        
                <img src=${song.cover} alt="banner">
                <div class="song-info">${song.title}</div>
                <div class="song-name">${song.artist}</div>
                <div class="play-btn">▶</div>
        
        `
        cards.append(divElem)
    })

}
printSongList()

const currentSrc = new Audio(spotifyLibrary[0].url)
function playMusic(url) {
    currentSrc.src = url
    currentSrc.play()
    play.src = "./assets/pause.svg"
    const currentSong = spotifyLibrary.find(song => song.url === currentSrc.src)
    document.querySelector(".controls .name").textContent = `${currentSong.title} - ${currentSong.artist}`
}

function playSongs() {
    const songsList = document.querySelectorAll(".sidebar-song")
    const mainList = document.querySelectorAll(".card")
    Array.from(songsList).forEach((song) => {
        song.addEventListener("click", (e) => {
            const clicked = (e.currentTarget.querySelector("div p").innerHTML);
            const findSong = spotifyLibrary.find(song => song.title === clicked)
            playMusic(findSong.url)
        })
    })
    Array.from(mainList).forEach((list) => {
        list.addEventListener("click", (e) => {
            const clicked = (e.currentTarget.querySelector(".song-info").textContent);
            const findSong = spotifyLibrary.find(song => song.title === clicked)
            playMusic(findSong.url)

        })
    })

}
playSongs()
function controls() {
    const controlBtns = document.querySelector(".control-btns")
    controlBtns.addEventListener("click", (e) => {
        if (e.target.id === "play") {
            if (currentSrc.paused) {
                currentSrc.play()
                play.src = "./assets/pause.svg"
            }
            else {
                currentSrc.pause()
                play.src = "./assets/play.svg"
            }
        }
        else if (e.target.id === "previous") {
            const currentSong = spotifyLibrary.findIndex(song => song.url === currentSrc.src)
            if (currentSong + 1 >= 0) {

                playMusic(spotifyLibrary[currentSong - 1].url)
            }
        }
        else if (e.target.id === "next") {
            const currentSong = spotifyLibrary.findIndex(song => song.url === currentSrc.src)

            playMusic(spotifyLibrary[currentSong + 1].url)
        }
    })
    currentSrc.addEventListener("timeupdate", (e) => {
        const currentTime = formatTime(currentSrc.currentTime || "00");
        const duration = formatTime(currentSrc.duration || "00");
        document.querySelector(".time").textContent = `${currentTime}/${duration}`;
        document.querySelector(".circle").style.left = ((currentSrc.currentTime / currentSrc.duration) * 100) + "%";
    })

    document.querySelector(".scroll").addEventListener("click", (e) => {
        const percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        currentSrc.currentTime = (currentSrc.duration * percent) / 100
    })

    document.querySelector("#volume").addEventListener("input", (e) => {
        currentSrc.volume = e.target.value / 100
        const muteIcon = document.querySelector("#no-volume");
        if (currentSrc.volume === 0) {
            muteIcon.src = "./assets/mute.svg";
        } else {
            muteIcon.src = "./assets/no-volume.svg";
        }
    })

    document.querySelector(".sound").addEventListener("click", (e) => {
        if (e.target.id == "no-volume") {
            currentSrc.volume = currentSrc.volume == 0 ? 0.5 : 0
            volume.value = currentSrc.volume !== 0 ? 50 : 0
            e.target.src = currentSrc.volume == 0 ? "./assets/mute.svg" : "./assets/no-volume.svg"
        }
        else if (e.target.id == "full-volume") {
            currentSrc.volume = 1
            volume.value = 100
            const muteIcon = document.querySelector("#no-volume");
            muteIcon.src = "./assets/no-volume.svg"
        }
    })

}
controls()
