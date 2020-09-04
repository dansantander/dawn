import Phaser from 'phaser';
import Button from '../helpers/button';

class Scene0 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene0' });
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