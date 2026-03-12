import { spotifyLibrary } from "./songs.js"
function printSongList() {
    let songsList = document.querySelector(".songs-list")
    spotifyLibrary.forEach((song) => {
        const divElem = document.createElement("div")
        divElem.classList.add("sidebar-song")
        divElem.innerHTML = `
        <img src=${song.cover} width="30">
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

const currentSrc = new Audio()
function playSongs() {
    const songList = document.querySelector(".sidebar-song")
    spotifyLibrary.forEach((song) => {
        songList.addEventListener("click", (e) => {
            console.log(e.target);
        })
    })
}
playSongs()
function playMusic(url) {
    currentSrc.src=url
    currentSrc.play()
}