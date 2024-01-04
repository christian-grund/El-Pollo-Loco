class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  THROW_REQUEST_STOP = new Date().getTime();
  THROW_REQUEST_START = 0;

  // constructor() {
  //   this.bindKeyPressEvents();
  //   this.bindBtsPressEvents();
  // }

  // bindBtsPressEvents() {
  //   document.getElementById('btnleft').addEventListener('touchstart', (e) => {
  //     e.preventDefault();
  //     this.LEFT = true;
  //   });

  //   document.getElementById('btnleft').addEventListener('touchend', (e) => {
  //     e.preventDefault();
  //     this.LEFT = false;
  //   })

  // }
}
