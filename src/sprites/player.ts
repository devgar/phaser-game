import Phaser from 'phaser'

import asset_dude from '../assets/dude.png'
import { Animation, ArcadeSprite } from '../types'

const KEY = 'CLASS::PLAYER' // Symbol('Class::Player').toString()

export default class Player extends ArcadeSprite {
  static SPRITESHEET: Phaser.Types.Loader.FileTypes.SpriteSheetFileConfig = {
    key: KEY, 
    url: asset_dude, 
    frameConfig: { frameWidth: 32, frameHeight: 48 },
  }

  #cursors: Phaser.Types.Input.Keyboard.CursorKeys
  #jumpStartTime?: number

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, KEY)

    this.#cursors = this.scene.input.keyboard.createCursorKeys()
    this.scene.add.existing(this).scene.physics.add.existing(this)
    this.setBounce(0.2).setCollideWorldBounds(true)

    const animations = [{
      key: 'left', 
      frames: this.anims.generateFrameNumbers(KEY, { start: 0, end: 3 }),
      frameRate: 10, 
      repeat: -1,
    }, {
      key: 'turn',
      frames: [{ key: KEY, frame: 4 }],
      frameRate: 20,
    }, {
      key: 'right', 
      frames: this.anims.generateFrameNumbers(KEY, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    }]
    animations.forEach((animData: Animation) =>  this.anims.create(animData))
  }

  update() {
    const Dx = this.body.velocity.x

    if (this.#cursors.left.isDown) {
      this.setAccelerationX(Dx > 0 ? -600 : Dx > -150 ? -300 : 0)
      if (Dx <= -150) this.setVelocityX(-150)
      this.anims.play('left', true)
    } else if (this.#cursors.right.isDown) {
      this.setAccelerationX(Dx < 0 ? 600 : Dx < 150 ? 300 : 0)
      if (Dx >= 150) this.setVelocityX(150)
      this.anims.play('right', true)
    } else {
      this.setAccelerationX(Dx > 0 ? -300 : Dx < 0 ? 300 : 0)
      if (Dx < 1 && Dx > -1) this.setVelocityX(0)
      this.anims.play('turn')
    }

    if (this.#cursors.up.isDown) {
      const now = Date.now()
      if (this.body.touching.down) {
        this.setVelocityY(-200)
        this.#jumpStartTime = now
      }
      else if (this.#jumpStartTime && this.#jumpStartTime > (now - 500)) {
        this.setVelocityY(-200)
      }
    } else if (this.#jumpStartTime) {
      this.#jumpStartTime = undefined
    }
  }
}
