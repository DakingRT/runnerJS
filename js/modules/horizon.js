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
import horizonLine from './horizonLine.js';


export default class horizon {

    constructor(canvas, spriteDefinition) {
        this.spriteDefinition = spriteDefinition;
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');
        this.horizonLine;
        this.init();
    }

    /**
     * Initialise the horizon. Just add the line and a cloud. No obstacles.
     */
    init() {
        this.horizonLine = new horizonLine(this.canvas, this.spriteDefinition.FLOOR);
    }

    /**
     * Update the horizon line.
     * @param {number} deltaTime
     * @param {number} speed
     */
    update(deltaTime, speed) {
        this.horizonLine.update(deltaTime, speed);
    }

}
