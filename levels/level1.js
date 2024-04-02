/**
 * Represents the first level of the game.
 */
let level1;

/**
 * Initializes the first level of the game.
 */
function initLevel() {
  level1 = new Level(createEnemies(), createEndboss(), createClouds(), createCollectableObjects(), createBackgroundObjects());

  /**
   * Creates enemies for the level.
   * @returns {Array} An array of enemy objects.
   */
  function createEnemies() {
    return [
      new ChickenNormal(),
      new ChickenNormal(),
      new ChickenNormal(),
      new ChickenNormal(),
      new ChickenNormal(),
      new ChickenNormal(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
    ];
  }

  /**
   * Creates the end boss for the level.
   * @returns {Array} An array containing the end boss object.
   */
  function createEndboss() {
    return [new Endboss()];
  }

  /**
   * Creates clouds for the level.
   * @returns {Array} An array of cloud objects.
   */
  function createClouds() {
    return [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()];
  }

  /**
   * Creates collectable objects for the level.
   * @returns {Array} An array of collectable object instances.
   */
  function createCollectableObjects() {
    return [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
    ];
  }

  /**
   * Creates background objects for the level.
   * @returns {Array} An array of background object instances.
   */
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

      new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),
      new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7),
    ];
  }
}
