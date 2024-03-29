class ChickenSmall extends MovableObject {
  y = 335;
  height = 80;
  width = 60;
  acceleration = 5;
  chickenIsDead = false;
  isJumping = false;
  // speedY = 25;
  world;
  offset = {
    top: -30,
    right: 0,
    bottom: -30,
    left: 0,
  };

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.ground = 335;
    this.x = 1000 + Math.random() * 5000;
    this.speed = 2 + Math.random() * 1;
    this.applyGravity();

    this.animate();
    this.animateDeadChicken();
  }

  calculateInterval = () => {
    return 1500 + Math.random() * 1000;
  };

  animate() {
    this.moveLeftInterval = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    this.walkAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);

    this.jumpInterval = setInterval(() => {
      let jumpHeight = 15 + Math.random() * 15;
      if (!this.chickenIsDead) {
        this.speedY = jumpHeight;
        this.y -= 1;
      }
    }, this.calculateInterval());
  }

  moveLeftFunction() {
    super.moveLeft();
  }

  animateDeadChicken() {
    if (this.chickenIsDead) {
      this.loadImage(this.IMAGE_DEAD);
      this.removeDeadChickenInterval();
      return this.y < 1000;
    }
  }

  playChickenSound() {
    if (!mute) {
      playSmallChickenDefeatedSound();
    }
  }

  removeDeadChickenInterval() {
    clearInterval(this.moveLeftInterval);
    clearInterval(this.walkAnimationInterval);
    clearInterval(this.animate);
  }
}
