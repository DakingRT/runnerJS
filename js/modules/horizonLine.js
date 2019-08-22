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


export default class horizonLine {
    static dimensions = {
        WIDTH: 600,
        HEIGHT: 12,
        YPOS: 127
    };

    constructor(canvas, spritePos) {
        this.spritePos = spritePos;
        this.canvas = canvas;
        this.sourceDimensions = {};
        this.canvasCtx = canvas.getContext('2d');
        this.dimensions = horizonLine.dimensions;
        this.sourceXPos = [
            this.spritePos.x,
            this.spritePos.x + this.dimensions.WIDTH
        ];
        this.xPos = [];
        this.yPos = 0;
        this.init();
    }

    init() {

        this.setSourceDimensions();
        /*console.log (this.dimensions);
        console.log (this.sourceDimensions);*/
        this.draw();
    }

    /**
     * Set the source dimensions of the horizon line.
     */
    setSourceDimensions() {
        /* eslint-disable-next-line */
        for (const dimension in this.dimensions) {
            this.sourceDimensions[dimension] = this.dimensions[dimension];
        }

        this.xPos = [0, this.dimensions.WIDTH];
        this.yPos = this.dimensions.YPOS;
    }


    /**
     * Update the horizon line.
     * @param {number} deltaTime
     * @param {number} speed
     */
    update(deltaTime, speed) {

        //console.log({speed: speed, fps: getFPS(), Delta: deltaTime});
        //const increment = Math.floor(speed * (getFPS() / 1000) * deltaTime);
        const increment = Math.floor(speed);
        console.log("xpos:" + this.xPos[0], "xpos1:"+ this.xPos[1]);
        if (this.xPos[0] <= 0) {
            this.updateXPos(0, increment);
        } else {
            this.updateXPos(1, increment);
        }
        this.draw();
    }

    /**
     * Update the x position of an indivdual piece of the line.
     * @param {number} pos Line position.
     * @param {number} increment
     */
    updateXPos(pos, increment) {
        const line1 = pos;
        const line2 = pos === 0 ? 1 : 0;

        this.xPos[line1] -= increment;
        this.xPos[line2] = this.xPos[line1] + this.dimensions.WIDTH;
        if (this.xPos[line1] <= -this.dimensions.WIDTH) {
            this.xPos[line1] = this.xPos[line2] + this.dimensions.WIDTH;
        }
    }

    draw() {

        this.canvasCtx.drawImage(
            getImageSprite(),
            this.sourceXPos[0],
            this.spritePos.y,
            this.sourceDimensions.WIDTH,
            this.sourceDimensions.HEIGHT,
            this.xPos[0],
            this.yPos,
            this.dimensions.WIDTH,
            this.dimensions.HEIGHT
        );
        this.canvasCtx.drawImage(
            getImageSprite(),
            this.sourceXPos[1],
            this.spritePos.y,
            this.sourceDimensions.WIDTH,
            this.sourceDimensions.HEIGHT,
            this.xPos[1],
            this.yPos,
            this.dimensions.WIDTH,
            this.dimensions.HEIGHT
        );


    }
}
