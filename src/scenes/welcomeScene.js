import Phaser from 'phaser';

export default class WelcomeScene extends Phaser.Scene {
  constructor(){
    super('title');
  }

  preload() {
    this.load.image('start', 'assets/start.png');
    this.load.image('leaderboard', 'assets/leaderboard.png')
  }
}