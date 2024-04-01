class MovableObject extends DrawableObject {
  // keyboard = new Keyboard();
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  energyEndboss = 100;
  world;
  ground = 180;

  lastHit = 0;
  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  constructor(keyboardInstance) {
    super();
    this.keyboardInstance = keyboardInstance;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = this.ground;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < this.ground;
  }

  jump() {
    this.speedY = 22.5;
    this.y -= 1;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 0 % 6 (% = mathematische Rest)
    // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, ...
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationOnce(images) {
    for (let i = 0; i < images.length; i++) {
      let path = images[i];
      this.img = this.imageCache[path];
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  isColliding(mo) {
    // return this.x + this.width > mo.x && this.y + this.height > mo.y && this.x < mo.x && this.y < mo.y + mo.height;
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left && // R->L // Rechteck-Kollision in X-Richtung: Dieser Ausdruck überprüft, ob der rechte Rand des aktuellen Objekts rechts vom linken Rand des anderen Objekts liegt.
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // T->B // Rechteck-Kollision in Y-Richtung: Dieser Ausdruck überprüft, ob der untere Rand des aktuellen Objekts unterhalb des oberen Rands des anderen Objekts liegt.
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // L->R // Rechteck-Kollision in X-Richtung (umgekehrt): Dieser Ausdruck überprüft, ob der linke Rand des aktuellen Objekts links vom rechten Rand des anderen Objekts liegt.
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom // B->T // Rechteck-Kollision in Y-Richtung (umgekehrt):Dieser Ausdruck überprüft, ob der obere Rand des aktuellen Objekts über dem unteren Rand des anderen Objekts liegt.
    );
  }

  hit() {
    this.energy -= 3;
    if (this.energy < 0) {
      this.energy = 0;
      pauseEndbossFightSound();
      playGameLostSound();
      callUnbindPressEvents();
      setTimeout(() => gameOver(), 3000);
    } else {
      this.lastHit = new Date().getTime(); // Zeit in ms seit dem 01.01.1970;
      playHurtSound();
    }
  }

  removeEventListeners() {
    if (this.keyboardInstance instanceof Keyboard) {
      this.keyboardInstance.unbindPressEvents();
    } else {
      console.error('Keyboard instance not available!');
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0; // returns true or false
  }

  isOnGround() {
    // if (this.speedY == -25) {
    //   this.speedY = 0;
    // }
    return this.speedY == 0;
  }

  isJumpingUp() {
    return this.speedY > 0;
  }

  isWalking() {
    return this.speed > 0;
  }

  isJumpingDown() {
    if (this.speedY <= -25) {
      this.speedY = 0;
      this.isOnGround();
    } else {
      return this.speedY < 0;
    }
  }
}
