import Phaser from 'phaser'

import * as assets from '../assets'
import { ArcadeSpriteType } from '../types'
import Player from '../sprites/player'

export default class GameScene extends Phaser.Scene {
  constructor () { super('GameScene') }

  player?: Player
  score: number = 0
  scoreText?: Phaser.GameObjects.Text
  
  collectStar: ArcadePhysicsCallback = (_player, star) => {
    (<ArcadeSpriteType>star).disableBody(true, true)
    this.score += 10
    this.scoreText?.setText(`Score: ${this.score}`)
  }

  async preload() {
    this.load.image('sky', assets.sky)
    this.load.image('ground', assets.platform)
    this.load.image('bomb', assets.bomb)
    this.load.image('star', assets.star)
    this.load.spritesheet(Player.SPRITESHEET)
  }

  create() {
    this.add.image(400, 300, 'sky')
    
    const platforms = this.physics.add.staticGroup()
    platforms.create(400, 418, 'ground').setScale(2).refreshBody()
    platforms.create(600, 350, 'ground')
    platforms.create(50, 250, 'ground')
    platforms.create(750, 220, 'ground')
    
    const stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    })
    stars.children.iterate(child => (<ArcadeSpriteType>child).setBounceY(0.2))

    this.player = new Player(this, 100, 300)

    this.physics.add.collider(stars, platforms)    
    this.physics.add.collider(this.player, platforms)
    this.physics.add.overlap(this.player, stars, this.collectStar)
    
    this.scoreText = this.add.text(16, 16, 'score: 0')
  }

  update = () => this.player?.update()
}