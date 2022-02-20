import * as songsList from "./songs.js";

// Get the songs arr from the songs file.
const songs = songsList.songs;

// Grab the elements
const songContainer = document.querySelector(".songContainer");
const songCards = document.querySelectorAll(".songCards");
const songItemPlay = document.querySelectorAll(".songItemPlay");

const playPauseBtn = document.getElementById("playpauseBtn");
const backwardBtn = document.getElementById("backwardBtn");
const forwardBtn = document.getElementById("forwardBtn");

const songInfo = document.querySelector(".songInfo");
const songInfoCover = document.querySelector(".songInfoCover");
const songName = document.querySelector(".songName");

const myProgressBar = document.getElementById("myProgressBar");

const searchElement = document.querySelector(".searchElement");

// Define important variable
let songIndex = 0;
let musicPlay = false;
let songElement = new Audio(songs[songIndex].filePath);

// Manupulate the DOM
Array.from(songContainer.children).forEach((element, index) => {
  element.children[0].style.backgroundImage = `url(${songs[index].coverPath})`;
  element.children[1].innerText = songs[index].songName;
});

// Define some functions
const musicControll = () => {
  songElement.addEventListener("timeupdate", () => {
    // console.log("Time Updating", songElement.currentTime);

    // Changing the progressBar with song time
    let progress = parseInt(
      (songElement.currentTime / songElement.duration) * 100
    );
    myProgressBar.value = progress;
  });

  // Changing the song with progressBar controll
  myProgressBar.addEventListener("change", () => {
    songElement.currentTime =
      (songElement.duration * myProgressBar.value) / 100;
  });
};
const playSong = () => {
  songElement.play();
  playPauseBtn.classList.remove("fa-play-circle");
  playPauseBtn.classList.add("fa-pause-circle");

  songInfoCover.children[0].src = songs[songIndex].coverPath;
  songName.innerText = songs[songIndex].songName;
  songInfo.classList.remove("hide");

  musicControll();
};

const pauseSong = () => {
  songElement.pause();
  playPauseBtn.classList.add("fa-play-circle");
  playPauseBtn.classList.remove("fa-pause-circle");
};

const nextSong = () => {
  pauseSong();
  if (songIndex !== songs.length - 1) {
    songIndex += 1;
  } else {
    songIndex = 0;
  }
  songElement = new Audio(songs[songIndex].filePath);
  console.log(songElement);
  playSong();
};

const previousSong = () => {
  pauseSong();
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex -= 1;
  }
  songElement = new Audio(songs[songIndex].filePath);
  console.log(songElement);
  playSong();
};

// Play or pause the songs by song controller section
playPauseBtn.addEventListener("click", () => {
  if (!musicPlay) {
    playSong();
    musicPlay = true;
  } else {
    pauseSong();
    musicPlay = false;
  }
});

// Music forward and backward functionalities
forwardBtn.addEventListener("click", nextSong);
backwardBtn.addEventListener("click", previousSong);

// Individually play the songs
songItemPlay.forEach((element, index) => {
  element.addEventListener("click", () => {
    pauseSong();
    // console.log(index);
    songIndex = index;
    songElement = new Audio(songs[songIndex].filePath);
    playSong();
  });
});

// Searcing functionality
searchElement.addEventListener("change", () => {
  let searchVal = String(searchElement.value).toLowerCase();
  songCards.forEach((element) => {
    element.classList.remove("hide");
    let matchingKeyWord = String(element.children[1].innerText)
      .toLowerCase()
      .slice(0, 3);
    if (searchVal == "") {
      element.classList.remove("hide");
    } else if (matchingKeyWord != searchVal) {
      element.classList.add("hide");
    }
  });
});
