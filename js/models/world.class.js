class World {
  character = new Character();
  level = level1;
  canvas;
  ctx; // Sammlung/Framework von JS, mit dem man auf Canvas Objekte hinzufügen/malen kann
  keyboard;
  camera_x = 0;
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];
  bottleAmount = 0;

  constructor(canvas, keyboard) {
    // following functions are executed repeatedly
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.addObjects();
    this.run();
    this.world = this;
  }

  setWorld() {
    this.character.world = this;
  }

  addObjects() {
    this.addBottles();
  }

  run() {
    setInterval(() => {
      this.checkEnemyCollisions();
      this.checkCollection();
      this.checkThrowObjects();
      this.jumpOnChicken();
      // this.resetCharacterSpeedY();
      this.checkThrowColissions();
    }, 100);
  }

  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && (this.character.isOnGround() || this.character.isJumpingUp())) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
        console.log('character.energy:', this.character.energy);
      }
    });

    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        this.character.hit();
        console.log('character.energy:', this.character.energy);
      }
    });
  }

  jumpOnChicken() {
    this.level.enemies.forEach((enemy, index) => {
      if (
        this.character.isColliding(enemy, index) &&
        this.character.isJumpingDown() &&
        !this.character.isHurt() &&
        !enemy.chickenIsDead
      ) {
        this.killChicken(enemy);
        this.character.jump();
        this.removeDeadChicken(index);
      }
    });
  }

  killChicken(enemy) {
    enemy.chickenIsDead = true;
    enemy.animateDeadChicken();
    this.deadChickenFallDown(enemy);
  }

  deadChickenFallDown(enemy) {
    enemy.applyGravity();
  }

  removeDeadChicken(index) {
    // setTimeout(() => {
    if (typeof index === 'number') {
      this.level.enemies.splice(index, 1);
    } else {
      this.level.enemies.splice(this.level.enemies.indexOf(index), 1);
    }
    // }, 600);
  }

  resetCharacterY() {
    if (this.character.y < 180) {
      console.log('character.y:', this.character.y);
      this.character.y == 180;
    }
  }

  isDead() {
    return this.energy == 0;
  }

  // deathAnimation() {
  //   this.playAnimation(this.IMAGES_DEAD);
  // }

  checkCollection() {
    this.level.collectableObjects.forEach((bottle, index) => {
      if (this.character.isColliding(bottle, index)) {
        this.bottleAmount++;
        this.removeCollectedBottle(index);
        this.statusBarBottle.bottleCollected();
        // console.log('checkCollection', index);
      }
    });
  }

  /**
   *  Checks if the collectable object is a bottle
   * @param {Object} CollectableObject - The collectable object to check
   * @return {boolean} - True if the collectable object is a bottle, false otherwise
   */
  collectingBottle(collectableObject) {
    return collectableObject instanceof Bottle;
  }

  /**
   * Removes a bottle from the collectable objects array
   * @param {number} index - The index of the bottle in the collectable objects array
   */
  removeCollectedBottle(index) {
    // console.log('removeBottle(index)', index);
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
          ThrowableObject.splashingBottle();
          enemy.animateDeadChicken();
          setTimeout(() => {
            this.killChicken(enemy);
          }, 1000);
          this.removeDeadChicken(enemy);
          console.log('level1.enemies:', level1.enemies);
        }
      });

      this.level.endboss.forEach((endboss) => {
        if (endboss.isColliding(ThrowableObject)) {
          setTimeout(() => endboss.endbossIsHit(), 500);
          console.log('Endboss hit with bottle!');
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
    }, 500);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addLevelObjectsToMap();
    this.ctx.translate(-this.camera_x, 0); // Back
    // - - - - - Space for fixed Objects - - - - -
    this.addStatusbarsToMap();
    this.ctx.translate(this.camera_x, 0); // Forward
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    // draw wird immer wieder aufgerufen
    // this kann nicht in der Funktion selbst stehen, deshalb wird es mit Zuweisung einer Variable deklariert
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addStatusbarsToMap() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndboss);
  }

  addLevelObjectsToMap() {
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
    mo.drawBlueFrame(this.ctx);
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

  addBottles() {
    for (let i = 0; i < 3; i++) {
      const bottle = new Bottle();
      bottle.x = 200 + i * 150;
      level1.collectableObjects.push(bottle);
      this.addToMap(bottle);
    }
  }
}
