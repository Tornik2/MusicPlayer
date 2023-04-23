import data from "./data.js"

const imgCointainerEl = document.querySelector('.img-container')
const music = document.querySelector('audio')
const play = document.querySelector('.fa-play')
const next = document.querySelector('.fa-forward')
const prev = document.querySelector('.fa-backward')
const progressBar = document.querySelector('.progress')
const progress = document.querySelector('.time-passed-bar')
const timePassed = document.querySelector('.time-now')
const totalTime = document.querySelector('.total-time')

let isPlaying = false
let index = 0

play.addEventListener('click', playPause)
next.addEventListener('click', playNext)
prev.addEventListener('click', playPrev)
music.addEventListener('timeupdate', updateProgressBar)
progressBar.addEventListener('click', changeMusicTime)

function playPause() {
    if (!isPlaying) {
        music.play()
        play.classList.replace('fa-play', 'fa-pause')
        isPlaying = true
    } else {
        music.pause()
        play.classList.replace('fa-pause', 'fa-play')
        isPlaying = false
    }
}

function playNext() {
    isPlaying = true
    index++ 
    if (index > data.length - 1) {
        index = 0
    }
    render()
    music.play()
}
function playPrev() {
    isPlaying = true
    index--
    if (index < 0) {
        index = data.length - 1
    }
    render()
    music.play()
}

function render() {
    imgCointainerEl.style.backgroundImage = `url(img/${data[index].name}.jpg)`
    music.src = `/music/${data[index].name}.mp3`
}

function updateProgressBar(e) {
    const {currentTime, duration} = e.target
    let totalMinutes = (duration/60).toFixed()
    let totalSeconds = (duration % 60).toFixed()
    let currentMinutes = Math.floor(currentTime/60)
    let currentSeconds = Math.floor(currentTime % 60)
    
    if(isPlaying) {        
        let progressPercentage = (currentTime/duration) * 100
    
        if (totalSeconds < 10) {
            totalSeconds = `0${totalSeconds}`
        } 
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        if (totalSeconds !== 'NaN'){
            totalTime.textContent = `0${totalMinutes}:${totalSeconds}`
        }
        progress.style.width = `${progressPercentage}%`
        timePassed.textContent = `0${currentMinutes}:${currentSeconds}`        
    }

    if(currentTime/duration > 0.999) {
        playNext()
    }
}

function changeMusicTime(e) {
    // 1 percent of total music duration
    let point1 = music.duration/100  
    // measurement of percent of the clicked point
    let point2 = (e.offsetX / e.target.clientWidth) * 100
    // jump currenttime to that point 
    music.currentTime = point1 * point2
}

render()
