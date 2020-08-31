import Phaser from 'phaser';

class Hero extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.alive = true;
    this.setScale(2);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.createMoves();
  }

  /* this.player.anims.play('left', true); */
  createMoves() {
    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNumbers('heroRun', { start: 0, end: 8 }),
      frameRate: 20,
      repeat: -1,
    });
  }
}

export default Hero;