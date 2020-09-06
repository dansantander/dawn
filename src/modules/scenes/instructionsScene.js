import Phaser from 'phaser';
import Button from '../helpers/button';

class InstructionsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'InstructionsScene' });
  }

  create() {
    const { width } = this.game.scale;
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

    this.title = this.add.image(width / 2, 100, 'titleInstructions');

    this.menuButton = new Button(
      this,
      80,
      650,
      'btnMenu1',
      'btnMenu2',
      'MenuScene',
    );

    this.playButton = new Button(
      this,
      1020,
      650,
      'btnPlay1',
      'btnPlay2',
      'GameScene',
    );
  }
}

export default InstructionsScene;