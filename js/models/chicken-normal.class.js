class ChickenNormal extends MovableObject {
  y = 340;
  height = 80;
  width = 60;
  isDead = false;

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImage(this.IMAGE_DEAD);
    this.loadImages(this.IMAGES_WALKING);

    this.x = 750;
    // this.x = 200 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.5;
    this.enemyEnergy = 100;
    this.animate();
  }

  animate() {
    // setInterval(() => {
    //   this.moveLeft();
    // }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
