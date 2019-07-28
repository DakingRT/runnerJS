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


export default class floor {
    static dimensions = {
        WIDTH: 600,
        HEIGHT: 12,
        YPOS: 127
    };

    constructor(canvas, spritePos) {
        this.spritePos = spritePos;
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');
        this.dimensions = floor.dimensions;
        this.sourceXPos = [
            this.spritePos.x,
            this.spritePos.x + this.dimensions.WIDTH
        ];
        this.xPos = [];
        this.yPos = 0;
        this.init();
    }

    init () {
        this.draw();
    }

    update() {
        this.draw();

    }

    draw() {
        console.log("entradRAW");
        this.canvasCtx.drawImage(
            getImageSprite(),
            this.spritePos.x,
            this.spritePos.y,
            this.dimensions.WIDTH,
            this.dimensions.HEIGHT,
            0,
            120, 
            this.dimensions.WIDTH,
            this.dimensions.HEIGHT
        );
/*/
        this.canvasCtx.drawImage(
            getImageSprite(),
            this.sourceXPos[1],
            this.spritePos.y,
            this.dimensions.WIDTH,
            this.dimensions.HEIGHT,
            this.xPos[1],
            this.yPos,
            this.dimensions.WIDTH,
            this.dimensions.HEIGHT
        );*/
    }
}
