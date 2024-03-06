class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  world;
  energy = 100;

  endbossIsHurt = false;
  endbossIsDead = false;
  firstContact = false;
  offset = {
    top: 90,
    left: 10,
    bottom: 100,
    right: 10,
  };
  endboss_attak = new Audio('audio/endboss_attak.mp3');
  endboss_hurt = new Audio('audio/endboss_hurt.mp3');
  endboss_defeated = new Audio('audio/endboss_defeated.mp3');
  game_won = new Audio('audio/game_won.mp3');

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

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

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTAK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    // this.x = 4000;
    this.x = 1500;
    this.speed = 20;

    this.animate();
  }

  animate() {
    this.endbossAnimation = setInterval(() => {
      // if (world.character.x < 1100) {
      //   this.playAnimation(this.IMAGES_ALERT);
      // } else

      if (world.character.x > 1100) {
        this.firstContact = true;
      }
      if (this.firstContact) {
        if (world.level.endboss[0].x - world.character.x <= 600 && world.level.endboss[0].x - world.character.x > 300) {
          console.log('left', world.level.endboss[0].x - world.character.x);
          this.moveLeft();
          this.playAnimation(this.IMAGES_WALKING);
        } else if (
          world.character.x - world.level.endboss[0].x <= 800 &&
          world.character.x - world.level.endboss[0].x >= 450
        ) {
          console.log('right:', world.character.x - world.level.endboss[0].x);
          this.moveRight();
          this.playAnimation(this.IMAGES_WALKING);
        } else if (
          world.level.endboss[0].x - world.character.x <= 350 &&
          world.level.endboss[0].x - world.character.x >= 0
        ) {
          this.moveLeft();
          this.playAnimation(this.IMAGES_ATTAK);
        } else if (
          world.character.x - world.level.endboss[0].x <= 450 &&
          world.character.x - world.level.endboss[0].x >= 0
        ) {
          this.moveRight();
          this.playAnimation(this.IMAGES_ATTAK);
        } else if (this.endbossIsHurt) {
          this.playAnimation(this.IMAGES_HURT);
          this.speed = 0;
          setTimeout(() => (this.speed = 20), 1500);
        }
      }
    }, 200);
  }

  endbossIsHit() {
    this.energy -= 10;
    this.endboss_hurt.play();
    this.endbossIsHurt = true;
    setTimeout(() => (this.endbossIsHurt = false), 1500);

    console.log('endbossIsHurt:', this.endbossIsHurt);
    if (this.energy <= 0) {
      this.energy = 0;
      this.endbossDead = true;
      console.log('endbossDead:', this.endbossDead);
      this.endbossIsKilled();
    }
    this.setStatusBarEndboss();
  }

  setStatusBarEndboss() {
    world.statusBarEndboss.setPercentage(this.energy);
  }

  endbossIsKilled() {
    if (this.endbossDead) {
      if (!mute) {
        this.endboss_defeated.play();
        setTimeout(() => this.game_won.play(), 2000);
      }
      clearInterval(this.endbossAnimation);
      setInterval(() => this.playAnimation(this.IMAGES_DEAD), 200);
      setTimeout(() => world.level.endboss.splice(0, 1), 4000);
      setTimeout(() => gameOver(), 8000);
    }
  }
}
