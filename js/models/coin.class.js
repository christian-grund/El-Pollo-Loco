class Coin extends CollectableObject {
  IMAGES_COINS = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

  offset = {
    top: 50,
    left: 40,
    bottom: 100,
    right: 40,
  };

  constructor() {
    super().loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_COINS);
    this.x = 500 + Math.random() * 3000;
    this.y = 125 + Math.random() * 75;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 400);
  }
}
