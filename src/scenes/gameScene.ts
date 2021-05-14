import Phaser from 'phaser'

import game_sky from '../assets/sky.png'
import game_platform from '../assets/platform.png'
import game_star from '../assets/star.png'
import game_bomb from '../assets/bomb.png'

export default class GameScene extends Phaser.Scene {
  constructor () { super('GameScene') }

  platforms?: Phaser.Physics.Arcade.StaticGroup

  preload() {
    this.load.image('sky', game_sky)
    this.load.image('ground', game_platform)
    this.load.image('bomb', game_bomb)
    this.load.image('star', game_star)
  }

  create() {
    const sky = this.add.image(400, 300, 'sky')
    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()
    this.platforms.create(600, 400, 'ground')
    this.platforms.create(50, 250, 'ground')
    this.platforms.create(750, 220, 'ground')
  }
}