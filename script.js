let currentSongIndex = 0;
const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("playPauseButton");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressContainer");
const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");

const songs = [
    {
        title: "Kusapiling",
        artist: "Anthony Meneses",
        src: "kusapiling.mp3",
        img: "kusapiling.jpg"
    },
    {
        title: "Oh, Giliw",
        artist: "Adie",
        src: "giliw.mp3",
        img: "oh,giliw.png"
    },
    {
        title: "Uhaw",
        artist: "Dilaw",
        src: "uhaw.mp3",
        img: "uhaw.jpg"
    },
    {
        title: "Dalangin",
        artist: "Earl Agustin",
        src: "dalangin.mp3",
        img: "dalangin.jpg"
    },
    {
        title: "Miss Miss",
        artist: "Rob Deniel",
        src: "miss.mp3",
        img: "miss.png"
    },
    {
        title: "Baliw",
        artist: "Sud",
        src: "baliw.mp3",
        img: "baliw.png"
    },      
    {
        title: "Happiness",
        artist: "Rex Orange County",
        src: "happiness.mp3",
        img: "happiness.jpg"
    }
];

function startMusic() {
    coverPage.classList.add("hidden");
    loadSong(0), true;
}

function loadSong(index) {
    let song = songs[index];
    audio.src = song.src;
    document.getElementById("songTitle").innerText = song.title;
    document.getElementById("artistName").innerText = song.artist;
    document.getElementById("coverImage").src = song.img;
    audio.currentTime = 0;
    updateTimeDisplay();
    audio.play();
    playPauseButton.innerHTML = "&#x23F8;"; // Pause icon
}

// Automatically play the next song when the current one ends
audio.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Loop back if last song
    loadSong(currentSongIndex);
});

// Play/Pause button toggle
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = "&#x23F8;"; // Pause icon
    } else {
        audio.pause();
        playPauseButton.innerHTML = "&#x23F5;"; // Play icon
    }
}

// Next song function
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

// Previous song function
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

// Update progress bar as song plays
audio.addEventListener("timeupdate", updateProgress);

function updateProgress() {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percentage}%`;
    updateTimeDisplay();
}

// Display start time and end time
function updateTimeDisplay() {
    startTime.innerText = formatTime(audio.currentTime);
    endTime.innerText = formatTime(audio.duration);
}

// Convert time to MM:SS format
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Seek when clicking on progress bar
progressContainer.addEventListener("click", (event) => {
    const width = progressContainer.clientWidth;
    const clickX = event.offsetX;
    const newTime = (clickX / width) * audio.duration;
    audio.currentTime = newTime;
    updateProgress();
});

// Drag progress bar to change time
let isDragging = false;

progressContainer.addEventListener("mousedown", () => {
    isDragging = true;
});

progressContainer.addEventListener("mousemove", (event) => {
    if (isDragging) {
        const width = progressContainer.clientWidth;
        const clickX = event.offsetX;
        const newTime = (clickX / width) * audio.duration;
        audio.currentTime = newTime;
        updateProgress();
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});
