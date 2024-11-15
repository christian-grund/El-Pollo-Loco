/**
 * Represents a status bar for bottles.
 * @extends DrawableObject
 */
class StatusBarBottle extends DrawableObject {
  IMAGES_BOTTLE = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
  ];

  percentageBottles = 0;

  /**
   * Constructs a new status bar for bottles with default attributes and loads initial image
   */
  constructor() {
    super().loadImages(this.IMAGES_BOTTLE);
    this.x = 50;
    this.y = 100;
    this.width = 200;
    this.height = 60;

    this.setPercentageBottles();
  }

  /**
   * Sets the image of the bottle status bar based on the percentage of collected bottles.
   */
  setPercentageBottles() {
    let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves number of image in IMAGES_BOTTLE array dependent on the percentage of collected bottles
   * * @returns {number} The index of the image.
   */
  resolveImageIndex() {
    if (this.percentageBottles == 100) {
      return 5;
    } else if (this.percentageBottles >= 80) {
      return 4;
    } else if (this.percentageBottles >= 60) {
      return 3;
    } else if (this.percentageBottles >= 40) {
      return 2;
    } else if (this.percentageBottles >= 20) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Increments the percentage of collected bottles when a bottle is collected.
   */
  bottleCollected() {
    this.percentageBottles += 20;
    if (this.percentageBottles > 100) {
      this.percentageBottles = 100;
    }
    this.setPercentageBottles();
  }

  /**
   * Decrements the percentage of collected bottles when a bottle is thrown.
   */
  bottleThrown() {
    this.percentageBottles -= 20;
    if (this.percentageBottles < 0) {
      this.percentageBottles = 0;
    }
    this.setPercentageBottles();
  }

  /**
   * Sets the percentage of collected bottles to 100% when coins are traded to refill bottles.
   */
  tradedCoinsToRefillBottles() {
    this.percentageBottles = 100;
    this.setPercentageBottles();
  }
}
