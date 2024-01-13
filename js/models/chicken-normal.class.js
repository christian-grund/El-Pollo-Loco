class ChickenNormal extends MovableObject {
  y = 340;
  height = 80;
  width = 60;
  chickenIsDead = false;
  world;
  offset = {
    top: -15,
    right: 0,
    bottom: -15,
    left: 0,
  };
  chicken_defeated = new Audio('audio/chicken.mp3');

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);

    // this.x = 750;
    this.x = 500 + Math.random() * 2500;
    this.speed = 0.15 + Math.random() * 0.5;
    this.enemyEnergy = 100;
    this.animate();
    this.animateDeadChicken();
  }

  animate() {
    this.moveLeftInterval = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    this.walkAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  animateDeadChicken() {
    if (this.chickenIsDead) {
      this.loadImage(this.IMAGE_DEAD);
      this.removeDeadChickenInterval();
    }
  }

  playChickenSound() {
    this.chicken_defeated.play();
  }

  removeDeadChickenInterval() {
    clearInterval(this.moveLeftInterval);
    clearInterval(this.walkAnimationInterval);
  }
}
