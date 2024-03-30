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

  animate() {
    this.endbossAlertAnimation = setInterval(() => {
      if (world.character.x < 4800) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (world.character.x > 4800) {
        this.hadFirstContact = true;
        pauseGameSound();
        playEndbossAttakSound();
        setTimeout(() => {
          pauseEndbossAttakSound();
        }, 3000);
      }
    }, 200);

    this.endbossAnimation = setInterval(() => {
      if (this.hadFirstContact) {
        clearInterval(this.endbossAlertAnimation);
        playEndbossFightSound();
        if (this.endbossIsHurt) {
          this.playAnimation(this.IMAGES_HURT);
          this.speed = 0;
          setTimeout(() => (this.speed = 50), 1000);
          return;
        }
        if (world.level.endboss[0].x - world.character.x <= 500 && world.level.endboss[0].x - world.character.x > 250) {
          this.moveLeft();
          this.playAnimation(this.IMAGES_WALKING);
        } else if (world.character.x - world.level.endboss[0].x <= 800 && world.character.x - world.level.endboss[0].x >= 450) {
          this.moveRight();
          this.playAnimation(this.IMAGES_WALKING);
        } else if (world.level.endboss[0].x - world.character.x <= 250 && world.level.endboss[0].x - world.character.x >= 0) {
          this.moveLeft();
          this.playAnimation(this.IMAGES_ATTAK);
        } else if (world.character.x - world.level.endboss[0].x <= 450 && world.character.x - world.level.endboss[0].x >= 0) {
          this.moveRight();
          this.playAnimation(this.IMAGES_ATTAK);
        }
      }
    }, 200);
  }

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

  setStatusBarEndboss() {
    world.statusBarEndboss.setPercentage(this.energy);
  }

  endbossIsKilled() {
    if (this.endbossDead) {
      clearInterval(world.runInterval);
      clearInterval(this.endbossAnimation);
      pauseEndbossFightSound();
      playEndbossDefeatedSound();
      setTimeout(() => playGameWonSound(), 2000);
      this.endbossDeadAnimation = setInterval(() => this.playAnimation(this.IMAGES_DEAD), 150);
      setTimeout(() => clearInterval(this.endbossDeadAnimation), 4000);
      setTimeout(() => world.level.endboss.splice(0, 1), 4000);
      setTimeout(() => gameOver(), 8000);
    }
  }

  stopEndbossAnimation() {
    clearInterval(this.endbossAnimation);
  }
}
