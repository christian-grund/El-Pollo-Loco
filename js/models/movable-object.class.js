class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  enemyEnergy = 100;

  lastHit = 0;
  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Throwable Object should always fall
      if (this.y < 340) {
        // console.log('isAboveGround-true this.y', this.y);
        return true;
      }
    } else {
      // console.log('isAboveGround-false this.y', this.y);
      return this.y < 180;
    }
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

  jump() {
    this.speedY = 30;
  }

  isColliding(mo) {
    return (
      this.x + this.offset.left + this.width - this.offset.right >= mo.x + mo.offset.left &&
      this.y + this.offset.top + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
      this.x + this.offset.left <= mo.x + mo.offset.left + mo.width - mo.offset.right &&
      this.y + this.offset.top + this.height - this.offset.bottom >= mo.y + mo.offset.top
      // && mo.onCollisionCourse
    ); // optional: check if object is moving in right direction. Only then we collide. Usefull for objects you can stand on.
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
}
