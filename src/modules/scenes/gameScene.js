import Phaser from 'phaser';
import Hero from '../characters/hero';
import bg0 from '../../assets/bg/background_0.png';
import bg1 from '../../assets/bg/background_1.png';
import bg2 from '../../assets/bg/background_2.png';
import moon from '../../assets/bg/moon.png';
import heroRun from '../../assets/hero/heroRun3.png';
import heroJump from '../../assets/hero/heroJump.png';
import platform1 from '../../assets/platforms/platform1.png';
import crystal2 from '../../assets/objects/crystal2.png';
import canonBall from '../../assets/objects/canonBall.png';

const createTextureLoop = (scene, quantity, texture, scrollFactor) => {
  let x = 0;
  for (let i = 0; i < quantity; i += 1) {
    const item = scene.add.image(x, scene.game.scale.height, texture);
    item.displayHeight = scene.sys.game.config.height;
    item.scaleX = item.scaleY;
    item.setOrigin(0, 1);
    item.setScrollFactor(scrollFactor);
    x += item.width;
  }
};

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    /* eslint-disable */
    this.bg0;
    this.bg1;
    this.bg2;
    this.crystals;
    /* eslint-enable */
  }

  preload() {
    this.load.image('bg0', bg0);
    this.load.image('bg1', bg1);
    this.load.image('bg2', bg2);
    this.load.spritesheet('heroRun', heroRun, { frameWidth: 62, frameHeight: 47 });
    this.load.spritesheet('heroJump', heroJump, { frameWidth: 60, frameHeight: 56 });
    this.load.spritesheet('moon', moon, { frameWidth: 113, frameHeight: 92 });
    this.load.spritesheet('canonBall', canonBall, { frameWidth: 9, frameHeight: 25 });
    this.load.image('platform1', platform1);
    this.load.image('crystal2', crystal2);
  }

  create() {
    this.physics.world.setBounds(-100, 0,
      this.sys.game.config.width * 3, this.sys.game.config.height + 150);

    const { width } = this.game.scale; /* const width = this.game.scale.width; */
    const { height } = this.game.scale;

    // Background Setup
    const bg0 = this.add.image(width / 2, height / 2, 'bg0');
    bg0.displayHeight = this.sys.game.config.height;
    bg0.scaleX = bg0.scaleY;
    bg0.setScrollFactor(0);

    this.moon = this.add.sprite(200, 200, 'moon');
    this.moon.setScale(2);
    this.moon.setScrollFactor(0);

    this.anims.create({
      key: 'moon',
      frames: this.anims.generateFrameNumbers('moon', { start: 0, end: 7 }),
      frameRate: 20,
      repeat: -1,
    });

    createTextureLoop(this, 3, 'bg1', 0.25);
    createTextureLoop(this, 5, 'bg2', 0.5);

    this.score = 0;
    this.scoreText = this.add.text(900, 16, 'score: 0', { fontSize: '20px', fill: '#fff' });
    this.scoreText.setScrollFactor(0);

    // ++ Platforms ++

    // group with all active platforms.
    this.platformGroup = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // pool
    this.platformPool = this.add.group({
      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    // adding a platform to the game, the arguments are platform width, x position, and y position
    this.addPlatform(500, 400, 300);

    this.timedEvent = this.time.addEvent({
      delay: 2000,
      callback: this.dropCrystals,
      callbackScope: this,
      loop: true,
    });

    this.timedEvent = this.time.addEvent({
      delay: 2000,
      callback: this.dropCanonBalls,
      callbackScope: this,
      loop: true,
    });

    this.hero = new Hero(this, 200, 400, 'heroRun');

    // Colliders
    this.hero.setCollideWorldBounds(true);
    this.physics.add.collider(this.hero, this.platformGroup);
    this.physics.add.collider(this.hero, this.fixedPlatforms);

    // Camera
    this.cameras.main.setBounds(0, 0, width * 1.4, height);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    const cam = this.cameras.main;
    const speed = 2;

    this.moon.anims.play('moon', true);

    if (cursors.left.isDown) {
      // move left
      cam.scrollX -= speed;
      this.hero.move('left');
    } else if (cursors.right.isDown) {
      // move right
      cam.scrollX += speed;
      this.hero.move('right');
    } else {
      this.hero.stand();
    }

    if (cursors.up.isDown && this.hero.body.touching.down) {
      this.hero.jump();
    }

    if (this.hero.y > 700 || this.hero.x < cam.scrollX - 100) {
      this.time.addEvent({
        delay: 1000,
        callbackScope: this,
        callback: () => {
          this.scene.start('GameOver', { score: this.score });
        },
      });
    }

    // recycling platforms
    let minDistance = 1200;
    // eslint-disable-next-line no-unused-vars
    let rightmostPlatformHeight = 0;

    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance = 1200 - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }

      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(120, 250);
      const nextPlatformHeight = Phaser.Math.Between(450, 600);
      this.addPlatform(nextPlatformWidth, 1500, nextPlatformHeight);
    }
  }

  addPlatform(platformWidth, posX, posY) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX; // sets x position of first auto created platform
      platform.y = posY; // sets y position of first auto created platform
      platform.active = true; // An active object is one which
      // is having its logic and internal systems updated.
      platform.visible = true; // An invisible Game Object will skip rendering,
      // but will still process update logic.
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, 500, 'platform1');
      platform.setVelocityX(Phaser.Math.Between(-250, -350));
      platform.setGravityY(-400);
      platform.setImmovable(true); // so that it doesn't move with an object collision
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(70, 200);
  }

  collectCrystal(hero, crystal) {
    crystal.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    if (this.crystals.countActive(true) === 0) {
      this.crystals.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });
    }
  }

  dropCrystals() {
    this.crystals = this.physics.add.group({
      key: 'crystal2',
      repeat: 6,
      setXY: { x: 550, y: 230, stepX: 200 },
    });
    this.physics.add.collider(this.crystals, this.platformGroup);
    this.physics.add.overlap(this.hero, this.crystals, this.collectCrystal, null, this);
  }

  dropCanonBalls() {
    this.canonBall = this.physics.add.sprite(Phaser.Math.Between(0, 2200), 0, 'canonBall');
    this.anims.create({
      key: 'canonBall',
      frames: this.anims.generateFrameNumbers('canonBall', { start: 0, end: 10 }),
      frameRate: 20,
      repeat: -1,
    });
    this.canonBall.anims.play('canonBall', true);
    this.canonBall.setScale(3);
    this.physics.add.overlap(this.hero, this.canonBall, this.canonBallHit, null, this);
  }

  canonBallHit() {
    this.physics.pause();
    this.hero.setTint(0xff0000);
    this.time.addEvent({
      delay: 1000,
      callbackScope: this,
      callback: () => {
        this.scene.start('GameOver', { score: this.score });
      },
    });
  }
}


export default GameScene;