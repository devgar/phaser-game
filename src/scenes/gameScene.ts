import Phaser from 'phaser'

import asset_sky from '../assets/sky.png'
import asset_platform from '../assets/platform.png'
import asset_star from '../assets/star.png'
import asset_bomb from '../assets/bomb.png'
import Player from '../sprites/player'

type ArcadeSprite = Phaser.Physics.Arcade.Sprite

export default class GameScene extends Phaser.Scene {
  constructor () { super('GameScene') }

  player?: Player
  score: number = 0
  scoreText?: Phaser.GameObjects.Text
  
  collectStar: ArcadePhysicsCallback = (_player, star) => {
    (<ArcadeSprite>star).disableBody(true, true)
    this.score += 10
    this.scoreText?.setText(`Score: ${this.score}`)
  }

  preload() {
    this.load.image('sky', asset_sky)
    this.load.image('ground', asset_platform)
    this.load.image('bomb', asset_bomb)
    this.load.image('star', asset_star)
    this.load.spritesheet(Player.SPRITESHEET)
  }

  create() {
    this.add.image(400, 300, 'sky')

    this.scoreText = this.add.text(16, 16, 'score: 0')

    const platforms = this.physics.add.staticGroup()
    platforms.create(400, 418, 'ground').setScale(2).refreshBody()
    platforms.create(600, 350, 'ground')
    platforms.create(50, 250, 'ground')
    platforms.create(750, 220, 'ground')

    this.player = new Player(this, 220, 200)

    this.physics.add.collider(this.player, platforms)
    
    const stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    })
    stars.children.iterate(function (child) {
      (<ArcadeSprite>child).setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    this.physics.add.collider(stars, platforms)
    this.physics.add.overlap(this.player, stars, this.collectStar)
  }

  update() {
    this.player?.update()
  }
}