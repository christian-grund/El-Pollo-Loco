let canvas;
let world;
let keyboard = new Keyboard();
let fullscreenEnabled = false;

function init() {
  canvas = document.getElementById('canvas');
  showCanvas();
  initLevel();
  world = new World(canvas, keyboard);
  ctx = canvas.getContext('2d');
  clearInterval(this.startScreenSoundInterval);
  pauseStartScreenSound();
  playGameSound();
}

function gameOver() {
  let endscreenText = document.getElementById('endscreen-text');
  pauseSnoringSound();
  if (world.character.energy <= 0) {
    endscreenText.src = 'img/9_intro_outro_screens/game_over/oh no you lost!.png';
    characterDiedSounds();
  } else {
    endscreenText.src = 'img/9_intro_outro_screens/game_over/game over!.png';
  }
  clearAllIntervals();
  startScreenSoundInterval = setInterval(() => {
    playStartScreenSound();
  }, 1000 / 25);
  showEndscreen();
}

function restartGame() {
  showCanvas();
  initLevel();
  world = new World(canvas, keyboard);
  clearInterval(this.startScreenSoundInterval);
  pauseStartScreenSound();
  playGameSound();
}

function characterDiedSounds() {
  pauseGameSound();
}

function showStartscreen() {
  document.getElementById('endscreen').style.display = 'none';
  document.getElementById('startscreen').style.display = 'flex';
  document.getElementById('top-left-buttons').style.display = 'flex';
  document.getElementById('startscreen-top-button').style.display = 'flex';
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
    instructionsButton.style.filter = 'invert(83%) sepia(55%) saturate(3105%) hue-rotate(359deg) brightness(103%) contrast(103%)';
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
    storyButton.style.filter = 'invert(83%) sepia(55%) saturate(3105%) hue-rotate(359deg) brightness(103%) contrast(103%)';
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

function toggleFullscreen() {
  let fullscreen = document.getElementById('game-container');
  let canvas = document.getElementById('canvas');
  let startscreen = document.getElementById('startscreen');
  let endscreen = document.getElementById('endscreen');
  let fullscreenButton = document.getElementById('fullscreen-button');

  if (!fullscreenEnabled) {
    enterFullscreen(fullscreen);
    fullscreenButton.style.backgroundImage = 'url("img/10_other/fullscreen_close.svg")';
    setElementSize(canvas, startscreen, endscreen, '100vw', '100vh');
  } else {
    exitFullscreen();
    fullscreenButton.style.backgroundImage = 'url("img/10_other/fullscreen_open.svg")';
    setElementSize(canvas, startscreen, endscreen, '', '');
  }
  fullscreenEnabled = !fullscreenEnabled;
}

function setElementSize(canvas, startscreen, endscreen, width, height) {
  startscreen.style.width = width;
  startscreen.style.height = height;
  canvas.style.width = width;
  canvas.style.height = height;
  endscreen.style.width = width;
  endscreen.style.height = height;
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
  let id = setInterval(fn, time);
  intervalIDs.push(id);
}

function stopGame() {
  this.intervalIDs.forEach(clearInterval);
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}
