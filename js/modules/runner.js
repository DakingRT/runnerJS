import {
	CANVAS_WIDTH,
	CANVAS_HEIGHT
} from '../constants.js';
import {
	getImageSprite,
	loadImageSprite
} from './sprite.js';
import { getFPS } from './runTime.js';


export default class runner {
	static config = {
		DROP_VELOCITY: -5,
		GRAVITY: 0.6,
		HEIGHT: 47,
		HEIGHT_DUCK: 25,
		INIITAL_JUMP_VELOCITY: -10,
		MAX_JUMP_HEIGHT: 30,
		MIN_JUMP_HEIGHT: 30,
		SPEED_DROP_COEFFICIENT: 3,
		SPRITE_WIDTH: 262,
		START_X_POS: 50,
		WIDTH: 44,
		WIDTH_DUCK: 59
	};

	static status = {
		CRASHED: {
			name: "CRASHED",
			frames: [220],
			msPerFrame: 1000 / 60
		},
		DUCKING: {
			name: "DUCKING",
			frames: [262, 321],
			msPerFrame: 1000 / 8
		},
		JUMPING: {
			name: "JUMPING",
			frames: [0],
			msPerFrame: 1000 / 60
		},
		RUNNING: {
			name: "RUNNING",
			frames: [88, 132],
			msPerFrame: 1000 / 12
		},
		WAITING: {
			name: "WAITING",
			frames: [44, 0],
			msPerFrame: 1000 / 3
		}
	};

	constructor(canvas, spritePos) {
		this.canvas = canvas;
		this.canvasCtx = canvas.getContext('2d');
		this.spritePos = spritePos;
        this.groundYPos = 0;  // Position when on the ground.
		this.xPos = 0;
		this.yPos = 0;
		this.config = runner.config;
		this.status = runner.status["WAITING"].name; //Current status
		this.currentFrame = 0;
		this.msPerFrame = runner.status["WAITING"].msPerFrame;
		this.currentAnimFrames = runner.status["WAITING"].frames;
		this.animStartTime = 0;
		this.init();

	}

	/**
	 * runner player initaliser.
	 */
	init() {
        /*this.groundYPos = CANVAS_HEIGHT - this.config.HEIGHT - RUNNER_BOTTOM_PAD;*/
        this.yPos = this.groundYPos;
		this.draw(0, 0);
		this.update(this.status);
	}

	update(status) {
        console.log(status);
		// Update the status.
		if (status) {
			this.status = status;
			this.currentFrame = 0;
			this.msPerFrame = runner.status[status].msPerFrame;
			this.currentAnimFrames = runner.status[status].frames;
			/*
			if (status === "WAITING" ) {
			  this.animStartTime = getTimeStamp();
			}*/
		}

        this.draw(this.currentAnimFrames[this.currentFrame], 0);

	}

	/**
	 * Draw the runner to a particular position.
	 * @param {number} x
	 * @param {number} y
	 */
	draw(x, y) {
		let sourceX = x;
		let sourceY = y;
		// Adjustments for sprite sheet position.
		sourceX += this.spritePos.x;
		sourceY += this.spritePos.y;
		let sourceWidth = this.config.WIDTH;
		let sourceHeight = this.config.HEIGHT;
		//console.log({sourcex : sourceX, sourceY: sourceY, sourceWidth: sourceWidth, sourceHeight: sourceHeight, posx: this.xPos, posy: this.yPos, "configWidth": this.config.WIDTH, "configHeight": this.config.HEIGHT });
		// Standing / running
		this.canvasCtx.drawImage(
			getImageSprite(),
			sourceX,
			sourceY,
			sourceWidth,
			sourceHeight,
			this.xPos,
			this.yPos,
			this.config.WIDTH,
			this.config.HEIGHT
		);
	}

	/*initCanvas() {
	    // Create the canvas
	    var canvas = document.createElement("CANVAS");
	    var ctx = canvas.getContext('2d');
	    canvas.width = "600";
	    canvas.height = "200";
	    canvas.style.cssText = "border: 1px solid black"
	    document.body.appendChild(canvas);
	}*/

}
