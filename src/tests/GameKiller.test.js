import Phaser from 'phaser';
import GameKiller from '../lib/GameKiller';

test('game killer is a subclass of sprite', () => {
  expect(GameKiller.prototype instanceof Phaser.Physics.Arcade.Sprite).toBe(true);
});

test('game killer has a constructor', () => {
  expect(GameKiller.prototype.constructor).not.toBe(false);
});

test('game killer is a function', () => {
  expect(typeof GameKiller).toBe('function');
});