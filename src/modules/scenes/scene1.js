import Phaser from 'phaser';
import Hero from '../characters/hero';
import bg0 from '../../assets/background_0.png';
import bg1 from '../../assets/background_1.png';
import bg2 from '../../assets/background_2.png';
import heroRun from '../../assets/hero/heroRun.png';

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
    this.load.spritesheet('heroRun', heroRun, { frameWidth: 200, frameHeight: 200 });
  }

  create() {
    const { width } = this.game.scale; /* const width = this.game.scale.width; */
    const { height } = this.game.scale;

    const bg0 = this.add.image(width / 2, height / 2, 'bg0');
    bg0.displayHeight = this.sys.game.config.height;
    bg0.scaleX = bg0.scaleY;
    bg0.setScrollFactor(0);

    createTextureLoop(this, 2, 'bg1', 0.25);
    createTextureLoop(this, 2, 'bg2', 0.5);

    this.hero = new Hero(this, 200, 300, 'heroRun');
    console.log(this.hero);
    this.hero.setCollideWorldBounds(true);

    this.cameras.main.setBounds(0, 0, width * 3, height);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    const cam = this.cameras.main;
    const speed = 10;

    if (cursors.left.isDown) {
      // move left
      cam.scrollX -= speed;
    } else if (cursors.right.isDown) {
      // move right
      cam.scrollX += speed;
    }
  }
}


export default SceneBackground;