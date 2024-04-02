let mute = false;

/**
 * Array containing audio data for various game sounds.
 */
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

/**
 * Toggles the mute state of the game.
 */
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

/**
 * Mutes all game sounds.
 */
function muteSound() {
  audioData.forEach((audio) => {
    audio.muted = true;
    audio.pause();
  });
  mute = true;
}

/**
 * Unmutes all game sounds.
 */
function unmuteSound() {
  audioData.forEach((audio) => {
    audio.muted = false;
  });
  mute = false;
}

/**
 * Plays the start screen background sound.
 */
function playStartScreenSound() {
  audioData[0].volume = 0.5;
  audioData[0].play();
}

/**
 * Pauses the start screen background sound.
 */
function pauseStartScreenSound() {
  audioData[0].pause();
}

/**
 * Plays the sound effect for when the game is lost.
 */
function playGameLostSound() {
  audioData[1].play();
}

/**
 * Pauses the game lost sound.
 */
function pauseGameLostSound() {
  audioData[1].pause();
}

/**
 * Plays the sound effect for coin collection.
 */
function playCoinCollectSound() {
  audioData[2].cloneNode(true).play();
}

/**
 * Plays the sound effect for bottle collection.
 */
function playBottleCollectSound() {
  audioData[3].cloneNode(true).play();
}

/**
 * Plays the sound effect for bottle refill.
 */
function playBottleRefillSound() {
  audioData[4].play();
}

/**
 * Plays the walking sound effect.
 */
function playWalkingSound() {
  audioData[5].play();
}

/**
 * Pauses the walking sound effect.
 */
function pauseWalkingSound() {
  audioData[5].pause();
}

/**
 * Plays the jumping sound effect.
 */
function playJumpingSound() {
  audioData[6].play();
}

/**
 * Plays the hurt sound effect.
 */
function playHurtSound() {
  audioData[7].play();
}

/**
 * Pauses the hurt sound effect.
 */
function pauseHurtSound() {
  audioData[7].pause();
}

/**
 * Plays the snoring sound effect.
 */
function playSnoringSound() {
  audioData[8].play();
}

/**
 * Pauses the snoring sound effect.
 */
function pauseSnoringSound() {
  audioData[8].pause();
}

/**
 * Plays the throwing sound effect.
 */
function playThrowingSound() {
  audioData[9].play();
}

/**
 * Plays the bottle splash sound effect.
 */
function playBottleSplashSound() {
  audioData[10].play();
}

/**
 * Plays the sound effect for normal chicken defeated.
 */
function playNormalChickenDefeatedSound() {
  audioData[11].play();
}

/**
 * Plays the sound effect for small chicken defeated.
 */
function playSmallChickenDefeatedSound() {
  audioData[12].play();
}

/**
 * Plays the sound effect for endboss attack.
 */
function playEndossAttakSound() {
  audioData[13].play();
}

/**
 * Plays the sound effect for endboss hurt.
 */
function playEndbossHurtSound() {
  audioData[14].play();
}

/**
 * Plays the sound effect for endboss defeated.
 */
function playEndbossDefeatedSound() {
  audioData[15].play();
}

/**
 * Plays the sound effect for game won.
 */
function playGameWonSound() {
  audioData[16].play();
}

/**
 * Plays the sound effect for endboss attack.
 */
function playEndbossAttakSound() {
  audioData[17].play();
}

/**
 * Pauses the sound effect for endboss attack.
 */
function pauseEndbossAttakSound() {
  audioData[17].pause();
}

/**
 * Plays the sound effect for endboss fight.
 */
function playEndbossFightSound() {
  let audio = audioData[18];
  audio.loop = true;
  audio.play();
}

/**
 * Pauses the sound effect for endboss fight.
 */
function pauseEndbossFightSound() {
  audioData[18].pause();
}

/**
 * Plays the background game sound.
 */
function playGameSound() {
  audioData[19].volume = 0.25;
  audioData[19].play();
}

/**
 * Pauses the background game sound.
 */
function pauseGameSound() {
  audioData[19].pause();
}
