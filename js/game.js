let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
let mute = false;
let fullscreenEnabled = false;

window.onload = function init() {
  canvas = document.getElementById('canvas');
  // updateCanvasSize(); // Funktion hinzufügen
  // showCanvas();
  initLevel();
  world = new World(canvas, keyboard);
  ctx = canvas.getContext('2d');
};

function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function gameOver() {
  console.log('Game Over!');
  // showEndscreen();
  // this.stopGame();
}

function showCanvas() {
  document.getElementById('startscreen').style.display = 'none';
  document.getElementById('canvas-container').style.display = 'block';
}

function showEndscreen() {
  document.getElementById('canvas-container').style.display = 'none';
  document.getElementById('endscreen').style.display = 'flex';
}

function showStartscreen() {
  document.getElementById('endscreen').style.display = 'none';
  document.getElementById('startscreen').style.display = 'flex';
}

function toggleMute() {
  mute = !mute;
  console.log('mute:', mute);
  let soundButton = document.getElementById('sound-button');

  if (soundButton.src.endsWith('img/10_other/sound_on.svg')) {
    soundButton.src = 'img/10_other/sound_off.svg';
  } else {
    soundButton.src = 'img/10_other/sound_on.svg';
  }
  console.log('soundButton.src', soundButton.src);
}

function toggleFullscreen() {
  let fullscreen = document.getElementById('game-container');

  if (!fullscreenEnabled) {
    enterFullscreen(fullscreen);
    // button.style.backgroundImage = 'img/10_other/fullscreen_close.svg';
  } else {
    exitFullscreen();
    // button.style.backgroundImage = 'img/10_other/fullscreen_open.svg';
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
