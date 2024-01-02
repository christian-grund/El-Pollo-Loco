class MovableObject {
  x = 150;
  y = 155;
  img;
  width = 125;
  imageCache = {}; // JSON Array
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 180;
  }

  // loadImage('img/test.png');
  loadImage(path) {
    this.img = new Image(); // document.getElementById('image') <img id="image">
    this.img.src = path;
  }

  // arr = array
  // @param (Array) arr = ['img/image1.png', 'img/image2.png']
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img; // spricht img im JSON Array an
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6 (% = mathematische Rest)
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

  // character.isColliding(chicken)
  isColliding(mo) {
    return this.x + this.width > mo.x && this.y + this.height > mo.y && this.x < mo.x && this.y < mo.y + mo.height;
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
