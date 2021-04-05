import Phaser from 'phaser';
import WelcomeScene from '../scenes/welcomeScene';

test('game scene is a subclass of scene', () => {
  expect(WelcomeScene.prototype instanceof Phaser.Scene).toBe(true);
});

test('title scene is a function', () => {
  expect(typeof WelcomeScene).toBe('function');
});
