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
  new Audio('audio/endboss_attak.mp3'),
  new Audio('audio/endboss_fight.mp3'),
  new Audio('audio/backgroundsong.mp3'),
];

function toggleMuteButton() {
  let soundButton = document.getElementById('mute-button');

  if (!mute) {
    soundButton.style.backgroundImage = 'url("img/10_other/sound_off.svg")';
    muteSound();
  } else {
    soundButton.style.backgroundImage = 'url("img/10_other/sound_on.svg")';
    unmuteSound();
  }

  soundButton.blur();
}

function muteSound() {
  audioData.forEach((audio) => {
    audio.muted = true;
    audio.pause();
  });
  mute = true;
}

function unmuteSound() {
  audioData.forEach((audio) => {
    audio.muted = false;
  });
  mute = false;
}

function playStartScreenSound() {
  audioData[0].volume = 0.5;
  audioData[0].play();
}

function pauseStartScreenSound() {
  audioData[0].pause();
}

function playGameLostSound() {
  audioData[1].play();
}

function pauseGameLostSound() {
  audioData[1].pause();
}

function playCoinCollectSound() {
  audioData[2].cloneNode(true).play();
}

function playBottleCollectSound() {
  audioData[3].cloneNode(true).play();
}

function playBottleRefillSound() {
  audioData[4].play();
}

function playWalkingSound() {
  audioData[5].play();
}

function pauseWalkingSound() {
  audioData[5].pause();
}

function playJumpingSound() {
  audioData[6].play();
}

function playHurtSound() {
  audioData[7].play();
}

function playSnoringSound() {
  audioData[8].play();
}

function pauseSnoringSound() {
  audioData[8].pause();
}

function playThrowingSound() {
  audioData[9].play();
}

function playBottleSplashSound() {
  audioData[10].play();
}

function playNormalChickenDefeatedSound() {
  audioData[11].play();
}

function playSmallChickenDefeatedSound() {
  audioData[12].play();
}

function playEndossAttakSound() {
  audioData[13].play();
}

function playEndbossHurtSound() {
  audioData[14].play();
}

function playEndbossDefeatedSound() {
  audioData[15].play();
}

function playGameWonSound() {
  audioData[16].play();
}

function playEndbossAttakSound() {
  audioData[17].play();
}

function pauseEndbossAttakSound() {
  audioData[17].pause();
}

function playEndbossFightSound() {
  let audio = audioData[18];
  audio.loop = true;
  audio.play();
}

function pauseEndbossFightSound() {
  audioData[18].pause();
}

function playGameSound() {
  audioData[19].volume = 0.25;
  audioData[19].play();
}

function pauseGameSound() {
  audioData[19].pause();
}
