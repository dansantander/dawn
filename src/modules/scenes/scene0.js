import Phaser from 'phaser';
import Button from '../helpers/button';
import bg0 from '../../assets/bg/background_0.png';
import bg1 from '../../assets/bg/background_1.png';
import bg2 from '../../assets/bg/background_2.png';
import bg3 from '../../assets/bg/background_3.png';
import logo from '../../assets/bg/logo.png';
import btnStart1 from '../../assets/objects/btnStart1.png';
import btnStart2 from '../../assets/objects/btnStart2.png';
import btnInstructions1 from '../../assets/objects/btnInstructions1.png';
import btnInstructions2 from '../../assets/objects/btnInstructions2.png';
import btnScores1 from '../../assets/objects/btnScores1.png';
import btnScores2 from '../../assets/objects/btnScores2.png';


class Scene0 extends Phaser.Scene {
  constructor() {
    super({ key: 'scene0' });
  }

  preload() {
    this.load.image('bg0', bg0);
    this.load.image('bg1', bg1);
    this.load.image('bg2', bg2);
    this.load.image('bg3', bg3);
    this.load.image('logo', logo);
    this.load.image('btnS1', btnStart1);
    this.load.image('btnS2', btnStart2);
    this.load.image('btnI1', btnInstructions1);
    this.load.image('btnI2', btnInstructions2);
    this.load.image('btnSC1', btnScores1);
    this.load.image('btnSC2', btnScores2);
  }

  create() {
    const { width } = this.game.scale; /* const width = this.game.scale.width; */
    const { height } = this.game.scale;

    const bg0 = this.add.image(width / 2, height / 2, 'bg0');
    bg0.displayHeight = this.sys.game.config.height;
    bg0.scaleX = bg0.scaleY;

    const bg1 = this.add.image(width / 2, height / 2, 'bg1');
    bg1.displayHeight = this.sys.game.config.height;
    bg1.scaleX = bg1.scaleY;

    const bg2 = this.add.image(width / 2, height / 2, 'bg2');
    bg2.displayHeight = this.sys.game.config.height;
    bg2.scaleX = bg2.scaleY;

    const bg3 = this.add.image(width / 2, height / 2, 'bg3');
    bg3.y = 400;

    const logo = this.add.image(width / 2, 200, 'logo');
    logo.setScale(1.2);

    this.startButton = new Button(
      this,
      width / 2,
      height / 2,
      'btnS1',
      'btnS2',
      'Scene1',
    );

    this.instructionsButton = new Button(
      this,
      width / 2,
      (height / 2) + 100,
      'btnI1',
      'btnI2',
      'Scene2',
    );

    this.scoresButton = new Button(
      this,
      width / 2,
      (height / 2) + 200,
      'btnSC1',
      'btnSC2',
      'Scene3',
    );
  }
}

export default Scene0;