class StatusBarEndboss extends DrawableObject {
  IMAGES_LIFE_ENDBOSS = [
    'img/7_statusbars/2_statusbar_endboss/green/green0.png',
    'img/7_statusbars/2_statusbar_endboss/green/green20.png',
    'img/7_statusbars/2_statusbar_endboss/green/green40.png',
    'img/7_statusbars/2_statusbar_endboss/green/green60.png',
    'img/7_statusbars/2_statusbar_endboss/green/green80.png',
    'img/7_statusbars/2_statusbar_endboss/green/green100.png',
  ];

  percentage = 100;

  constructor() {
    super().loadImages(this.IMAGES_LIFE_ENDBOSS);
    this.x = 500;
    this.y = 7;
    this.width = 200;
    this.height = 60;

    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage; // 0 ... 5;
    let path = this.IMAGES_LIFE_ENDBOSS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

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