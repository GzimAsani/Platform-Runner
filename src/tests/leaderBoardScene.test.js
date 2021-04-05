import Phaser from 'phaser';
import LeaderBoardScene from '../scenes/leaderBoardScene';

test('game scene is a subclass of scene', () => {
  expect(LeaderBoardScene.prototype instanceof Phaser.Scene).toBe(true);
});

test('leaderboard scene is a function', () => {
  expect(typeof LeaderBoardScene).toBe('function');
});