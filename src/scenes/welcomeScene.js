import Phaser from 'phaser';

export default class WelcomeScene extends Phaser.Scene {
  constructor() {
    super('title');
  }

  preload() {
    this.load.image('start', 'assets/start.png');
    this.load.image('leaderboard', 'assets/leaderboard.png');
  }

  create() {
    // title
    this.add.text(this.scale.width * 0.5, 80, 'Platform Runner', { fontSize: 70, color: '#FF7F50' }).setOrigin();
    // start button
    const startButton = this.add.image(this.scale.width * 0.5, this.scale.height * 0.5, 'start').setScale(0.6);
    startButton.setInteractive({ useHandCursor: true });
    startButton.on('pointerdown', () => {
      this.scene.start('game');
    });
    // leaderboard
    const leaderboardButton = this.add.image(this.scale.width * 0.5, this.scale.height * 0.5 + 100, 'leaderboard').setScale(0.4);
    leaderboardButton.setInteractive({ useHandCursor: true });
    leaderboardButton.on('pointerdown', () => {
      this.scene.start('leaderboard');
    });
    // credits
    this.add.text(this.scale.width * 0.3, this.scale.height - 100, 'Created by: Gzim Asani', { fontSize: 24, color: '#FF7F50' });
  }
}