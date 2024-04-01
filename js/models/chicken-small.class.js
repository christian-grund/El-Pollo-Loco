/**
 * Represents a small chicken enemy.
 * @extends MovableObject
 */
class ChickenSmall extends MovableObject {
  y = 345;
  height = 80;
  width = 60;
  chickenIsDead = false;
  offset = {
    top: -30,
    right: 0,
    bottom: -30,
    left: 0,
  };

  IMAGES_WALKING = ['img/3_enemies_chicken/chicken_small/1_walk/1_w.png', 'img/3_enemies_chicken/chicken_small/1_walk/2_w.png', 'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'];
  IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

  /**
   * Constructs a new ChickenSmall object.
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.ground = 345;
    this.x = 1000 + Math.random() * 5000;
    this.speed = 2 + Math.random() * 1;
    this.applyGravity();
    this.animate();
    this.animateDeadChicken();
  }

  /**
   * Initiates various animations for the chicken.
   */
  animate() {
    this.moveLeftInterval = setInterval(() => this.moveLeft(), 1000 / 60);
    this.walkAnimationInterval = setInterval(() => this.playAnimation(this.IMAGES_WALKING), 200);
    this.jumpInterval = setInterval(() => this.jump(), this.calculateInterval());
  }

  /**
   * Performs a jump of the chicken character.
   */
  jump() {
    let jumpHeight = 15 + Math.random() * 12.5;
    if (!this.chickenIsDead) {
      this.speedY = jumpHeight;
      this.y -= 1;
    }
  }

  /**
   * Calculates the interval for chicken jump animation.
   * @returns {number} The interval for chicken jump animation.
   */
  calculateInterval() {
    return 1500 + Math.random() * 1000;
  }

  /**
   * Animates the dead chicken.
   */
  animateDeadChicken() {
    if (this.chickenIsDead) {
      this.loadImage(this.IMAGE_DEAD);
      this.removeDeadChickenInterval();
      return this.y < 1000;
    }
  }

  /**
   * Plays the sound for defeated chicken.
   */
  playChickenSound() {
    if (!mute) {
      playSmallChickenDefeatedSound();
    }
  }

  /**
   * Removes intervals associated with dead chicken animation.
   */
  removeDeadChickenInterval() {
    clearInterval(this.moveLeftInterval);
    clearInterval(this.walkAnimationInterval);
    clearInterval(this.animate);
  }
}
