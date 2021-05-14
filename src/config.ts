import { Types } from 'phaser'

import LogoScene from './scenes/logoScene'
import GameScene from './scenes/gameScene'

const buildConfig = (cfg: Types.Core.GameConfig): Types.Core.GameConfig => cfg

export default buildConfig({
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
})
