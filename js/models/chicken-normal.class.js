/**
 * Represents a normal-sized chicken enemy.
 * @extends MovableObject
 */
class ChickenNormal extends MovableObject {
  y = 345;
  height = 80;
  width = 60;
  chickenIsDead = false;
  world;
  offset = {
    top: -30,
    right: 0,
    bottom: -30,
    left: 0,
  };

  IMAGES_WALKING = ['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png', 'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png', 'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'];
  IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

  /**
   * Constructs a new ChickenNormal object.
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.ground = 345;
    this.x = 1000 + Math.random() * 6000;
    this.speed = 2.5 + Math.random() * 2.5;
    this.animate();
    this.animateDeadChicken();
  }

  /**
   * Initiates various animations for the chicken.
   */
  animate() {
    this.moveLeftInterval = setInterval(() => this.moveLeft(), 1000 / 60);
    this.walkAnimationInterval = setInterval(() => this.playAnimation(this.IMAGES_WALKING), 200);
  }

  /**
   * Animates the dead chicken.
   */
  animateDeadChicken() {
    if (this.chickenIsDead) {
      this.loadImage(this.IMAGE_DEAD);
      this.removeDeadChickenInterval();
    }
  }

  /**
   * Plays the sound for defeated chicken.
   */
  playChickenSound() {
    if (!mute) {
      playNormalChickenDefeatedSound();
    }
  }

  /**
   * Removes intervals associated with dead chicken animation.
   */
  removeDeadChickenInterval() {
    clearInterval(this.moveLeftInterval);
    clearInterval(this.walkAnimationInterval);
  }
}
