class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  levelEnd = false;
  isRunIntervalPaused = false;
  throwNewBottleAllowedCheck = true;
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];
  bottleAmount = 0;
  coinAmount = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.paused = false;
    this.run();
    this.world = this;
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.runInterval = setInterval(() => {
      if (!this.isRunIntervalPaused) {
        this.checkEnemyCollisions();
        this.checkCollection();
        this.jumpOnChicken();
        this.checkThrowColissions();
        this.checkTradeCoinsToRefillBottles();
      }
    }, 100);
    this.throwInterval = setInterval(() => {
      this.checkThrowObjects();
    }, 100);
    // this.backgroundMusicInterval = setInterval(() => {
    //   playGameSound();
    // }, interval);
  }

  pauseRunInterval() {
    console.log('pauseRunInterval');
    this.isRunIntervalPaused = true;
  }

  resumeRunInterval() {
    this.isRunIntervalPaused = false;
  }

  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.characterCollidingWithEnemy(enemy)) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
    this.level.endboss.forEach((endboss) => {
      if (this.characterCollidingWithEndboss(endboss)) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  characterCollidingWithEnemy(enemy) {
    return (
      this.character.isColliding(enemy) && !enemy.chickenIsDead && ((!this.character.isAboveGround() && this.character.energy >= 0) || this.character.isJumpingUp() || !this.character.isWalking())
    );
  }

  characterCollidingWithEndboss(endboss) {
    return this.character.isColliding(endboss) && !endboss.endbossIsDead;
  }

  jumpOnChicken() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && this.character.isJumpingDown() && !this.character.isHurt() && !enemy.chickenIsDead) {
        this.killChicken(enemy);
        setTimeout(() => this.character.jump(), 100);
        this.removeDeadChicken(enemy);
      } else if (this.character.y >= 180) {
        this.character.speedY = 0;
        this.character.y = 180;
      }
    });
  }

  killChicken(enemy) {
    enemy.chickenIsDead = true;
    enemy.animateDeadChicken();
    enemy.playChickenSound();
  }

  removeDeadChicken(enemy) {
    setTimeout(() => {
      const index = this.world.level.enemies.indexOf(enemy);

      if (index > -1) {
        this.world.level.enemies.splice(index, 1);
      }
    }, 3000);
  }

  isDead() {
    return this.energy == 0;
  }

  checkCollection() {
    this.level.collectableObjects.forEach((object, index) => {
      if (this.collectingBottle(object)) {
        if (this.character.isColliding(object, index)) {
          this.bottleAmount++;
          this.removeCollectedObject(index);
          this.statusBarBottle.bottleCollected();
          if (!mute) {
            playBottleCollectSound();
          }
        }
      } else {
        if (this.collectingCoin(object)) {
          if (this.character.isColliding(object, index)) {
            this.coinAmount++;
            this.removeCollectedObject(index);
            this.statusBarCoin.coinCollected();
            if (!mute) {
              playCoinCollectSound();
            }
          }
        }
      }
    });
  }

  collectingBottle(collectableObject) {
    return collectableObject instanceof Bottle;
  }

  collectingCoin(collectableObject) {
    return collectableObject instanceof Coin;
  }

  removeCollectedObject(index) {
    this.level.collectableObjects.splice(index, 1);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.bottleAmount > 0 && this.throwNewBottleAllowedCheck && this.character.energy >= 1) {
      let bottleIndex;
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, bottleIndex);
      bottle.throw(this.character.otherDirection);
      this.throwableObjects.push(bottle);
      this.statusBarBottle.bottleThrown();
      this.bottleAmount--;
      this.throwNewBottleAllowedCheck = false;
    }
  }

  checkThrowColissions() {
    this.throwableObjects.forEach((ThrowableObject, index) => {
      this.throwNewBottleAllowedCheck = false;

      if (!ThrowableObject.isAboveGround()) {
        ThrowableObject.splashingBottle();
        this.removeThrownBottle(ThrowableObject);
        this.throwNewBottleAllowedCheck = true;
      }

      this.level.enemies.forEach((enemy) => {
        if (enemy.isColliding(ThrowableObject)) {
          ThrowableObject.splashingBottle(ThrowableObject);
          enemy.animateDeadChicken();
          this.killChicken(enemy);
          this.removeDeadChicken(enemy);
          this.pauseRunInterval();
          setTimeout(() => this.resumeRunInterval(), 100);

          this.throwNewBottleAllowedCheck = true;
        }
      });

      this.level.endboss.forEach((endboss) => {
        if (endboss.isColliding(ThrowableObject)) {
          ThrowableObject.splashingBottle();
          this.removeThrownBottle(ThrowableObject);
          endboss.endbossIsHit();
          ThrowableObject.speedY = 0;
          ThrowableObject.speedX = 0;
          setTimeout(() => (this.throwNewBottleAllowedCheck = true), 1000);
        }
      });
    });
  }

  removeThrownBottle(ThrowableObject) {
    setTimeout(() => {
      let index = this.throwableObjects.indexOf(ThrowableObject);
      if (index !== -1) {
        this.throwableObjects.splice(index, 1);
      }
    }, 250);
  }

  checkTradeCoinsToRefillBottles() {
    if (this.coinAmount == 10) {
      if (this.keyboard.R) {
        this.coinAmount = 0;

        this.bottleAmount = 5;
        this.statusBarBottle.tradedCoinsToRefillBottles();
        this.statusBarCoin.tradedCoinsToRefillBottles();
        playBottleRefillSound();
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addMovableObjectsToMap();
    this.ctx.translate(-this.camera_x, 0); // Back
    // - - - - - Space for fixed Objects - - - - -
    this.addFixedObjectsToMap();
    this.ctx.translate(this.camera_x, 0); // Forward
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    if (this.coinAmount == 10 && !this.keyboard.R) {
      this.ctx.fillStyle = 'white';
      this.ctx.font = '18px mayan';
      this.ctx.fillText('Press R to refill bottles!', 260, 87);
    }

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addFixedObjectsToMap() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);

    if (this.statusBarEndboss.visible) {
      this.addToMap(this.statusBarEndboss);
    }
  }

  addMovableObjectsToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.collectableObjects);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
