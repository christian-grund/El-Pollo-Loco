/**
 * Represents a drawable object.
 */
class DrawableObject {
  x = 150;
  y = 155;
  height = 150;
  width = 125;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Loads an image for the drawable object.
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images for the drawable object.
   * @param {string[]} arr - An array of paths to the images.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the drawable object on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn('Error loading Image', e);
    }
  }
}
