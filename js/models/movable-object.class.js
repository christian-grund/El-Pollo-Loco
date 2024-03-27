class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  energyEndboss = 100;
  world;

  lastHit = 0;
  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  applyGravity(y) {
    setInterval(() => {
      if (this.isAboveGround() || this.chickenSmallAboveGround(y) || this.speedY > 0 || this.deadChickenFallsDown()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        // console.log('this.y:', this.y);
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Throwable Object should always fall
      if (this.y < 350) {
        return true;
      }
    } else {
      return this.y < 180;
    }
  }

  chickenSmallAboveGround(y) {
    // if (this instanceof ChickenSmall) {
    //   if (this.y < 335) {
    //     // Überprüfen, ob das Huhn in der Luft ist (nicht unterhalb des Bodens)
    //     console.log('Chicken is above ground');
    //     return true; // Huhn ist noch in der Luft
    //   } else {
    //     console.log('Chicken is not above ground');
    //     // return (this.y = 335);
    //     return false; // Huhn ist nicht mehr in der Luft
    //   }
    // }
  }

  deadChickenFallsDown() {
    if (this instanceof ChickenNormal || this instanceof ChickenSmall) {
      return this.y < 1000;
    }
  }

  jump() {
    this.speedY = 22.5;
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
      gameOver();
    } else {
      this.lastHit = new Date().getTime(); // Zeit in ms seit dem 01.01.1970;
      if (!mute) {
        this.hurt_sound.play();
      }
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
