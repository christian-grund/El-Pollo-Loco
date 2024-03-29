/**
 * Represents a cloud object.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;

  /**
   * Constructs a new Cloud object.
   */
  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');

    this.x = Math.random() * 720 * 5; // Zahl zwischen 0 und 720;
    this.speed = 0.1 + Math.random() * 0.1;
    this.animate();
  }

  /**
   * Initiates the animation for the cloud.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
