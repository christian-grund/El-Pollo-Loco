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
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn('Error loading Image', e);
    }
  }
}
