import Phaser from 'phaser';
import { url, postScores } from '../lib/leaderboardApi';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
  }

  init(data) {
    this.finalScore = data.score;
  }

  preload() {
    this.load.image('reset', 'assets/reset.png');
  }

  create() {
    this.add.text(this.scare.width * 0.6, this.scale.height * 0.1, 'Game Over :(', {fontSize: 50, color: '#f00'}).setOrigin();

    this.add.text(this.scale.width * 0.6, this.scale.height * 0.2, `Total points: ${this.finalScore}`, {fontSize: 28}).setOrigin();

    const ressetButton = this.add.image(this.scale.width * 0.5, this.scale.height * 0.7, 'reset').setScale(0.5);
    ressetButton.setInteractive({ useHandCursor: true});
    ressetButton.on('pointerdown', () => {
      this.scene.start('game');
    });

    const form = document.createElement('form');
    form.innerHTML = `
    <input type="text" name="name" placeholder="Your name" required minLength="3" maxLength="10" autofocus/>
    <button type="submit">Submit</button>
    `;
    form.addEventListener('submit', a => {
      a.preventDefault();
      const user = document.querySelector('input[name="name"]').value;
      postScores(user, this.finalScore, url)
      .then(() => {
        this.scene.start('leaderboard')
      })
      .catch(() => {
        this.add.text(this.scale.width * 0.6, this.scale.height * 0.9, 'Check your internet. Please try again').setOrigin();
      });
    });
    this.add.dom(this.scale.width * 0.5, this.scale.height * 0.3, form);
  }
}