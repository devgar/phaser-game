import Phaser from 'phaser'

import game_sky from '../assets/sky.png'
import game_platform from '../assets/platform.png'
import game_star from '../assets/star.png'
import game_bomb from '../assets/bomb.png'
import game_dude from '../assets/dude.png'

export default class GameScene extends Phaser.Scene {
  constructor () { super('GameScene') }

  platforms?: Phaser.Physics.Arcade.StaticGroup
  player?: Phaser.Physics.Arcade.Sprite

  preload() {
    this.load.image('sky', game_sky)
    this.load.image('ground', game_platform)
    this.load.image('bomb', game_bomb)
    this.load.image('star', game_star)
    this.load.spritesheet('dude', game_dude, {
       frameWidth: 32, frameHeight: 48
    })
  }

  create() {
    const sky = this.add.image(400, 300, 'sky')

    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(400, 410, 'ground').setScale(2).refreshBody()
    this.platforms.create(600, 350, 'ground')
    this.platforms.create(50, 250, 'ground')
    this.platforms.create(750, 220, 'ground')

    this.player = this.physics.add.sprite(220, 200, 'dude')
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)

    this.anims.create({
      key: 'left', 
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10, 
      repeat: -1,
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right', 
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })

    this.physics.add.collider(this.player, this.platforms)
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys()

    if (!this.player) return

    if (cursors.left.isDown) {
        this.player.setVelocityX(-160)
        this.player.anims.play('left', true)
    } else if (cursors.right.isDown) {
        this.player.setVelocityX(160)
        this.player.anims.play('right', true)
    } else {
        this.player.setVelocityX(0)
        this.player.anims.play('turn')
    }

    if (cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330)
    }
  }
}