class ChickenSmall extends MovableObject {
  y = 340;
  height = 80;
  width = 60;
  chickenIsDead = false;
  speedY = 15;
  world;
  offset = {
    top: -15,
    right: 0,
    bottom: -15,
    left: 0,
  };

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);

    this.x = -1000 + Math.random() * 500;
    // this.x = 400 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
    this.animateDeadChicken();
  }

  animate() {
    // setInterval(() => {
    //   this.moveLeft();
    // }, 1000 / 60);

    // setInterval(() => {
    //   this.playAnimation(this.IMAGES_WALKING);

    // }, 200);

    setInterval(() => {
      // this.chickenSmallJump();
      this.speedY = 15;
      this.applyGravity();
    }, 1000);
  }

  chickenSmallJump() {
    this.speedY = 15;
    this.applyGravity();
  }

  animateDeadChicken() {
    if (this.chickenIsDead) {
      this.loadImage(this.IMAGE_DEAD);
      this.removeDeadChickenInterval();
    }
  }

  removeDeadChickenInterval() {
    clearInterval(this.moveLeftInterval);
    clearInterval(this.walkAnimationInterval);
  }
}
