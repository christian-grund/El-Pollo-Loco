/**
 * Represents a throwable object.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  direction;
  splash = false;
  bottleRefill = false;
  world;
  speedX = 25;
  world;

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

  /**
   * Constructs a new ThrowableObject object.
   * @param {number} x - The x coordinate of the throwable object.
   * @param {number} y - The y coordinate of the throwable object.
   */
  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.ground = 350;
    this.animate();
  }

  /**
   * Initiates the animation for the throwable object.
   */
  animate() {
    setInterval(() => {
      this.flyingBottle();
    }, 150);
  }

  /**
   * Animates the flying bottle.
   */
  flyingBottle() {
    if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
    }
  }

  /**
   * Animates the splashing bottle.
   */
  splashingBottle() {
    playBottleSplashSound();
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
  }

  /**
   * Throws the throwable object.
   * @param {boolean} otherDirection - Indicates whether to throw in the opposite direction.
   */
  throw(otherDirection) {
    this.speedY = 20;
    this.applyGravity();
    playThrowingSound();

    if (world) {
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
}
