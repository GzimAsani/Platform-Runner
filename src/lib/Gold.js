import Phaser from 'phaser';

export default class Gold extends
Phaser.Physics.Arcade.Sprite {
  constructor(screne, m, n, texture) {
    super(screne, m, n, texture);

    this.setScale(0.3);
  }
}