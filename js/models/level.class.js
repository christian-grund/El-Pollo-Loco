/**
 * Represents a level in the game
 *
 * @class
 * This class defines a structure of a game level
 */
class Level {
  enemies;
  endboss;
  clouds;
  backgroundObjects;
  collectableObjects;
  level_end_x = 2200;

  /**
   * Creates a new instance of the level class
   * @param {Array} enemies - An array of enemies in the level
   * @param {Array} clouds - An array of clouds in the level
   * @param {Array} backgroundObjects An array of background objects in the level
   * @param {Array} collectableObjects - An array of collectable objects in the level
   */
  constructor(enemies, endboss, clouds, backgroundObjects, collectableObjects) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectableObjects = collectableObjects;
  }
}
