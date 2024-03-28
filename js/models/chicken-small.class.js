class ChickenSmall extends MovableObject {
  y = 335;
  height = 80;
  width = 60;
  acceleration = 4;
  chickenIsDead = false;
  jumpInterval = null;
  // speedY = 15;
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
    this.y = 335;
    this.ground = 335;
    // this.acceleration = 4;
    // this.x = -1000 + Math.random() * 500;
    // this.x = 500 + Math.random() * 3000;
    this.x = 700 + Math.random() * 100;
    this.speed = 1 + Math.random() * 1;
    this.applyGravity();

    this.animate();
    this.animateDeadChicken();
  }

  calculateInterval = () => {
    return 1000 + Math.random() * 1000;
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
      // let interval = this.calculateInterval();
      if (!this.chickenIsDead) {
        this.speedY = jumpHeight;
        this.y -= 1;
      }
    }, this.calculateInterval());
  }

  moveLeftFunction() {
    super.moveLeft();
  }

  // chickenSmallJump() {
  //   this.speedY = 15;
  //   this.applyGravity();

  //   // Prüfen, ob das Huhn den Boden erreicht hat und das Intervall beenden
  //   if (this.y <= 335) {
  //     clearInterval(this.jumpInterval);
  //     this.jumpInterval = null; // Intervall beendet, setzen Sie die Flagge zurück
  //     this.animate();
  //   }

  //   console.log('this.y:', this.y);
  // }

  // chickenSmallJump() {
  //   this.speedY = 20;
  //   if (this.speedY > 0) {
  //     this.y -= this.speedY;
  //     this.speedY -= this.acceleration;
  //     console.log(this.y);
  //     console.log(this.speedY);
  //   }

  //   if (this.y <= 335) {
  //     clearInterval(this.jumpInterval);
  //     this.jumpInterval = null;
  //     this.animate();
  //   }
  // }

  animateDeadChicken() {
    if (this.chickenIsDead) {
      this.loadImage(this.IMAGE_DEAD);
      this.removeDeadChickenInterval();
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
  }
}
