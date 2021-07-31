import * as PIXI from 'pixi.js';
import Game from './components/Game';

const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);

app.loader
	.add('background', './assets/background.jpg')
	.add('external_circle', './assets/external_circle.png')
	.add('internal_circle', './assets/internal_circle.png')
	.add('spinner', './assets/spinner.png')
	.add('bottom', './assets/bottom.png')
	.add('round_yellow', './assets/round_yellow.png')
	.load(onAssetsLoaded);


function onAssetsLoaded () {
	const wheel = new Game(app, {
		buttons: [
			{ button: 1, multiplier: 2 },
			{ button: 3, multiplier: 3 },
			{ button: 5, multiplier: 6 },
		],
		spinTime: 3,
		numbers: [1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 5, 5],
		balance: 200,
		bet: 5
	});
	wheel.createGame();
}