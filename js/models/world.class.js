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
  throwableObjects = [];
  bottleAmount = 0;
  intervalIDs = [];

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

  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIDs.push(id);
  }

  stopGame() {
    this.intervalIDs.forEach(clearInterval);
  }

  addObjects() {
    this.addBottles();
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollection();
      this.checkThrowObjects();
    }, 200);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
        console.log('character.energy:', this.character.energy);
      }
      if (this.character.isAboveGround()) {
        console.log('character.isAboveGround');
        // this.enemyKilled();
        // console.log('Enemy killed:', enemy);
      }
    });
  }

  enemyKilled() {
    return true;
  }

  checkCollection() {
    this.level.collectableObjects.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.collectBottle(index);
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
   *
   */
  collectBottle(index) {
    this.bottleAmount++;
    this.removeBottle(index);
    this.statusBarBottle.bottleCollected();
  }

  /**
   * Removes a bottle from the collectable objects array
   * @param {number} index - The index of the bottle in the collectable objects array
   */
  removeBottle(index) {
    this.level.collectableObjects.splice(index, 1);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.bottleAmount > 0) {
      // Überprüfe, ob this.world.character definiert ist
      if (this.world && this.world.character) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        bottle.throw(this.character.otherDirection);
        this.throwableObjects.push(bottle);
        this.statusBarBottle.bottleThrown();
        this.bottleAmount--;
      } else {
        console.error("Error: 'this.world.character' is undefined.");
      }
    }
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
  }

  addLevelObjectsToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.enemies);
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
      bottle.x = 500 + i * 350;
      level1.collectableObjects.push(bottle);
      this.addToMap(bottle);
    }
  }
}
