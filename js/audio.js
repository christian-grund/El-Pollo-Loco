let mute = false;

let audioData = [
  new Audio('audio/del-rio-bravo.mp3'),
  new Audio('audio/game_lost.mp3'),
  new Audio('audio/coin_collect.mp3'),
  new Audio('audio/bottle_collect.mp3'),
  new Audio('audio/bottles_refilled.mp3'),
  new Audio('audio/running.mp3'),
  new Audio('audio/jump.mp3'),
  new Audio('audio/hurt.mp3'),
  new Audio('audio/snoring.mp3'),
  new Audio('audio/throwing.mp3'),
  new Audio('audio/bottle_splash.mp3'),
  new Audio('audio/chicken.mp3'),
  new Audio('audio/chick.mp3'),
  new Audio('audio/endboss_attak.mp3'),
  new Audio('audio/endboss_hurt.mp3'),
  new Audio('audio/endboss_defeated.mp3'),
  new Audio('audio/game_won.mp3'),
];

// bottle;

function toggleMuteButton() {
  mute = !mute;
  console.log('mute:', mute);
  let soundButton = document.getElementById('mute-button');

  if (mute) {
    soundButton.style.backgroundImage = 'url("img/10_other/sound_off.svg")';
    muteSound();
  } else {
    soundButton.style.backgroundImage = 'url("img/10_other/sound_on.svg")';
    unmuteSound();
  }
}

function muteSound() {
  audioData.forEach((audio) => {
    audio.muted = true;
    audio.pause();
  });
  mute = false;
}

function unmuteSound() {
  audioData.forEach((audio) => {
    audio.muted = false;
    audio.play();
  });
  mute = true;
}
