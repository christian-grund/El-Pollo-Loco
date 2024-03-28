let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
// let mute = false;
let fullscreenEnabled = false;
let start_screen_sound = audioData[0];
let game_lost_sound = audioData[1];

// window.onload =
function startScreenSound() {
  // start_screen_sound.play();
}

function init() {
  canvas = document.getElementById('canvas');
  showCanvas();
  initLevel();
  world = new World(canvas, keyboard);
  ctx = canvas.getContext('2d');
  mute = false;
  start_screen_sound.pause();
}

function gameOver() {
  console.log('game over');
  let endscreenText = document.getElementById('endscreen-text');

  if (world.character.energy <= 0) {
    endscreenText.src = 'img/9_intro_outro_screens/game_over/oh no you lost!.png';
    clearInterval(world.runInterval);
    clearInterval(world.level.endboss.endbossAnimation);
    game_lost_sound.play();
    setTimeout(() => {
      game_lost_sound.pause();
      // start_screen_sound.play();
    }, 6000);
  } else {
    endscreenText.src = 'img/9_intro_outro_screens/game_over/game over!.png';
    // start_screen_sound.play();
  }
  // clearInterval(world.runInterval);
  setTimeout(() => {
    clearAllIntervals();
  }, 7010);

  showEndscreen();
  // this.stopGame();
}

function showStartscreen() {
  document.getElementById('endscreen').style.display = 'none';
  document.getElementById('startscreen').style.display = 'flex';
  document.getElementById('top-left-buttons').style.display = 'flex';
  document.getElementById('startscreen-top-button').style.display = 'flex';
  // start_screen_sound.play();
}

function showCanvas() {
  document.getElementById('startscreen').style.display = 'none';
  document.getElementById('top-left-buttons').style.display = 'none';
  document.getElementById('startscreen-top-button').style.display = 'none';
  document.getElementById('canvas').style.display = 'block';
}

function showEndscreen() {
  document.getElementById('canvas').style.display = 'none';
  document.getElementById('endscreen').style.display = 'flex';
}

function closeEndscreen() {
  document.getElementById('endscreen').style.display = 'none';
}

function toggleInstructions() {
  let instructions = document.getElementById('keyboard-instructions');
  let instructionsButton = document.getElementById('control-button');
  if (instructions.style.display === 'none') {
    instructions.style.display = 'flex';
    instructionsButton.style.filter =
      'invert(83%) sepia(55%) saturate(3105%) hue-rotate(359deg) brightness(103%) contrast(103%)';
    document.addEventListener('click', closeInstructionsOutside);
  } else {
    instructions.style.display = 'none';
    instructionsButton.style.filter = '';
    document.removeEventListener('click', closeInstructionsOutside);
  }
}

function closeInstructionsOutside(event) {
  let instructions = document.getElementById('keyboard-instructions');
  let instructionsButton = document.getElementById('control-button');
  if (event.target !== instructions && event.target !== instructionsButton && !instructions.contains(event.target)) {
    instructions.style.display = 'none';
    instructionsButton.style.filter = '';
    document.removeEventListener('click', closeInstructionsOutside);
  }
}

function toggleStory() {
  let story = document.getElementById('game-story');
  let storyButton = document.getElementById('info-button');
  let playButton = document.getElementById('play-button');

  if (story.style.display === 'none') {
    story.style.display = 'flex';
    storyButton.style.filter =
      'invert(83%) sepia(55%) saturate(3105%) hue-rotate(359deg) brightness(103%) contrast(103%)';
    playButton.style.display = 'none';
    document.addEventListener('click', closeStoryOutside);
  } else {
    story.style.display = 'none';
    storyButton.style.filter = '';
    document.removeEventListener('click', closeStoryOutside);
    playButton.style.display = 'flex';
  }
}

function closeStoryOutside(event) {
  let story = document.getElementById('game-story');
  let storyButton = document.getElementById('info-button');
  let playButton = document.getElementById('play-button');

  if (event.target !== story && event.target !== storyButton && !story.contains(event.target)) {
    story.style.display = 'none';
    storyButton.style.filter = '';
    document.removeEventListener('click', closeStoryOutside);
    playButton.style.display = 'flex';
  }
}

function closeStory() {
  document.getElementById('game-story').style.display = 'none';
  document.getElementById('info-button').style.filter = '';
}

// function toggleMute() {
//   mute = !mute;
//   console.log('mute:', mute);
//   let soundButton = document.getElementById('mute-button');

//   if (mute) {
//     soundButton.style.backgroundImage = 'url("img/10_other/sound_off.svg")';
//   } else {
//     soundButton.style.backgroundImage = 'url("img/10_other/sound_on.svg")';
//   }
// }

function toggleFullscreen() {
  let fullscreen = document.getElementById('game-container');
  let canvas = document.getElementById('canvas');
  let startscreen = document.getElementById('startscreen');
  let endscreen = document.getElementById('endscreen');
  let fullscreenButton = document.getElementById('fullscreen-button');

  if (!fullscreenEnabled) {
    enterFullscreen(fullscreen);
    fullscreenButton.style.backgroundImage = 'url("img/10_other/fullscreen_close.svg")';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    startscreen.style.width = '100vw';
    startscreen.style.height = '100vh';
    endscreen.style.width = '100vw';
    endscreen.style.height = '100vh';
  } else {
    exitFullscreen();
    fullscreenButton.style.backgroundImage = 'url("img/10_other/fullscreen_open.svg")';
    canvas.style.width = '';
    canvas.style.height = '';
    startscreen.style.width = '';
    startscreen.style.height = '';
    endscreen.style.width = '';
    endscreen.style.height = '';
  }
  fullscreenEnabled = !fullscreenEnabled;
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function setStoppableInterval(fn, time) {
  console.log('intervalIDs:', intervalIDs);
  let id = setInterval(fn, time);
  intervalIDs.push(id);
  console.log('intervalIDs', intervalIDs);
}

function stopGame() {
  this.intervalIDs.forEach(clearInterval);
}

function clearAllIntervals() {
  for (let i = 1; i < 99; i++) window.clearInterval(i);
}
