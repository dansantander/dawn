import Phaser from 'phaser';
import bg0 from '../../assets/bg/background_0.png';
import bg1 from '../../assets/bg/background_1.png';
import bg2 from '../../assets/bg/background_2.png';
import apiData from '../../api';

class Scene3 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene3' });
  }

  preload() {
    this.load.image('bg0', bg0);
    this.load.image('bg1', bg1);
    this.load.image('bg2', bg2);
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

    const style = {
      font: '32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle',
    };

    this.add.text(0, 0, 'phaser 2.4 text bounds', style);

    apiData.getData().then((response) => {
      console.log(response.result[0]);
      const sortedResponse = response.result.sort((a, b) => b.score - a.score);
      console.log(response.result[0]);

      for (let i = 0; i < 5; i += 1) {
        this.add.text(550, (i + 1) * 50, `${i + 1}. ${response.result[i].user} : ${response.result[i].score}`, style);
      }
    });
  }
}

export default Scene3;