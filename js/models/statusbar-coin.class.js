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
   * Constructs a new status bar for coins with default attributes and loads initial image
   */
  constructor() {
    super().loadImages(this.IMAGES_COIN);
    this.x = 50;
    this.y = 40;
    this.width = 200;
    this.height = 60;

    this.setPercentageCoins();
  }

  setPercentageCoins() {
    // this.percentage = percentage; // 0 ... 5;
    let path = this.IMAGES_COIN[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
  /**
   * Resolves number of image in IMAGES_BOTTLE array dependent on the percentage of collected coins
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
   * Increases the percentage of collected coins and updates the bottle status bar image
   */
  coinCollected() {
    this.percentageCoins += 10;
    if (this.percentageCoins > 100) {
      this.percentageCoins = 100;
    }

    this.setPercentageCoins();
  }

  tradedCoinsToRefillBottles() {
    this.percentageCoins = 0;
    this.setPercentageCoins();
  }
}
