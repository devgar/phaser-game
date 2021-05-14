import Phaser from 'phaser'

import logoImg from '../assets/logo.png'

export default class LogoScene extends Phaser.Scene {
  constructor () { super('LogoScene') }

  preload() {
    this.load.image("logo", logoImg)
  }

  create() {
    const logo = this.add.image(400, 150, "logo")

    logo.setScale(0.5, 0.5)

    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1,
    })

    this.input.once('pointerdown', () => {
      this.scene.start('GameScene')
    })
  }
}