class Statusbar extends DrawableObject {
  x = 50;
  y = 50;
  height = 25;
  width = 100;

  IMAGES_COIN = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
  ];

  percentage = 100;

  constructor() {
    super().loadImages(this.IMAGES_COIN);
  }

  // setPercentage(50);
  setPercentage() {
    this.percentage = this.percentage; // 0 ... 5;
    let path = this.IMAGES_COIN[this.resolveImageIndex()];
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

//   loadImage(path) {
//     this.img = new Image(); // document.getElementById('image') <img id="image">
//     this.img.src = path;
//   }

//   // arr = array
//   // @param (Array) arr = ['img/image1.png', 'img/image2.png']
//   loadImages(arr) {
//     arr.forEach((path) => {
//       let img = new Image();
//       img.src = path;
//       this.imageCache[path] = img; // spricht img im JSON Array an
//     });
//   }
