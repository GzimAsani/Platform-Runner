import Phaser from 'phaser';
import { url, getScores } from '../lib/leaderboardApi';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('leaderboard');
  }

  create() {
    this.add.text(this.scale.width * 0.5, 30, 'LeaderBoard', {fontSize: 56, color: '#FF7F50' })
      .setOrigin();
      getScores(url)
      .then((data) => {
        const sortedData = data;
        for (let i = 0; i < 5; i += 1) {
          if (!sortedData[i]) {
            break;
          }
          const userAndScore = sortedData[i];
          this.add.text(this.scale.width * 0.5, this.scale.height * 0.3 + 20 * i,
            `${userAndScore.user}: ${userAndScore.score}`).setOrigin();
        }
      })
      .catch(() => {
        this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, 'Internet Problems. Please try again later.').setOrigin();
      });
    this.add.text(this.scale.width * 0.5, this.scale.height * 0.9, 'Press SPACE to play.', { fontSize: 24, color: '#FF7F50' }).setOrigin();
    // setup new game
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('game');
    });
  }
}