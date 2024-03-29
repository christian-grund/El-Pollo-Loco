/**
 * Represents a status bar for coins.
 * @extends DrawableObject
 */
class StatusBarCoin extends DrawableObject {
  IMAGES_COIN = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
  ];

  percentageCoins = 0;

  /**
   * Constructs a new StatusBarCoin object.
   */
  constructor() {
    super().loadImages(this.IMAGES_COIN);
    this.x = 50;
    this.y = 40;
    this.width = 200;
    this.height = 60;

    this.setPercentageCoins();
  }

  /**
   * Sets the image of the coin status bar based on the percentage of collected coins.
   */
  setPercentageCoins() {
    let path = this.IMAGES_COIN[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image in IMAGES_COIN array based on the percentage of collected coins.
   * @returns {number} The index of the image.
   */
  resolveImageIndex() {
    if (this.percentageCoins == 100) {
      return 5;
    } else if (this.percentageCoins >= 80) {
      return 4;
    } else if (this.percentageCoins >= 60) {
      return 3;
    } else if (this.percentageCoins >= 40) {
      return 2;
    } else if (this.percentageCoins >= 20) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Increases the percentage of collected coins and updates the coin status bar image.
   */
  coinCollected() {
    this.percentageCoins += 10;
    if (this.percentageCoins > 100) {
      this.percentageCoins = 100;
    }

    this.setPercentageCoins();
  }

  /**
   * Resets the percentage of collected coins to 0 and updates the coin status bar image.
   */
  tradedCoinsToRefillBottles() {
    this.percentageCoins = 0;
    this.setPercentageCoins();
  }
}
