let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];

// window.onload =
function startScreen() {
  // const img = document.createElement('IMG');
  // img.src = './img/9_intro_outro_screens/start/startscreen_1.png';
  let startscreen = document.getElementById('startscreen');
  startscreen.innerHTML = <img src="./img/9_intro_outro_screens/start/startscreen_1.png" alt="" />;

  // startScreen.innerHTML = '<img src="./img/9_intro_outro_screens/start/startscreen_1.png">';
}

function init() {
  initLevel(); // Load when game is started after start screen, then enemies, clouds etc. are loaded
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  ctx = canvas.getContext('2d');
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
