import Phaser from 'phaser';
import apiData from '../../api';
import Button from '../helpers/button';

class Scene3 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene3' });
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

    this.title = this.add.image(width / 2, 100, 'titleScores2');

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

    apiData.getData().then((response) => {
      console.log(response.result);
      response.result.sort((a, b) => b.score - a.score);
      console.log(response.result[0]);
      let listItems = '';

      for (let i = 0; i < 10; i += 1) {
        listItems += `${i + 1}. ${response.result[i].user} : ${response.result[i].score} \n\n`;
      }

      this.fullList = this.add.text(460, 190, listItems, {
        font: '20px monospace',
        fontSize: '26px',
        fill: '#fff',
      });
    });
  }
}

export default Scene3;