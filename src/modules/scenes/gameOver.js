import Phaser from 'phaser';
import Button from '../helpers/button';
import formHTML from '../helpers/form.html';
import API from '../../api';

class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  create(score) {
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

    const inputScore = this.add.dom(width / 2, height / 2).createFromHTML(formHTML);
    document.clear();
    this.cont = this.add.container(0, 0);
    this.cont.add(inputScore);

    const savedScore = document.querySelector('#score');
    savedScore.innerHTML = score.score;

    const name = document.querySelector('#nameInput');
    const submitBtn = document.querySelector('#submitBtn');

    submitBtn.addEventListener('click', () => {
      const savedName = name.value;
      if (savedName === '') {
        name.placeholder = 'Field can not be empty';
      } else {
        API.storeData(savedName, savedScore);
        this.scene.start('Scene3');
      }
    });
  }
}

export default GameOver;