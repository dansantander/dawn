import Phaser from 'phaser';
import Hero from '../characters/hero';
import bg0 from '../../assets/background_0.png';
import bg1 from '../../assets/background_1.png';
import bg2 from '../../assets/background_2.png';
import moon from '../../assets/bg/moon.png';
import heroRun from '../../assets/hero/heroRun3.png';
import heroJump from '../../assets/hero/heroJump.png';
import platform1 from '../../assets/platforms/platform1.png';

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

class SceneBackground extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene1' });
    /* eslint-disable */
    this.bg0;
    this.bg1;
    this.bg2;
    /* eslint-enable */
  }

  preload() {
    this.load.image('bg0', bg0);
    this.load.image('bg1', bg1);
    this.load.image('bg2', bg2);
    this.load.spritesheet('heroRun', heroRun, { frameWidth: 62, frameHeight: 47 });
    this.load.spritesheet('heroJump', heroJump, { frameWidth: 60, frameHeight: 56 });
    this.load.spritesheet('moon', moon, { frameWidth: 112, frameHeight: 92 });
    this.load.image('platform1', platform1);
  }

  create() {
    const { width } = this.game.scale; /* const width = this.game.scale.width; */
    const { height } = this.game.scale;

    // Background Setup
    const bg0 = this.add.image(width / 2, height / 2, 'bg0');
    bg0.displayHeight = this.sys.game.config.height;
    bg0.scaleX = bg0.scaleY;
    bg0.setScrollFactor(0);

    const moon = this.add.sprite(width / 2, height / 2, 'moon');
    moon.setScrollFactor(0);

    createTextureLoop(this, 2, 'bg1', 0.25);
    createTextureLoop(this, 2, 'bg2', 0.5);

    // Ground & Lava
    const ground = this.physics.add.staticGroup();
    ground.create(150, 700, 'platform1').setScale(2).refreshBody();

    // Platforms
    this.platformGroup = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.addPlatform(191, 800);

    /* const platforms = this.physics.add.staticGroup();
    platforms.create(700, 600, 'platform1').setScale(2).refreshBody(); */

    this.hero = new Hero(this, 100, 300, 'heroRun');

    // Colliders
    this.hero.setCollideWorldBounds(true);
    this.physics.add.collider(this.hero, ground);
    this.physics.add.collider(this.hero, this.platformGroup);

    this.cameras.main.setBounds(0, 0, width * 3, height);
  }

  addPlatform(platformWidth, posX) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX; // sets x position of first platform
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, 600, 'platform1');
      platform.setScale(2);
      platform.setVelocityX(Phaser.Math.Between(-150, -200));
      platform.setGravityY(-400);
      this.platformGroup.add(platform);
      platform.setImmovable(true);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(70, 200);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    const cam = this.cameras.main;
    const speed = 3;

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

    if (this.hero.y > 700 || this.hero.x < cam.scrollX - 124) {
      console.log('GAME OVER');
    }

    // recycling platforms
    let minDistance = 1100;
    let rightmostPlatformHeight = 0;

    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance = 1100 - platform.x - platform.displayWidth / 2;
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
      /* const nextPlatformWidth = Phaser.Math.Between(50, 250); */
      const nextPlatformWidth = 191;
      /* const platformRandomHeight = 10 * Phaser.Math.Between(-40, 40); */
      const platformRandomHeight = 34;

      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = window.innerHeight * 0.4;
      const maxPlatformHeight = window.innerHeight * 0.8;
      const nextPlatformHeight = Phaser.Math.Clamp(
        nextPlatformGap,
        minPlatformHeight,
        maxPlatformHeight,
      );
      this.addPlatform(nextPlatformWidth, 900 + nextPlatformWidth / 2, nextPlatformHeight);
    }
  }
}


export default SceneBackground;