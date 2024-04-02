let canvas;
let world;
let keyboard = new Keyboard();
let fullscreenEnabled = false;

/**
 * Initializes the game.
 */
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

/**
 * Handles the game over event.
 */
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
  startScreenSoundInterval = setInterval(() => playStartScreenSound(), 1000 / 25);
  showEndscreen();
}

/**
 * Restarts the game.
 */
function restartGame() {
  showCanvas();
  initLevel();
  world = new World(canvas, keyboard);
  clearInterval(this.startScreenSoundInterval);
  pauseStartScreenSound();
  playGameSound();
}

/**
 * Handles the sounds when the character dies.
 */
function characterDiedSounds() {
  pauseGameSound();
}

/**
 * Displays the start screen.
 */
function showStartscreen() {
  document.getElementById('endscreen').style.display = 'none';
  document.getElementById('startscreen').style.display = 'flex';
  document.getElementById('top-left-buttons').style.display = 'flex';
  document.getElementById('startscreen-top-button').style.display = 'flex';
}

/**
 * Displays the game canvas.
 */
function showCanvas() {
  document.getElementById('startscreen').style.display = 'none';
  document.getElementById('top-left-buttons').style.display = 'none';
  document.getElementById('startscreen-top-button').style.display = 'none';
  document.getElementById('canvas').style.display = 'block';
}

/**
 * Displays the end screen.
 */
function showEndscreen() {
  document.getElementById('canvas').style.display = 'none';
  document.getElementById('endscreen').style.display = 'flex';
}

/**
 * Closes the end screen.
 */
function closeEndscreen() {
  document.getElementById('endscreen').style.display = 'none';
}

/**
 * Toggles the display of keyboard instructions.
 */
function toggleInstructions() {
  let instructions = document.getElementById('keyboard-instructions');
  let instructionsButton = document.getElementById('control-button');
  if (instructions.style.display === 'none') toggleInstructionsIf(instructions, instructionsButton);
  else toggleInstructionsElse(instructions, instructionsButton);
}

/**
 * Toggles the display of keyboard instructions when the display is initially none.
 *
 * @param {Element} instructions - The element containing the keyboard instructions.
 * @param {Element} instructionsButton - The button for toggling the instructions.
 */
function toggleInstructionsIf(instructions, instructionsButton) {
  instructions.style.display = 'flex';
  instructionsButton.style.filter = 'invert(83%) sepia(55%) saturate(3105%) hue-rotate(359deg) brightness(103%) contrast(103%)';
  document.addEventListener('click', closeInstructionsOutside);
}

/**
 * Toggles the display of keyboard instructions when the display is initially not none.
 *
 * @param {Element} instructions - The element containing the keyboard instructions.
 * @param {Element} instructionsButton - The button for toggling the instructions.
 */
function toggleInstructionsElse(instructions, instructionsButton) {
  instructions.style.display = 'none';
  instructionsButton.style.filter = '';
  document.removeEventListener('click', closeInstructionsOutside);
}

/**
 * Closes the keyboard instructions when clicked outside the instructions area.
 *
 * @param {Event} event - The click event.
 */
function closeInstructionsOutside(event) {
  let instructions = document.getElementById('keyboard-instructions');
  let instructionsButton = document.getElementById('control-button');
  if (event.target !== instructions && event.target !== instructionsButton && !instructions.contains(event.target)) {
    instructions.style.display = 'none';
    instructionsButton.style.filter = '';
    document.removeEventListener('click', closeInstructionsOutside);
  }
}

/**
 * Toggles the display of the game story.
 */
function toggleStory() {
  let story = document.getElementById('game-story');
  let storyButton = document.getElementById('info-button');
  let playButton = document.getElementById('play-button');

  if (story.style.display === 'none') toggleStoryIf(story, storyButton, playButton);
  else toggleStoryElse(story, storyButton, playButton);
}

/**
 * Toggles the display of the game story when the display is initially none.
 *
 * @param {Element} story - The element containing the game story.
 * @param {Element} storyButton - The button for toggling the story.
 * @param {Element} playButton - The button for playing the game.
 */
