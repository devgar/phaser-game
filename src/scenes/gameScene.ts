import Phaser from 'phaser'

import asset_sky from '../assets/sky.png'
import asset_platform from '../assets/platform.png'
import asset_star from '../assets/star.png'
import asset_bomb from '../assets/bomb.png'
import Player from '../sprites/player'

export default class GameScene extends Phaser.Scene {
  constructor () { super('GameScene') }

  platforms?: Phaser.Physics.Arcade.StaticGroup
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

    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(400, 410, 'ground').setScale(2).refreshBody()
    this.platforms.create(600, 350, 'ground')
    this.platforms.create(50, 250, 'ground')
    this.platforms.create(750, 220, 'ground')

    this.player = new Player(this, 220, 200)

    this.physics.add.collider(this.player, this.platforms)
  }

  update() {
    this.player?.update()
  }
}