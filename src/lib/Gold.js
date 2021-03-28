import Phaser from 'phaser';

export default class Gold extends
Phaser.Physics.Arcade.Sprite {
  constructor(screne, x, y, texture) {
    super(screne, x, y, texture);

    this.setScale(0.3);
  }
}