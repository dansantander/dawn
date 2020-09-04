import Phaser from 'phaser';
import LoadScene from './modules/scenes/loadScene';
import Scene0 from './modules/scenes/scene0';
import Scene1 from './modules/scenes/scene1';
import Scene2 from './modules/scenes/scene2';
import Scene3 from './modules/scenes/scene3';
import GameOver from './modules/scenes/gameOver';

const config = {
  type: Phaser.AUTO,
  width: 1100,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: false,
    },
  },
  scene: [LoadScene, Scene0, Scene1, Scene2, Scene3, GameOver],
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
