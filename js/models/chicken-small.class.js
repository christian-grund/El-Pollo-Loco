class ChickenSmall extends MovableObject {
  y = 335;
  height = 80;
  width = 60;
  chickenIsDead = false;
  jumpInterval = null;
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
    this.speed = 0.1 + Math.random() * 0.2;
    this.animate();
    this.animateDeadChicken();
  }

  animate() {
    setStoppableInterval(this.moveLeft(), 1000 / 60);
    // this.moveLeftInterval = setInterval(() => {
    //     this.moveLeft();
    // }, 1000 / 60);

    this.walkAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);

    // if (!this.jumpInterval) {
    //   this.jumpInterval = setInterval(() => {
    //     this.chickenSmallJump();
    //   }, 2000);
    // }
  }

  chickenSmallJump() {
    this.speedY = 15;
    this.applyGravity();

    // Prüfen, ob das Huhn den Boden erreicht hat und das Intervall beenden
    if (this.y <= 335) {
      clearInterval(this.jumpInterval);
      this.jumpInterval = null; // Intervall beendet, setzen Sie die Flagge zurück
      this.animate();
    }

    console.log('this.y:', this.y);
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
