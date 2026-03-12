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