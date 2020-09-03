import Phaser from 'phaser';
import Scene0 from './modules/scenes/scene0';
import Scene1 from './modules/scenes/scene1';
import Scene2 from './modules/scenes/scene2';
import Scene3 from './modules/scenes/scene3';

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
  scene: [Scene1, Scene0, Scene2, Scene3],
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
