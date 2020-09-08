import Phaser from 'phaser';
import LoadScene from '../../src/modules/scenes/loadScene';
import MenuScene from '../../src/modules/scenes/menuScene';
import GameScene from '../../src/modules/scenes/gameScene';
import InstructionsScene from '../../src/modules/scenes/instructionsScene';
import ScoresScene from '../../src/modules/scenes/scoresScene';
import GameOver from '../../src/modules/scenes/gameOver';

const game = (() => {
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
  return { game };
})();

export default game;