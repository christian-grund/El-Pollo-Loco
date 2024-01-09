class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;

  lastHit = 0;
  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0 || this.deadChickenFallsDown()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        console.log('speedY:', this.speedY);
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Throwable Object should always fall
      if (this.y < 340) {
        console.log('isAboveGround-true this.y', this.y);
        return true;
      }
    } else {
      // console.log('isAboveGround-false this.y', this.y);
      return this.y < 180;
    }
  }

  deadChickenFallsDown() {
    if (this instanceof ChickenNormal || this instanceof ChickenSmall) {
      return this.y < 1000;
    }
  }

  jump() {
    this.speedY = 25;
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
    return this.x + this.width > mo.x && this.y + this.height > mo.y && this.x < mo.x && this.y < mo.y + mo.height;
    // return (
    //   this.x + this.width + this.offset.left - this.offset.right > mo.x + mo.offset.left &&
    //   this.y + this.height + this.offset.top - this.offset.bottom > mo.y + mo.offset.top &&
    //   this.x + this.offset.left < mo.x + mo.width + mo.offset.left - mo.offset.right &&
    //   this.y + this.offset.top + this.height - this.offset.bottom < mo.y + mo.height - mo.offset.bottom
    // );
    // return (
    //   this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
    //   this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
    //   this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
    //   this.y + this.offset.top >= mo.y + mo.height - mo.offset.bottom
    // );
    // + this.offset.left
    // + this.offset.top
    // + mo.offset.left
    // + this.height - this.offset.bottom
  }

  hit() {
    this.energy -= 5;

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); // Zeit in ms seit dem 01.01.1970;
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
    return this.speedY == 0;
  }

  isJumpingUp() {
    return this.speedY > 0;
  }

  isJumpingDown() {
    return this.speedY < 0;
  }
}
