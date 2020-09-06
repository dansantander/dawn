import Phaser from 'phaser';
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
import btnPlay1 from '../../assets/objects/btnPlay1.png';
import btnPlay2 from '../../assets/objects/btnPlay2.png';
import btnMenu1 from '../../assets/objects/btnMenu1.png';
import btnMenu2 from '../../assets/objects/btnMenu2.png';
import titleInstructions2 from '../../assets/bg/titleInstructions2.png';
import titleScores2 from '../../assets/bg/titleScores2.png';
import instructionsRun from '../../assets/bg/instructionsRun.png';
import instructionsJump from '../../assets/bg/instructionsJump.png';
import gameOver from '../../assets/bg/gameOver.png';
/* import formHTML from '../helpers/form.html'; */

class LoadScene extends Phaser.Scene {
  constructor() {
    super('LoadScene');
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
    this.load.image('btnPlay1', btnPlay1);
    this.load.image('btnPlay2', btnPlay2);
    this.load.image('btnMenu1', btnMenu1);
    this.load.image('btnMenu2', btnMenu2);
    this.load.image('titleInstructions2', titleInstructions2);
    this.load.image('instructionsRun', instructionsRun);
    this.load.image('instructionsJump', instructionsJump);
    this.load.image('titleScores2', titleScores2);
    this.load.image('gameOver', gameOver);
    /* this.load.html('formHTML', formHTML); */

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(270, 300, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    const loadingText = this.make.text({
      x: width / 2 - 10,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#fff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2 - 20,
      y: height / 2 + 25,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#fff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(280, 310, 300 * value, 30);
    });

    this.load.on('complete', () => {
      this.scene.start('InstructionsScene');
    });
  }
}

export default LoadScene;