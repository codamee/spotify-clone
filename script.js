import { spotifyLibrary } from "./songs.js"
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
    Array.from(songsList).forEach((song) => {
        song.addEventListener("click", (e) => {
            const clicked = (e.currentTarget.querySelector("div p").innerHTML);
            const findSong = spotifyLibrary.find(song => song.title === clicked)
            console.log(findSong);
            playMusic(findSong.url)
        })
    })
    play.addEventListener("click", (e) => {

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
            playMusic(spotifyLibrary[currentSong - 1].url)
            console.log(spotifyLibrary[currentSong - 1]);
        }
        else if (e.target.id === "next") {
            const currentSong = spotifyLibrary.findIndex(song => song.url === currentSrc.src)
            playMusic(spotifyLibrary[currentSong + 1].url)
            console.log(spotifyLibrary[currentSong + 1]);
        }


    })
}
controls()
