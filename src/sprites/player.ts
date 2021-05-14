import Phaser from 'phaser'

import asset_dude from '../assets/dude.png'

const KEY = 'CLASS::PLAYER' ||Symbol('Class::Player').toString()

export default class Player extends Phaser.Physics.Arcade.Sprite {
  static SPRITESHEET: Phaser.Types.Loader.FileTypes.SpriteSheetFileConfig = {
    key: KEY, 
    url: asset_dude, 
    frameConfig: { frameWidth: 32, frameHeight: 48 },
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, KEY)

    this.scene.add.existing(this).scene.physics.add.existing(this)
    this.setBounce(0.2).setCollideWorldBounds(true)

    this.anims.create({
      key: 'left', 
      frames: this.anims.generateFrameNumbers(KEY, { start: 0, end: 3 }),
      frameRate: 10, 
      repeat: -1,
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: KEY, frame: 4 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right', 
      frames: this.anims.generateFrameNumbers(KEY, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })
  }

  update() {
    const cursors = this.scene.input.keyboard.createCursorKeys()

    if (cursors.left.isDown) {
        this.setVelocityX(-160)
        this.anims.play('left', true)
    } else if (cursors.right.isDown) {
        this.setVelocityX(160)
        this.anims.play('right', true)
    } else {
        this.setVelocityX(0)
        this.anims.play('turn')
    }

    if (cursors.up.isDown && this.body.touching.down)
    {
        this.setVelocityY(-330)
    }
  }
}
