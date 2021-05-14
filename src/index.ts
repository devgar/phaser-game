import Phaser from 'phaser'

import config from './config'

type SceneArray = (typeof Phaser.Scene)[]

const reorderScenes = (scenes: SceneArray): SceneArray => {
  const params = new URLSearchParams(window.location.search.slice(1))
  const sceneName = params.get('scene')
  if (!sceneName) return scenes
  const scene = scenes.find(s => s.name === sceneName)
  if (!scene) return scenes
  return [scene, ...scenes.filter(s => s.name !== sceneName)]
}

config.scene = reorderScenes(<SceneArray>config.scene)

new Phaser.Game(config)
