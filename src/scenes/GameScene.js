import Phaser from 'phaser';
import Gold from '../lib/Gold';
import GameKiller from '../lib/GameKiller';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
  }

  init() {
    this.score = 0;
  }

  preload() {
    this.load.image('background', 'assets/background.jpg');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('star', 'assets/gold.png');
    this.load.image('staticKiller', 'assets/spikes.png');
    this.load.spritesheet('dude',
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.add.image(400, 300, 'background').setScrollFactor(0, 1);
    this.stars = this.physics.add.group({ classType: Gold });
    this.staticKillers = this.physics.add.group({ classType: GameKiller });
    // platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(100, this.scale.height + 150, 'ground').setScale(1.0).refreshBody();
    this.platforms.create(400, this.scale.height, 'ground').setScale(1.0).refreshBody();
    this.platforms.create(800, this.scale.height - 150, 'ground').setScale(1.0).refreshBody();
    // setup stars and staticKiller
    this.platforms.children.iterate(platform => {
      this.addStarAbove(platform);
      this.addStaticKillerAbove(platform);
    });
    // logic for player movement
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });
    // physics interactions
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.platforms, this.stars);
    this.physics.add.collider(this.platforms, this.staticKillers);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      undefined,
      this,
    );
    this.physics.add.overlap(this.player,
      this.staticKillers,
      () => {
        this.scene.start('game-over', { score: this.score });
      },
      undefined,
      this);
    this.cursors = this.input.keyboard.createCursorKeys();
    // camera motion
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(0, this.scale.height * 1.5);
    // scores
    this.scoreText = this.add.text(10, 10, 'Score: 0',
      { color: '#FF0000', fontSize: 24 })
      .setScrollFactor(0);
  }

  update() {
    // recycle platforms
    this.platforms.children.iterate(platform => {
      const { scrollX } = this.cameras.main;
      if (platform.x <= scrollX - 100) {
        platform.x = scrollX + 900;
        platform.refreshBody();
        this.addStarAbove(platform);
        this.addStaticKillerAbove(platform);
      }
    });
    // player control using keyboard
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

    if (this.player.y >= 800) {
      this.scene.start('game-over', { score: this.score });
    }
  }

  // add a star above a platform
  addStarAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;
    const star = this.stars.get(Phaser.Math.Between(sprite.x - 10, sprite.x), y, 'star');
    star.setActive(true);
    star.setVisible(true);
    this.add.existing(star);
    star.body.setSize(star.width, star.height);
    this.physics.world.enable(star);
    return star;
  }

  // collect star and increase score
  collectStar(_player, star) {
    this.stars.killAndHide(star);
    this.physics.world.disableBody(star.body);
    this.score += 10;
    this.scoreText.text = `Score: ${this.score}`;
  }

  // add a staticKiller above a platform
  addStaticKillerAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;
    const staticKiller = this.staticKillers.get(Phaser.Math.Between(sprite.x + 10, sprite.x + 60), y, 'staticKiller');
    staticKiller.setActive(true);
    staticKiller.setVisible(true);
    this.add.existing(staticKiller);
    staticKiller.body.setSize(staticKiller.width, staticKiller.height);
    this.physics.world.enable(staticKiller);
    return staticKiller;
  }
}