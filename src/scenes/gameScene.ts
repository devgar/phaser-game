import Phaser from 'phaser'

import asset_sky from '../assets/sky.png'
import asset_platform from '../assets/platform.png'
import asset_star from '../assets/star.png'
import asset_bomb from '../assets/bomb.png'
import Player from '../sprites/player'

export default class GameScene extends Phaser.Scene {
  constructor () { super('GameScene') }

  player?: Player

  preload() {
    this.load.image('sky', asset_sky)
    this.load.image('ground', asset_platform)
    this.load.image('bomb', asset_bomb)
    this.load.image('star', asset_star)
    this.load.spritesheet(Player.SPRITESHEET)
  }

  create() {
    this.add.image(400, 300, 'sky')

    const platforms = this.physics.add.staticGroup()
    platforms.create(400, 418, 'ground').setScale(2).refreshBody()
    platforms.create(600, 350, 'ground')
    platforms.create(50, 250, 'ground')
    platforms.create(750, 220, 'ground')

    this.player = new Player(this, 220, 200)

    this.physics.add.collider(this.player, platforms)
  }

  update() {
    this.player?.update()
  }
}