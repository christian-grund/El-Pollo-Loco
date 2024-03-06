let level1;

function initLevel() {
  level1 = new Level(
    createEnemies(),
    createEndboss(),
    createClouds(),
    createCollectableObjects(),
    createBackgroundObjects()
  );

  function createEnemies() {
    return [
      // new ChickenNormal(),
      // new ChickenNormal(),
      // new ChickenNormal(),
      // new ChickenNormal(),
      // new ChickenSmall(),
      // new ChickenSmall(),
      // new ChickenSmall(),
      // new ChickenSmall(),
    ];
  }

  function createEndboss() {
    return [new Endboss()];
  }

  function createClouds() {
    return [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()];
  }

  function createCollectableObjects() {
    return [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      // new Coin(),
      // new Coin(),
      // new Coin(),
      // new Coin(),
      // new Coin(),
    ];
  }

  function createBackgroundObjects() {
    return [
      new BackgroundObject('img/5_background/layers/air.png', -719),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

      new BackgroundObject('img/5_background/layers/air.png', 0),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/air.png', 719),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
      new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
      new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),
    ];
  }
}
