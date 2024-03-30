/**
 * Represents a status bar for the end boss.
 * @extends DrawableObject
 */
class StatusBarEndboss extends DrawableObject {
  /**
   * Array of image paths for the end boss life status bar.
   * @type {string[]}
   */
  IMAGES_LIFE_ENDBOSS = [
    'img/7_statusbars/2_statusbar_endboss/green/green0.png',
    'img/7_statusbars/2_statusbar_endboss/green/green20.png',
    'img/7_statusbars/2_statusbar_endboss/green/green40.png',
    'img/7_statusbars/2_statusbar_endboss/green/green60.png',
    'img/7_statusbars/2_statusbar_endboss/green/green80.png',
    'img/7_statusbars/2_statusbar_endboss/green/green100.png',
  ];

  /**
   * Percentage of end boss life.
   * @type {number}
   */
  percentage = 100;

  /**
   * Constructs a new StatusBarEndboss object.
   */
  constructor() {
    super().loadImages(this.IMAGES_LIFE_ENDBOSS);
    this.x = 500;
    this.y = 40;
    this.width = 200;
    this.height = 60;
    this.visible = false;
    this.setPercentage(100);
  }

  /**
   * Sets the percentage of end boss life and updates the status bar image.
   * @param {number} percentage - The percentage of end boss life.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_LIFE_ENDBOSS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
    this.visible = this.percentage < 100;
  }

  /**
   * Resolves the index of the image in IMAGES_LIFE_ENDBOSS array based on the percentage of end boss life.
   * @returns {number} The index of the image.
   */
  resolveImageIndex() {
    if (this.percentage >= 80) {
      return 5;
    } else if (this.percentage > 60) {
      return 4;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
