/**
 * Represents the endboss of the game.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  world;
  energy = 100;
  endbossIsHurt = false;
  endbossIsDead = false;
  hadFirstContact = false;
  offset = {
    top: 90,
    left: 10,
    bottom: 100,
    right: 10,
  };

  IMAGES_WALKING = ['img/4_enemie_boss_chicken/1_walk/G1.png', 'img/4_enemie_boss_chicken/1_walk/G2.png', 'img/4_enemie_boss_chicken/1_walk/G3.png', 'img/4_enemie_boss_chicken/1_walk/G4.png'];

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  IMAGES_ATTAK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  IMAGES_HURT = ['img/4_enemie_boss_chicken/4_hurt/G21.png', 'img/4_enemie_boss_chicken/4_hurt/G22.png', 'img/4_enemie_boss_chicken/4_hurt/G23.png'];
  IMAGES_DEAD = ['img/4_enemie_boss_chicken/5_dead/G24.png', 'img/4_enemie_boss_chicken/5_dead/G25.png', 'img/4_enemie_boss_chicken/5_dead/G26.png'];

  /**
   * Constructs a new Endboss object.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTAK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 5250;
    this.speed = 50;
    this.animate();
  }

  /**
   * Initiates the animation of the end boss.
   */
  animate() {
    this.endbossAlertAnimation = setInterval(() => this.endbossAlertInterval(), 200);
    this.endbossAnimation = setInterval(() => this.endbossAnimationInterval(), 200);
  }

  /**
   * Handles the end boss alert animation interval.
   */
  endbossAlertInterval() {
    if (this.isBelowAlertPointX()) this.playAnimation(this.IMAGES_ALERT);
    else if (this.isOverAlertPointX()) this.happensOverAlertPointX();
  }

  /**
   * Checks if the character is below the alert point X.
   * @returns {boolean} True if character is below alert point X, otherwise false.
   */
  isBelowAlertPointX() {
    return world.character.x < 4800;
  }

  /**
   * Checks if the character is over the alert point X.
   * @returns {boolean} True if character is over alert point X, otherwise false.
   */
  isOverAlertPointX() {
    return world.character.x > 4800;
  }

  /**
   * Handles the situation when character is over the alert point X.
   */
  happensOverAlertPointX() {
    this.hadFirstContact = true;
    pauseGameSound();
    playEndbossAttakSound();
    setTimeout(() => {
      pauseEndbossAttakSound();
    }, 3000);
  }

  /**
   * Handles the end boss animation interval.
   */
  endbossAnimationInterval() {
    if (this.hadFirstContact) {
      clearInterval(this.endbossAlertAnimation);
      this.endbossFightSound();
      if (this.endbossIsHurt) this.endbossIsHurtAnimation();
      if (this.isLeftAndFar()) this.alertAnimation();
      if (this.isRightAndFar()) this.alertAnimation();
      if (this.isLeftAndNear()) this.moveLeftAndWalk();
      else if (this.isRightAndNear()) this.moveRightAndWalk();
      else if (this.isLeftAndClose()) this.moveLeftAndAttak();
      else if (this.isRightAndClose()) this.moveRightAndAttak();
    }
  }

  /**
   * Plays the end boss fight sound if the character's energy is more than zero.
   * Otherwise, pauses the end boss fight sound.
   */
  endbossFightSound() {
    if (world.character.energy > 0) {
      playEndbossFightSound();
    } else {
      pauseEndbossFightSound();
    }
  }
  /**
   * Plays the hurt animation of the end boss.
   */
  endbossIsHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.speed = 0;
    setTimeout(() => (this.speed = 50), 1000);
    return;
  }

  /**
   * Checks if the end boss is far to the left of the character.
   * @returns {boolean} True if the end boss is far to the left of the character, otherwise false.
   */
  isLeftAndFar() {
    return world.level.endboss[0].x - world.character.x > 500;
  }

  /**
   * Checks if the end boss is far to the right of the character.
   * @returns {boolean} True if the end boss is far to the right of the character, otherwise false.
   */
  isRightAndFar() {
    return world.character.x - world.level.endboss[0].x > 800;
  }

  /**
   * Plays the alert animation of the end boss.
   */
  alertAnimation() {
    this.playAnimation(this.IMAGES_ALERT);
  }

  /**
   * Checks if the end boss is near to the left of the character.
   * @returns {boolean} True if the end boss is near to the left of the character, otherwise false.
   */
  isLeftAndNear() {
    return world.level.endboss[0].x - world.character.x <= 500 && world.level.endboss[0].x - world.character.x > 250;
  }

  /**
   * Moves the end boss to the left and initiates walking animation.
   */
  moveLeftAndWalk() {
    this.moveLeft();
    this.otherDirection = false;
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Checks if the end boss is near to the right of the character.
   * @returns {boolean} True if the end boss is near to the right of the character, otherwise false.
   */
  isRightAndNear() {
    return world.character.x - world.level.endboss[0].x <= 800 && world.character.x - world.level.endboss[0].x >= 450;
  }

  /**
   * Moves the end boss to the right and initiates walking animation.
   */
  moveRightAndWalk() {
    this.moveRight();
    this.otherDirection = true;
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Checks if the end boss is close to the left of the character.
   * @returns {boolean} True if the end boss is close to the left of the character, otherwise false.
   */
  isLeftAndClose() {
    return world.level.endboss[0].x - world.character.x <= 250 && world.level.endboss[0].x - world.character.x >= 0;
  }

  /**
   * Moves the end boss to the left and initiates attack animation.
   */
  moveLeftAndAttak() {
    this.moveLeft();
    this.otherDirection = false;
    this.playAnimation(this.IMAGES_ATTAK);
  }

  /**
   * Checks if the end boss is close to the right of the character.
   * @returns {boolean} True if the end boss is close to the right of the character, otherwise false.
   */
  isRightAndClose() {
    return world.character.x - world.level.endboss[0].x <= 450 && world.character.x - world.level.endboss[0].x >= 0;
  }

  /**
   * Moves the end boss to the right and initiates attack animation.
   */
  moveRightAndAttak() {
    this.moveRight();
    this.otherDirection = true;
    this.playAnimation(this.IMAGES_ATTAK);
  }

  /**
   * Handles the event when the end boss is hit.
   */
  endbossIsHit() {
    this.energy -= 7.5;
    playEndbossHurtSound();
    this.endbossIsHurt = true;
    setTimeout(() => (this.endbossIsHurt = false), 1000);

    if (this.energy <= 0) {
      this.energy = 0;
      this.endbossDead = true;
      this.endbossIsKilled();
    }
    this.setStatusBarEndboss();
  }

  /**
   * Updates the status bar for the end boss.
   */
  setStatusBarEndboss() {
    world.statusBarEndboss.setPercentage(this.energy);
  }

  /**
   * Handles the event when the end boss is killed.
   */
  endbossIsKilled() {
    if (this.endbossDead) {
      clearInterval(this.endbossAnimation);
      clearInterval(this.endbossAlertAnimation);
      pauseEndbossFightSound();
      pauseSnoringSound();
      playEndbossDefeatedSound();
      pauseHurtSound();
      setTimeout(() => playGameWonSound(), 2000);
      this.endbossDeadAnimation = setInterval(() => this.playAnimation(this.IMAGES_DEAD), 150);
      setTimeout(() => clearInterval(this.endbossDeadAnimation), 4000);
      setTimeout(() => world.level.endboss.splice(0, 1), 4000);
      setTimeout(() => gameOver(), 8000);
    }
  }
}
