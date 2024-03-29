/**
 * Represents a status bar for health.
 * @extends DrawableObject
 */
class StatusBarHealth extends DrawableObject {
  IMAGES_LIFE = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
  ];

  percentage = 100;

  /**
   * Constructs a new StatusBarHealth object.
   */
  constructor() {
    super().loadImages(this.IMAGES_LIFE);
    this.x = 50;
    this.y = 0;
    this.width = 200;
    this.height = 60;

    this.setPercentage(100);
  }

  /**
   * Sets the percentage of health and updates the status bar image.
   * @param {number} percentage - The percentage of health.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_LIFE[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image in IMAGES_LIFE array based on the percentage of health.
   * @returns {number} The index of the image.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
