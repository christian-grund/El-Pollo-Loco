/**
 * Class representing the game world.
 */
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

  /**
   * Class representing the game world.
   */
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

  /**
   * Sets the world property of the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the game loop.
   */
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
  }

  /**
   * Pauses the running interval.
   */
  pauseRunInterval() {
    this.isRunIntervalPaused = true;
  }
  /**
   * Resumes the running interval.
   */
  resumeRunInterval() {
    this.isRunIntervalPaused = false;
  }

  /**
   * Checks collisions between the character and enemies.
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.characterCollidingWithEnemy(enemy)) this.characterCollidedWithEnemy();
    });
    this.level.endboss.forEach((endboss) => {
      if (this.characterCollidingWithEndboss(endboss)) this.characterCollidedWithEnemy();
    });
  }

  /**
   * Checks if the character is colliding with an enemy.
   * @param {Enemy} enemy - The enemy to check collision with.
   * @returns {boolean} - True if collision detected, otherwise false.
   */
  characterCollidingWithEnemy(enemy) {
    return (
      this.character.isColliding(enemy) && !enemy.chickenIsDead && ((!this.character.isAboveGround() && this.character.energy >= 0) || this.character.isJumpingUp() || !this.character.isWalking())
    );
  }

  /**
   * Handles character collision with enemy.
   */
  characterCollidedWithEnemy() {
    this.character.hit();
    this.statusBarHealth.setPercentage(this.character.energy);
  }

  /**
   * Handles character collision with endboss.
   */
  characterCollidingWithEndboss(endboss) {
    return this.character.isColliding(endboss) && !endboss.endbossIsDead;
  }

  /**
   * Checks if the character jumped on a chicken enemy.
   */
  jumpOnChicken() {
    this.level.enemies.forEach((enemy) => {
      if (this.characterJumpsOnChicken(enemy)) this.characterJumpedOnChicken(enemy);
      else if (this.characterLandsOnGround()) this.characterLandedOnGround();
    });
  }

  /**
   * Checks if the character jumped on a specific chicken enemy.
   * @param {Enemy} enemy - The chicken enemy to check.
   * @returns {boolean} - True if character jumped on the chicken, otherwise false.
   */
  characterJumpsOnChicken(enemy) {
    return this.character.isColliding(enemy) && this.character.isJumpingDown() && !this.character.isHurt() && !enemy.chickenIsDead;
  }

  /**
   * Handles character jumping on a chicken enemy.
   * @param {Enemy} enemy - The chicken enemy.
   */
  characterJumpedOnChicken(enemy) {
    this.killChicken(enemy);
    setTimeout(() => this.character.jump(), 100);
    this.removeDeadChicken(enemy);
  }

  /**
   * Checks if the character has landed on the ground.
   * @returns {boolean} - True if character is on the ground, otherwise false.
   */
  characterLandsOnGround() {
    return this.character.y >= 180;
  }

  /**
   * Handles character landing on the ground.
   */
  characterLandedOnGround() {
    this.character.speedY = 0;
    this.character.y = 180;
  }

  /**
   * Kills the chicken enemy.
   * @param {Enemy} enemy - The chicken enemy to be killed.
   */
  killChicken(enemy) {
    enemy.chickenIsDead = true;
    enemy.animateDeadChicken();
    enemy.playChickenSound();
  }

  /**
   * Removes the dead chicken enemy from the level after a delay.
   * @param {Enemy} enemy - The dead chicken enemy to be removed.
   */
  removeDeadChicken(enemy) {
    setTimeout(() => {
      const index = this.world.level.enemies.indexOf(enemy);
      if (index > -1) this.world.level.enemies.splice(index, 1);
    }, 3000);
  }

  /**
   * Checks if the character is dead.
   * @returns {boolean} - True if character is dead, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks for the collection of items by the character.
   */
  checkCollection() {
    this.level.collectableObjects.forEach((object, index) => {
      if (this.collectingBottle(object)) {
        if (this.character.isColliding(object, index)) this.hasCollectedBottle(index);
      } else {
        if (this.collectingCoin(object)) {
          if (this.character.isColliding(object, index)) this.hasCollectedCoin(index);
        }
      }
    });
  }

  /**
   * Checks if the object is a bottle collectible.
   * @param {CollectableObject} collectableObject - The object to be checked.
   * @returns {boolean} - True if object is a bottle, otherwise false.
   */
  collectingBottle(collectableObject) {
    return collectableObject instanceof Bottle;
  }

  /**
   * Handles the collection of a bottle by the character.
   * @param {number} index - The index of the collected bottle.
   */
  hasCollectedBottle(index) {
    this.bottleAmount++;
    this.removeCollectedObject(index);
    this.statusBarBottle.bottleCollected();
    if (!mute) {
      playBottleCollectSound();
    }
  }

  /**
   * Checks if the object is a coin collectible.
   * @param {CollectableObject} collectableObject - The object to be checked.
   * @returns {boolean} - True if object is a coin, otherwise false.
   */
  collectingCoin(collectableObject) {
    return collectableObject instanceof Coin;
  }

  /**
   * Handles the collection of a coin by the character.
   * @param {number} index - The index of the collected coin.
   */
  hasCollectedCoin(index) {
    this.coinAmount++;
    this.removeCollectedObject(index);
    this.statusBarCoin.coinCollected();
    if (!mute) {
      playCoinCollectSound();
    }
  }

  /**
   * Removes the collected object from the level.
   * @param {number} index - The index of the collected object.
   */
  removeCollectedObject(index) {
    this.level.collectableObjects.splice(index, 1);
  }

  /**
   * Checks for throwable objects and throws them if conditions are met.
   */
  checkThrowObjects() {
    if (this.checkThrowPossible()) {
      let bottleIndex;
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, bottleIndex);
      bottle.throw(this.character.otherDirection);
      this.throwableObjects.push(bottle);
      this.statusBarBottle.bottleThrown();
      this.bottleAmount--;
      this.throwNewBottleAllowedCheck = false;
    }
  }

  /**
   * Checks if throwing a bottle is possible based on game conditions.
   * @returns {boolean} - True if throwing a bottle is possible, otherwise false.
   */
  checkThrowPossible() {
    return this.keyboard.D && this.bottleAmount > 0 && this.throwNewBottleAllowedCheck && this.character.energy >= 1;
  }

  /**
   * Checks collisions of thrown objects with enemies and ground.
   */
  checkThrowColissions() {
    this.throwableObjects.forEach((ThrowableObject) => {
      this.throwNewBottleAllowedCheck = false;

      if (this.bottleHitsGround(ThrowableObject)) this.bottleHittedGround(ThrowableObject, this.throwNewBottleAllowedCheck);

      this.level.enemies.forEach((enemy) => {
        if (this.bottleHitsChicken(enemy, ThrowableObject)) this.bottleHittedChicken(enemy, ThrowableObject, this.throwNewBottleAllowedCheck);
      });

      this.level.endboss.forEach((endboss) => {
        if (this.bottleHitsEndboss(endboss, ThrowableObject)) this.bottleHittedEndboss(endboss, ThrowableObject, this.throwNewBottleAllowedCheck);
      });
    });
  }

  /**
   * Checks if the thrown bottle hits the ground.
   * @param {ThrowableObject} ThrowableObject - The thrown object.
   * @returns {boolean} - True if bottle hits ground, otherwise false.
   */
  bottleHitsGround(ThrowableObject) {
    return !ThrowableObject.isAboveGround();
  }

  /**
   * Handles the situation when a thrown bottle hits the ground.
   * @param {ThrowableObject} ThrowableObject - The thrown object.
   * @param {boolean} throwNewBottleAllowedCheck - Indicates if throwing a new bottle is allowed.
   */
  bottleHittedGround(ThrowableObject, throwNewBottleAllowedCheck) {
    ThrowableObject.splashingBottle();
    this.removeThrownBottle(ThrowableObject);
    this.throwNewBottleAllowedCheck = true;
  }

  /**
   * Checks if the thrown bottle hits a chicken enemy.
   * @param {Enemy} enemy - The chicken enemy.
   * @param {ThrowableObject} ThrowableObject - The thrown object.
   * @returns {boolean} - True if bottle hits chicken, otherwise false.
   */
  bottleHitsChicken(enemy, ThrowableObject) {
    return enemy.isColliding(ThrowableObject);
  }

  /**
   * Handles the situation when a thrown bottle hits a chicken enemy.
   * @param {Enemy} enemy - The chicken enemy.
   * @param {ThrowableObject} ThrowableObject - The thrown object.
   * @param {boolean} throwNewBottleAllowedCheck - Indicates if throwing a new bottle is allowed.
   */
  bottleHittedChicken(enemy, ThrowableObject, throwNewBottleAllowedCheck) {
    ThrowableObject.splashingBottle(ThrowableObject);
    enemy.animateDeadChicken();
    this.killChicken(enemy);
    this.removeDeadChicken(enemy);
    this.pauseRunInterval();
    setTimeout(() => this.resumeRunInterval(), 100);
    this.throwNewBottleAllowedCheck = true;
  }

  /**
   * Checks if the thrown bottle hits the end boss.
   * @param {Endboss} endboss - The end boss.
   * @param {ThrowableObject} ThrowableObject - The thrown object.
   * @returns {boolean} - True if bottle hits end boss, otherwise false.
   */
  bottleHitsEndboss(endboss, ThrowableObject) {
    return endboss.isColliding(ThrowableObject);
  }

  /**
   * Handles the situation when a thrown bottle hits the end boss.
   * @param {Endboss} endboss - The end boss.
   * @param {ThrowableObject} ThrowableObject - The thrown object.
   * @param {boolean} throwNewBottleAllowedCheck - Indicates if throwing a new bottle is allowed.
   */
  bottleHittedEndboss(endboss, ThrowableObject, throwNewBottleAllowedCheck) {
    ThrowableObject.splashingBottle();
    this.removeThrownBottle(ThrowableObject);
    endboss.endbossIsHit();
    ThrowableObject.speedY = 0;
    ThrowableObject.speedX = 0;
    setTimeout(() => (this.throwNewBottleAllowedCheck = true), 1000);
  }

  /**
   * Removes a thrown bottle from the list of throwable objects after a delay.
   * @param {ThrowableObject} ThrowableObject - The thrown object to be removed.
   */
  removeThrownBottle(ThrowableObject) {
    setTimeout(() => {
      let index = this.throwableObjects.indexOf(ThrowableObject);
      if (index !== -1) this.throwableObjects.splice(index, 1);
    }, 250);
  }

  /**
   * Checks if the player has collected enough coins to refill bottles and handles the refill action.
   */
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

  /**
   * Draws all elements on the canvas including movable and fixed objects.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addMovableObjectsToMap();
    this.ctx.translate(-this.camera_x, 0); // Back
    this.addFixedObjectsToMap();
    this.ctx.translate(this.camera_x, 0); // Forward
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    if (this.allCoinsCollected()) this.drawInfoRefillPossible();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Checks if all coins are collected and display refill instruction if true.
   * @returns {boolean} - True if all coins are collected and refill instruction is to be displayed, otherwise false.
   */
  allCoinsCollected() {
    return this.coinAmount == 10 && !this.keyboard.R;
  }

  /**
   * Draws refill instruction if all coins are collected.
   */
  drawInfoRefillPossible() {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '18px mayan';
    this.ctx.fillText('Press R to refill bottles!', 260, 87);
  }

  /**
   * Adds fixed objects to the map such as health, coin, and bottle status bars.
   */
  addFixedObjectsToMap() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);

    if (this.statusBarEndboss.visible) {
      this.addToMap(this.statusBarEndboss);
    }
  }

  /**
   * Adds movable objects to the map such as background objects, enemies, endbosses, clouds, and collectible objects.
   */
  addMovableObjectsToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.collectableObjects);
  }

  /**
   * Adds objects to the map by iterating through the provided array.
   * @param {Array} objects - Array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map and flips its image if needed.
   * @param {Object} mo - Object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image of an object horizontally for drawing purposes.
   * @param {Object} mo - Object whose image is to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the original orientation of the object's image after flipping.
   * @param {Object} mo - Object whose image orientation is to be restored.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
