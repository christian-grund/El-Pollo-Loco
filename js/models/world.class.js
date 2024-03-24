class World {
  character = new Character();
  level = level1;
  canvas;
  ctx; // Sammlung/Framework von JS, mit dem man auf Canvas Objekte hinzufügen/malen kann
  keyboard;
  camera_x = 0;
  levelEnd = false;
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];
  bottleAmount = 0;
  coinAmount = 0;
  coin_collect_sound = new Audio('audio/coin.mp3');
  bottle_collect_sound = new Audio('audio/bottle_collect.mp3');

  constructor(canvas, keyboard) {
    // following functions are executed repeatedly
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
      this.checkEnemyCollisions();
      this.checkCollection();
      this.checkThrowObjects();
      this.jumpOnChicken();
      // this.resetCharacterSpeedY();
      this.checkThrowColissions();
      this.checkTradeCoinsToRefillBottles();
      console.log('world.run');
    }, 100);
  }

  togglePause() {
    if (!this.paused) {
      clearInterval(this.runInterval);
      clearInterval(this.level.endboss.endbossAnimation);
      this.level.endboss.stopEndbossAnimation();
      this.paused = true;
    } else {
      this.run(); // Fortsetzen des Intervalls
      this.paused = false;
    }
  }

  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        !enemy.chickenIsDead &&
        (!this.character.isAboveGround() || this.character.isJumpingUp() || !this.character.isWalking())
      ) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss) && !endboss.endbossIsDead) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  jumpOnChicken() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.isJumpingDown() &&
        !this.character.isHurt() &&
        !enemy.chickenIsDead
      ) {
        this.killChicken(enemy);
        this.character.jump();
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
    this.deadChickenFallDown(enemy);
  }

  deadChickenFallDown(enemy) {
    setTimeout(() => enemy.applyGravity(), 1000);
  }

  removeDeadChicken(enemy) {
    const index = this.world.level.enemies.indexOf(enemy);

    if (index > -1) {
      setTimeout(() => this.world.level.enemies.splice(index, 1), 3000);
    }
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
            this.bottle_collect_sound.play();
          }
        }
      } else {
        if (this.collectingCoin(object)) {
          if (this.character.isColliding(object, index)) {
            this.coinAmount++;
            this.removeCollectedObject(index);
            this.statusBarCoin.coinCollected();
            if (!mute) {
              this.coin_collect_sound.play();
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
    if (this.keyboard.D && this.bottleAmount > 0) {
      let bottleIndex;
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, bottleIndex);
      bottle.throw(this.character.otherDirection);
      this.throwableObjects.push(bottle);
      this.statusBarBottle.bottleThrown();
      this.bottleAmount--;
    }
  }

  checkThrowColissions() {
    this.throwableObjects.forEach((ThrowableObject, index) => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.isColliding(ThrowableObject)) {
          ThrowableObject.splashingBottle(ThrowableObject);
          enemy.animateDeadChicken();
          setTimeout(() => {
            this.killChicken(enemy);
          }, 1000);
          this.removeDeadChicken(enemy);
        }
      });

      this.level.endboss.forEach((endboss) => {
        if (endboss.isColliding(ThrowableObject)) {
          ThrowableObject.splashingBottle();
          this.removeThrownBottle(index);
          endboss.endbossIsHit();
        }
      });

      if (!ThrowableObject.isAboveGround()) {
        ThrowableObject.splashingBottle();
        this.removeThrownBottle(index);
      }
    });
  }

  removeThrownBottle(index) {
    setTimeout(() => {
      this.throwableObjects.splice(index, 1);
    }, 1000);
  }

  checkTradeCoinsToRefillBottles() {
    if (this.coinAmount == 5) {
      if (this.keyboard.R) {
        this.coinAmount = 0;
        this.bottleAmount = 5;
        this.statusBarBottle.tradedCoinsToRefillBottles();
        this.statusBarCoin.tradedCoinsToRefillBottles();
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

    if (this.coinAmount == 5 && !this.keyboard.R) {
      this.ctx.fillStyle = 'white';
      this.ctx.font = '24px zabars';
      this.ctx.fillText('Press R to refill bottles!', 260, 87);
    }

    // draw wird immer wieder aufgerufen
    // this kann nicht in der Funktion selbst stehen, deshalb wird es mit Zuweisung einer Variable deklariert
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

  // o = object
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  // mo = movable object
  // prüft, ob mo otherDirection gesetzt ist
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    // mo.drawBlueFrame(this.ctx);
    mo.drawRedFrame(this.ctx);

    // prüft, ob context im oberen Teil der Funktion verändert wurde
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save(); // aktuelle Einstellungen/Eigenschaften von Context werden gespeichert ("Screenshot")
    this.ctx.translate(mo.width, 0); // Element wird zur Seite verschoben, damit es beim spiegeln keinen Sprung gibt
    this.ctx.scale(-1, 1); // Ab hier wird alles spiegelverkehrt eingefügt
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1; // Setzt Spiegelung zurück für nachfolgende Objekte
    this.ctx.restore(); // Änderungen werden Rückgängig gemacht
  }
}
