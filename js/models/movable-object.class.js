class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  offset = {
    top: 100,
    left: 25,
    bottom: 110,
    right: 50,
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
      return true;
    } else {
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
      this.y + this.offset.top <= mo.y + mo.offset.top + mo.height - mo.offset.bottom
    );
  }

  // character.isColliding(chicken)
  // isColliding(mo) {
  //   return this.x + this.width > mo.x &&
  //   this.y + this.height > mo.y &&
  //   this.x < mo.x &&
  //   this.y < mo.y + mo.height;
  // }

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

  // Bessere Formel zur Kollisionsberechnung (Genauer)
  // character.isColliding(chicken)
  // isColliding(obj) {
  //   return (
  //     this.X + this.width >= obj.X &&
  //     this.X <= obj.X + obj.width &&
  //     this.Y + this.offsetY + this.height >= obj.Y &&
  //     this.Y + this.offsetY <= obj.Y + obj.height &&
  //     obj.onCollisionCourse
  //   ); // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
  // }
}
