import { Enemy } from "./enemy";
import { Player } from "./player";
import { EnemyHandler } from "./enemyHandler";
import { Shot } from "./shot";
import { GameSettings } from "./game-settings";
import { BehaviorSubject, Observable, timer } from "rxjs";

// timer(7000, 7000).subscribe(() => {
// 	for (let i = 0; i < 15; i++) {
// 		enemyHandler.addEnemy(
// 			new Enemy(
// 				context,
// 				shots,
// 				enemyHandler,
// 				settings.zoom,
// 				i * spaceBetween,
// 				0
// 			)
// 		);
// 	}
// });

const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
	document.getElementById("jkonsInvader")
);
const context: CanvasRenderingContext2D = canvas.getContext(
	"2d"
) as CanvasRenderingContext2D;

// TODO Maybe changing to enemy rows
const enemyHandler: EnemyHandler = new EnemyHandler(context);
const settings: GameSettings = new GameSettings(canvas);
context.imageSmoothingEnabled = false;

let shots = new Array();
let players = new Array();
let gameStarted: boolean = false;
let actualScore: number = 0;
let scoreElement: HTMLOutputElement = <HTMLOutputElement>(
	document.getElementById("score")
);
let animationSpeed: number = 1 / 60;
// ! Should not be, but dummy enemy for zoom and tile size, till game settings and tile config is created.
const player = newPlayer("a", "d", " ");

const enemy: Enemy = new Enemy(context, shots, enemyHandler, 1, 0, 0);
const spaceBetween = settings.zoom * enemy.tileWidth;
export function init() {
	document.addEventListener("keyup", (keyboard) => {
		switch (keyboard.key) {
			case "r":
				if (gameStarted === false) {
					gameStarted = true;
					animate();
				} else {
					init();
				}
				break;

			default:
				gameStarted = false;
				break;
		}
	});
}

for (let i = 0; i < 15; i++) {
	enemyHandler.addEnemy(
		new Enemy(context, shots, enemyHandler, settings.zoom, i * spaceBetween, 0)
	);
}

export function gameOver() {}

function animate(): void {
	setTimeout(() => {
		player.handleInput();
		enemyHandler.moveEnemies();
		for (let j = 0; j < shots.length; j++) {
			shots[j].shootAnimation();
		}
		requestAnimationFrame(animate);
	}, animationSpeed);
}

export function score() {
	actualScore++;
	// scoreElement.value = actualScore.toString();
}

function newPlayer(left: string, right: string, fire: string): Player {
	const shot: Shot = new Shot(context);
	const player: Player = new Player(
		context,
		shot,
		left,
		right,
		fire,
		settings.zoom
	);

	shots.push(shot);
	players.push(player);

	return player;
}

init();
