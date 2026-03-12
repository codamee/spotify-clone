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
    const songsList = document.querySelectorAll(".sidebar-song")
    Array.from(songsList).forEach((song) => {
        song.addEventListener("click", (e) => {
            const clicked = (e.currentTarget.querySelector("div p").innerHTML);
            const findSong = spotifyLibrary.find(song => song.title === clicked)
            console.log(findSong);
            playMusic(findSong.url)
        })
    })
}
playSongs()
function playMusic(url) {
    currentSrc.src = url
    currentSrc.play()
}