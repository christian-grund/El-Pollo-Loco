class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  world;
  energy = 100;
  endbossIsDead = false;
  endbossIsHurt = false;
  firstContact = false;
  offset = {
    top: 90,
    left: 10,
    bottom: 100,
    right: 10,
  };
  endboss_attak = new Audio('audio/endboss_attak.mp3');
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
    this.x = 4000;
    this.speed = 5;

    this.animate();
  }

  animate() {
    this.endbossAnimation = setInterval(() => {
      if (world.character.x < 2200) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (world.character.x >= 500) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (world.character.x > 650) {
        this.playAnimation(this.IMAGES_WALKING);
        this.firstContact = true;
        this.moveLeft();
      } else if (this.endbossIsHit()) {
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 500);
  }

  endbossIsHit() {
    this.energy -= 100;
    console.log('Endboss Energy', this.energy);
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
      if (!mute) {
        this.endboss_defeated.play();
        setTimeout(() => this.game_won.play(), 2000);
      }
      clearInterval(this.endbossAnimation);
      setInterval(() => this.playAnimation(this.IMAGES_DEAD), 250);
      setTimeout(() => world.level.endboss.splice(0, 1), 2000);
      setTimeout(() => gameOver(), 8000);
    }
  }
}
