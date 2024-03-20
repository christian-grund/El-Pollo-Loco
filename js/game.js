let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
let mute = true;
let fullscreenEnabled = false;
let start_screen_sound = new Audio('audio/del-rio-bravo.mp3');
let game_lost_sound = new Audio('audio/game_lost.mp3');

// window.onload =
function startScreenSound() {
  start_screen_sound.play();
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
    game_lost_sound.play();
  }
  clearInterval(world.runInterval);
  clearAllIntervals();

  showEndscreen();
  // this.stopGame();
}

function showStartscreen() {
  document.getElementById('endscreen').style.display = 'none';
  document.getElementById('startscreen').style.display = 'flex';
  document.getElementById('top-left-buttons').style.display = 'flex';
  document.getElementById('startscreen-top-button').style.display = 'flex';
  start_screen_sound.play();
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

// function togglePause() {
//   if (!world.paused) {
//     world.run();
//     world.paused = false;
//   } else {
//     clearInterval(world.runInterval);
//     world.paused = true;
//   }
// }

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
  console.log('intervalIDs:', intervalIDs);
  let id = setInterval(fn, time);
  intervalIDs.push(id);
  console.log('intervalIDs', intervalIDs);
}

function stopGame() {
  this.intervalIDs.forEach(clearInterval);
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
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

  if (e.keyCode == 82) {
    keyboard.R = true;
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
