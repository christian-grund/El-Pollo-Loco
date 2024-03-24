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
  collectableObjects;
  backgroundObjects;
  level_end_x = 3680;
  // level_end_x = 4500;

  /**
   * Creates a new instance of the level class
   * @param {Array} enemies - An array of enemies (containing normal and small chicken) in the level
   * @param {Array} clouds - An array of clouds in the level
   * @param {Array} collectableObjects - An Array of collectableObjects (containing bottles and coins) in the level
   * @param {Array} backgroundObjects An array of background objects in the level
   */
  constructor(enemies, endboss, clouds, collectableObjects, backgroundObjects) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.collectableObjects = collectableObjects;
    this.backgroundObjects = backgroundObjects;
  }
}
