import Phaser from 'phaser';
import Point from '../lib/Point';

test('Point is a function', () => {
  expect(typeof Point).toBe('function');
});

test('Gold has a constructor', () => {
  expect(Point.prototype.constructor).not.toBe(false);
});

test('Gold is a subclass of sprite', () => {
  expect(Point.prototype instanceof Phaser.Physics.Arcade.Sprite).toBe(true);
});