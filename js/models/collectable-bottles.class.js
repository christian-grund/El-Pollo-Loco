class CollectableBottles extends DrawableObject {
  BOTTLE_LEFT = 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png';
  BOTTLE_RIGHT = 'img/6_salsa_bottle/w_salsa_bottle_on_ground.png';
  offset = {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15,
  };
  constructor() {
    super().loadImage(this.BOTTLE_LEFT);
    this.x = 500;
    this.y = 340;
    this.height = 100;
    this.width = 60;
  }
}

//   IMAGES_COIN = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];
// this.loadImage(this.BOTTLE_RIGHT);
// this.loadImages(this.IMAGES_COIN);
