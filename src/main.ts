import Phaser from 'phaser'

import MainScene from './scenes/MainScene';
const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 330 },
			debug: true
		}
	},
	scene: [MainScene],

	
}

export default new Phaser.Game(config)