function toggleStoryIf(story, storyButton, playButton) {
  story.style.display = 'flex';
  storyButton.style.filter = 'invert(83%) sepia(55%) saturate(3105%) hue-rotate(359deg) brightness(103%) contrast(103%)';
  playButton.style.display = 'none';
  document.addEventListener('click', closeStoryOutside);
}

/**
 * Toggles the display of the game story when the display is initially not none.
 *
 * @param {Element} story - The element containing the game story.
 * @param {Element} storyButton - The button for toggling the story.
 * @param {Element} playButton - The button for playing the game.
 */
function toggleStoryElse(story, storyButton, playButton) {
  story.style.display = 'none';
  storyButton.style.filter = '';
  document.removeEventListener('click', closeStoryOutside);
  playButton.style.display = 'flex';
}

/**
 * Closes the game story when clicked outside the story area.
 *
 * @param {Event} event - The click event.
 */
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

/**
 * Closes the game story.
 */
function closeStory() {
  document.getElementById('game-story').style.display = 'none';
  document.getElementById('info-button').style.filter = '';
}

/**
 * Toggles fullscreen mode for the game.
 */
function toggleFullscreen() {
  let fullscreen = document.getElementById('game-container');
  let canvas = document.getElementById('canvas');
  let startscreen = document.getElementById('startscreen');
  let endscreen = document.getElementById('endscreen');
  let fullscreenButton = document.getElementById('fullscreen-button');

  if (!fullscreenEnabled) toggleFullscreenIf(fullscreen, canvas, startscreen, endscreen, fullscreenButton);
  else toggleFullscreenElse(canvas, startscreen, endscreen, fullscreenButton);

  fullscreenEnabled = !fullscreenEnabled;
}

/**
 * Enters fullscreen mode when fullscreen is initially disabled.
 *
 * @param {Element} fullscreen - The element representing the game container.
 * @param {Element} canvas - The canvas element of the game.
 * @param {Element} startscreen - The start screen element.
 * @param {Element} endscreen - The end screen element.
 * @param {Element} fullscreenButton - The button for toggling fullscreen mode.
 */
function toggleFullscreenIf(fullscreen, canvas, startscreen, endscreen, fullscreenButton) {
  enterFullscreen(fullscreen);
  fullscreenButton.style.backgroundImage = 'url("img/10_other/fullscreen_close.svg")';
  setElementSize(canvas, startscreen, endscreen, '100vw', '100vh');
}

/**
 * Exits fullscreen mode when fullscreen is initially enabled.
 *
 * @param {Element} fullscreen - The element representing the game container.
 * @param {Element} canvas - The canvas element of the game.
 * @param {Element} startscreen - The start screen element.
 * @param {Element} endscreen - The end screen element.
 * @param {Element} fullscreenButton - The button for toggling fullscreen mode.
 */
function toggleFullscreenElse(canvas, startscreen, endscreen, fullscreenButton) {
  exitFullscreen();
  fullscreenButton.style.backgroundImage = 'url("img/10_other/fullscreen_open.svg")';
  setElementSize(canvas, startscreen, endscreen, '', '');
}

/**
 * Sets the size of HTML elements.
 *
 * @param {Element} canvas - The canvas element of the game.
 * @param {Element} startscreen - The start screen element.
 * @param {Element} endscreen - The end screen element.
 * @param {string} width - The width value to set.
 * @param {string} height - The height value to set.
 */
function setElementSize(canvas, startscreen, endscreen, width, height) {
  startscreen.style.width = width;
  startscreen.style.height = height;
  canvas.style.width = width;
  canvas.style.height = height;
  endscreen.style.width = width;
  endscreen.style.height = height;
}

/**
 * Enters fullscreen mode for an element.
 *
 * @param {Element} element - The element to enter fullscreen mode.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Sets an interval that can be stopped later.
 *
 * @param {Function} fn - The function to be called repeatedly.
 * @param {number} time - The time interval in milliseconds.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIDs.push(id);
}

/**
 * Stops the game by clearing all intervals.
 */
function stopGame() {
  this.intervalIDs.forEach(clearInterval);
}

/**
 * Clears all intervals.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}
