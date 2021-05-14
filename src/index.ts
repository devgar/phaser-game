import Phaser from 'phaser'

import LogoScene from './scenes/logoScene'
import GameScene from './scenes/gameScene'

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 450,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [LogoScene, GameScene],
}

new Phaser.Game(config)
