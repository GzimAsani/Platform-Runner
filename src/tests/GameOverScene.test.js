import Phaser from 'phaser';
import GameOver from '../scenes/GameOver';

test('game scene is a subclass of scene', () => {
  expect(GameOver.prototype instanceof Phaser.Scene).toBe(true);
});

test('game over scene should be a function', () => {
  expect(typeof GameOver).toBe('function');
});