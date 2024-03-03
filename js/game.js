let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
let mute = false;
let fullscreenEnabled = false;
let game_lost_sound = new Audio('audio/game_lost.mp3');

// window.onload =
function init() {
  canvas = document.getElementById('canvas');
  showCanvas();
  initLevel();
  world = new World(canvas, keyboard);
  ctx = canvas.getContext('2d');
}

function gameOver() {
  console.log('game over');
  let endscreenText = document.getElementById('endscreen-text');

  if (world.character.energy <= 0) {
    endscreenText.src = 'img/9_intro_outro_screens/game_over/oh no you lost!.png';
    game_lost_sound.play();
  }
  showEndscreen();
  // this.stopGame();
}

function showStartscreen() {
  document.getElementById('endscreen').style.display = 'none';
  document.getElementById('startscreen').style.display = 'flex';
}

function showCanvas() {
  document.getElementById('startscreen').style.display = 'none';
  document.getElementById('game-container').style.display = 'flex';
}

function showEndscreen() {
  document.getElementById('game-container').style.display = 'none';
  document.getElementById('endscreen').style.display = 'flex';
}

function toggleMute() {
  mute = !mute;
  console.log('mute:', mute);
  let soundButton = document.getElementById('mute-button');

  if (mute) {
    soundButton.style.backgroundImage = 'url("img/10_other/sound_off.svg")';
  } else {
    soundButton.style.backgroundImage = 'url("img/10_other/sound_on.svg")';
  }
}

function toggleFullscreen() {
  let fullscreen = document.getElementById('game-container');
  let fullscreenButton = document.getElementById('fullscreen-button');

  if (!fullscreenEnabled) {
    enterFullscreen(fullscreen);
    fullscreenButton.style.backgroundImage = 'url("img/10_other/fullscreen_close.svg")';
  } else {
    exitFullscreen();
    fullscreenButton.style.backgroundImage = 'url("img/10_other/fullscreen_open.svg")';
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
  let id = setInterval(fn, time);
  this.intervalIDs.push(id);
  console.log('intervalIDs', intervalIDs);
}

function stopGame() {
  this.intervalIDs.forEach(clearInterval);
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});
