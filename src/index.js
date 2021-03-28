import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import GameOver from './scenes/GameOver';
import WelcomeScene from './scenes/welcomeScene';
import LeaderBoardScene from './scenes/leaderBoardScene';

const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
    },
  },
  scene: [WelcomeScene, GameScene, GameOver, LeaderBoardScene],
  // lets u add dom stuff via phaser
  parent: '#container',
  dom: {
    createContainer: true,
  },
  // center game
  autoCenter: true,
};

export default new Phaser.Game(config);