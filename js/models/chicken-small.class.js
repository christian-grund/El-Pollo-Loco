class ChickenSmall extends MovableObject {
  y = 335;
  height = 80;
  width = 60;
  chickenIsDead = false;
  // speedY = 15;
  world;
  offset = {
    top: -30,
    right: -25,
    bottom: -30,
    left: -15,
  };
  chick_defeated = new Audio('audio/chick.mp3');

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);

    // this.x = -1000 + Math.random() * 500;
    // this.x = 400 + Math.random() * 2500;
    this.x = 400 + Math.random() * 100;
    this.speed = 0.11 + Math.random() * 0.1;
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

    setInterval(() => {
      this.chickenSmallJump();
    }, 1000);
  }

  chickenSmallJump() {
    this.speedY = 15;
    console.log('this.speedY:', this.speedY);
    console.log('this.y:', this.y);
    // this.applyGravity();
    // if (this.y <= 335) {
    //   this.applyGravity();
    // }
  }

  animateDeadChicken() {
    if (this.chickenIsDead) {
      this.loadImage(this.IMAGE_DEAD);
      this.removeDeadChickenInterval();
    }
  }

  playChickenSound() {
    if (!mute) {
      this.chick_defeated.play();
    }
  }

  removeDeadChickenInterval() {
    clearInterval(this.moveLeftInterval);
    clearInterval(this.walkAnimationInterval);
  }
}
