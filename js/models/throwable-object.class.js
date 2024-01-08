class ThrowableObject extends MovableObject {
  direction;
  break = false;
  world;
  speedX = 25;

  IMAGES_BOTTLE_ROTATION = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  IMAGES_BOTTLE_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.flyingBottle();
    }, 150);
    setInterval(() => {
      this.splashingBottle();
    }, 300);
  }

  flyingBottle() {
    if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
    }
  }

  splashingBottle() {
    if (!this.isAboveGround()) {
      //   this.x += 0;
      this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    }
  }

  throw(otherDirection) {
    this.speedY = 30;
    this.applyGravity();

    setInterval(() => {
      if (this.isAboveGround()) {
        if (otherDirection) {
          this.x -= this.speedX;
        } else {
          this.x += this.speedX;
        }
      }
    }, 75);
  }
}
