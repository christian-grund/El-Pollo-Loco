/**
 * Represents the character in the game.
 */
class Character extends MovableObject {
  height = 250;
  y = 180;
  speed = 10;
  idleCounter = 0;
  IDLE_LIMIT = 10000;
  world;
  offset = {
    top: 100,
    left: 20,
    bottom: 50,
    right: 35,
  };

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_LONG_IDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];

  IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png', 'img/2_character_pepe/4_hurt/H-42.png', 'img/2_character_pepe/4_hurt/H-43.png'];

  /**
   * Constructs a new Character object.
   */
  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  /**
   * Initiates animations for the character.
   */
  animate() {
    setInterval(() => this.moveCharacter(), 1000 / 60);
    setInterval(() => this.playAnimationsCharacter(), 150);
  }

  /**
   * Moves the character based on keyboard inputs.
   */
  moveCharacter() {
    if (this.canJump()) this.jump();
    if (this.stopIdleCounter) this.restartIdleCounter();
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    else this.idleCounter += 1000 / 60;
    pauseWalkingSound();
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Checks if the character can jump.
   * @returns {boolean} True if the character can jump, otherwise false.
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround() && this.energy >= 1;
  }

  /**
   * Initiates a jump action for the character.
   */
  jump() {
    super.jump();
    playJumpingSound();
  }

  /**
   * Checks if the idle counter should stop.
   * @returns {boolean} True if the idle counter should stop, otherwise false.
   */
  stopIdleCounter() {
    return this.world.keyboard.LEFT || this.world.keyboard.RIGHT || this.world.keyboard.SPACE || this.world.keyboard.D;
  }

  /**
   * Restarts the idle counter if it exceeds the idle limit.
   */
  restartIdleCounter() {
    if (this.idleCounter > this.IDLE_LIMIT) {
      this.idleCounter = 0;
    }
  }

  /**
   * Checks if the character can move to the right.
   * @returns {boolean} True if the character can move right, otherwise false.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.energy >= 1;
  }

  /**
   * Moves the character to the right.
   */
  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    playWalkingSound();
  }

  /**
   * Checks if the character can move to the left.
   * @returns {boolean} True if the character can move left, otherwise false.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0 && this.energy >= 1;
  }

  /**
   * Moves the character to the left.
   */
  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    playWalkingSound();
  }

  /**
   * Plays animations for the character.
   */
  playAnimationsCharacter() {
    if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
    else if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
    else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
    else if (this.overIdleLimit()) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
      playSnoringSound();
    } else if (this.canMoveLeftOrRight()) this.playAnimation(this.IMAGES_WALKING);
    else this.playAnimation(this.IMAGES_IDLE);
    if (this.belowIdleLimit()) pauseSnoringSound();
  }

  /**
   * Checks if the idle counter exceeds the idle limit.
   * @returns {boolean} True if the idle counter exceeds the idle limit, otherwise false.
   */
  overIdleLimit() {
    return this.idleCounter > this.IDLE_LIMIT;
  }

  /**
   * Checks if the idle counter is below the idle limit.
   * @returns {boolean} True if the idle counter is below the idle limit, otherwise false.
   */
  belowIdleLimit() {
    return this.idleCounter < this.IDLE_LIMIT;
  }

  /**
   * Checks if the character can move left or right.
   * @returns {boolean} True if the character can move left or right, otherwise false.
   */
  canMoveLeftOrRight() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }
}
