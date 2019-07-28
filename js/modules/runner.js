import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT
} from '../constants.js';
import {
    getImageSprite,
    loadImageSprite
} from './sprite.js';
import {
    getFPS
} from './runTime.js';


export default class runner {
    static config = {
        GRAVITY: 0.6,
        HEIGHT: 47,
        JUMP_HEIGHT: 9.5,
        SPRITE_WIDTH: 262,
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
        this.groundYPos = 90; // Position when on the ground.
        this.xPos = 25;
        this.yPos = this.groundYPos;
        this.config = runner.config;
        this.status = runner.status["RUNNING"].name; //Current status
        this.currentFrame = 0;
        this.msPerFrame = runner.status["RUNNING"].msPerFrame;
        this.currentAnimFrames = runner.status["RUNNING"].frames;

        //Control Jump
        this.jumping = false;
        this.jumpVelocity = 0;
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
        // Update the status.
        if (status) {
            console.log(status);
            this.status = status;
            this.currentFrame = 0;
            this.msPerFrame = runner.status[status].msPerFrame;
            this.currentAnimFrames = runner.status[status].frames;
        }

        if (this.jumping) {
            this.updateJump();
        }
        this.draw(this.currentAnimFrames[this.currentFrame], 0);

    }

    /**
     * Initialise a jump.
     * @param {number} speed
     */
    startJump() {
        if (!this.jumping) {
            this.update("JUMPING");
            // Tweak the jump velocity based on the speed.
            this.jumping = true;
            this.jumpVelocity = this.config.JUMP_HEIGHT;
        }
    }

    updateJump() {
        if (this.jumping) {
            console.log("JumpVelocity:" + this.jumpVelocity + "Ypos:" + this.yPos);
            this.jumpVelocity -= this.config.GRAVITY;
            this.yPos -= this.jumpVelocity;
        }

        if (this.yPos >= this.groundYPos ) {
            this.jumping = 0;
            this.yPos = this.groundYPos;
            this.jumpVelocity = 0;
        }

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
