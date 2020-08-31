import Phaser from 'phaser';

class Button extends Phaser.GameObjects.Container {
  /* eslint-disable */
  constructor(scene, x, y, texture1, texture2, targetScene) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.image(0, 0, texture1).setInteractive();

    this.add(this.button);

    this.button.on('pointerdown', () => {
      this.scene.scene.start(targetScene);
    });

    this.button.on('pointerover', () => {
      console.log('over')
      this.button.setTexture(texture1);
    });
    
    this.button.on('pointerout', () => {
      console.log('out')
      this.button.setTexture(texture2); 
    });

    this.scene.add.existing(this);
  }
}

export default Button;