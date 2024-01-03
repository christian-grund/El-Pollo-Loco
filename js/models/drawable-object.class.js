class DrawableObject {
  x = 150;
  y = 155;
  height = 150;
  width = 125;
  img;
  imageCache = {}; // JSON Array
  currentImage = 0;

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

  drawBlueFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  drawRedFrame(ctx) {
    if (this instanceof Character) {
      //  || this instanceof Chicken
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'red';
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.right,
        this.height - this.offset.bottom
      );
      //   ctx.rect(this.offset.left + this.width, this.offset.bottom + this.height, this.offset.right, this.offset.top);
      ctx.stroke();
    }
  }
}
