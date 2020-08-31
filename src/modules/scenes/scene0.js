import Phaser from 'phaser';
import Button from '../helpers/button';
import bg0 from '../../assets/background_0.png';
/* import btn1 from '../assets/scene0/btn1.png';
import btn2 from '../assets/scene0/btn2.png'; */

class Scene0 extends Phaser.Scene {
  constructor() {
    super({ key: 'scene0' });
  }

  preload() {
    this.load.image('bg0', bg0);
  /*     this.load.image('btn1', btn1);
    this.load.image('btn2', btn2); */
    /* this.load.spritesheet('btnStart', btn1, { frameWidth: 325, frameHeight: 66 }); */
    // 334
  }

  create() {
    const { width } = this.game.scale; /* const width = this.game.scale.width; */
    const { height } = this.game.scale;

    const bg0 = this.add.image(width / 2, height / 2, 'bg0');
    bg0.displayHeight = this.sys.game.config.height;
    bg0.scaleX = bg0.scaleY;

    this.storyButton = new Button(
      this,
      width / 2,
      height / 2,
      'btn1',
      'btn2',
      'parallaxScene',
    );
  }
}

export default Scene0;