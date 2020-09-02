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
      font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle',
    };

    this.add.text(0, 0, 'phaser 2.4 text bounds', style);

    console.log(apiData.getData());

    apiData.getData().then((result) => {
      console.log(result);
      /*  const style = {
        font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle',
      };

      let name = result[0].user;
      let score = result[0].score;

      name = this.add.text(400, 400, style);
      name.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

      score = this.add.text(400, 400, style);
      score.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2); */


      /*  const scoreContainer = document.createElement('div');

      const playerDiv = document.createElement('div');
      playerDiv.classList.add('player');
      scoreContainer.appendChild(playerDiv);

      const namePlayer = document.createElement('h3');
      namePlayer.classList.add('nameRecord');
      playerDiv.appendChild(namePlayer);
      playerDiv.textContent = result[0].user;

      const scorePlayer = document.createElement('h3');
      scorePlayer.classList.add('scoreRecord');
      playerDiv.appendChild(scorePlayer);
      scorePlayer.textContent = result[0].score; */
    });
  }
}

export default Scene3;