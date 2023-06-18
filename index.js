
let songsongIndex = 0;
let audioElement = new Audio('./Songs/0.mp3');
let playbutton = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let giphy = document.getElementById('Giphy');
let CurrentPlayingSong = document.getElementById('currentPlayingSong')
let songList = Array.from(document.getElementsByClassName('song'));

let songs = [
    { songName: "295", filePath: "./Songs/0.mp3", coverPath: "./images/295-Poster.png", time: "4:32" },
    { songName: "Celebrity Killer", filePath: "./Songs/1.mp3", coverPath: "./images/celbrity killer - poster.jpg", time: "3:32" },
    { songName: "Jatt Da Muqabla", filePath: "./Songs/2.mp3", coverPath: "./images/jatt da muqabla - poster.jpg", time: "3:22" },
    { songName: "Just Listen", filePath: "./Songs/3.mp3", coverPath: "./images/just listen - poster.jpg", time: "4:32" },
    { songName: "Never Fold", filePath: "./Songs/4.mp3", coverPath: "./images/never fold - poster.jpg", time: "3:03" },
    { songName: "Signed To God", filePath: "./Songs/5.mp3", coverPath: "./images/signed to God - poster.jpg", time: "2:31" },
    { songName: "SYL", filePath: "./Songs/6.mp3", coverPath: "./images/syl - poster.jpg", time: "4:09" },
]


songList.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('song-Name')[0].innerHTML = songs[i].songName;
    element.getElementsByClassName('song-Time')[0].innerHTML = songs[i].time;
})



// Listen to Evenets 
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    // updating seekbarr
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})


// progrss bar se song change krne ki jss

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

var playPause = Array.from(document.getElementsByClassName('play'));

const makePlayAll = () => {
    Array.from(document.getElementsByClassName('play')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        audioElement.pause();
    })
}

let songIndex;

Array.from(document.getElementsByClassName('play')).forEach((element) => {
    element.addEventListener('click', (e) => {
            makePlayAll();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            playbutton.classList.remove('fa-play-circle');
            playbutton.classList.add('fa-pause-circle');
            songIndex = parseInt(e.target.id);
            CurrentPlayingSong.innerHTML = songs[songIndex].songName;
            CurrentPlayingSong.style.opacity = 1;
            audioElement.src = `Songs/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            giphy.style.opacity = 1;
    })
})


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 6) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `Songs/${songIndex}.mp3`;
    CurrentPlayingSong.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    playbutton.classList.remove('fa-play-circle');
    playbutton.classList.add('fa-pause-circle');

})


document.getElementById('prev').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 6
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `Songs/${songIndex}.mp3`;
    CurrentPlayingSong.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    playbutton.classList.remove('fa-play-circle');
    playbutton.classList.add('fa-pause-circle');

})


playbutton.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        playbutton.classList.remove('fa-play-circle');
        playbutton.classList.add('fa-pause-circle');
        giphy.style.opacity = 1;
        CurrentPlayingSong.innerHTML = songs[songIndex].songName;
        CurrentPlayingSong.style.opacity = 1;

    }
    else {
        audioElement.pause();
        playbutton.classList.remove('fa-pause-circle');
        playbutton.classList.add('fa-play-circle');
        giphy.style.opacity = 0;
        CurrentPlayingSong.innerHTML = "";
    }
})