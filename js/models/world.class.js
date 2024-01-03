class World {
  character = new Character();
  level = level1;
  canvas;
  ctx; // Sammlung/Framework von JS, mit dem man auf Canvas Objekte hinzufügen/malen kann
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  throwableObjects = [new ThrowableObject()];

  constructor(canvas, keyboard) {
    // following functions are executed repeatedly
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        console.log('character.energy:', this.character.energy);
      }
    });
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      console.log('Button D pressed!');
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0); // Back
    // - - - - - Space for fixed Objects - - - - -
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0); // Forward

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    // draw wird immer wieder aufgerufen
    // this kann nicht in der Funktion selbst stehen, deshalb wird es mit Zuweisung einer Variable deklariert
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
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
    mo.drawFrame(this.ctx);

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
