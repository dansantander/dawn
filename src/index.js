import Phaser from 'phaser';
import LoadScene from './modules/scenes/loadScene';
import MenuScene from './modules/scenes/menuScene';
import GameScene from './modules/scenes/gameScene';
import InstructionsScene from './modules/scenes/instructionsScene';
import ScoresScene from './modules/scenes/scoresScene';
import GameOver from './modules/scenes/gameOver';

const config = {
  type: Phaser.AUTO,
  width: 1100,
  height: 720,
  parent: 'divld',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: false,
    },
  },
  scene: [LoadScene, MenuScene, GameScene, InstructionsScene, ScoresScene, GameOver],
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
