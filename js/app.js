import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT
} from './constants.js';
import runner from './modules/runner.js';
import floor from './modules/floor.js';

import {
    getImageSprite,
    loadImageSprite
} from './modules/sprite.js';
import {
    getFPS
} from './modules/runTime.js';


class app {

    //Sprite Coordenates
    static spriteDefinition = {
        RESTART: {
            x: 2,
            y: 2
        },
        FLOOR: {
            x: 2,
            y: 54
        },
        CLOUD: {
            x: 86,
            y: 2
        },
        CACTUS_LARGE: {
            x: 332,
            y: 2
        },
        CACTUS_SMALL: {
            x: 228,
            y: 2
        },
        PTERODACTYL: {
            x: 134,
            y: 2
        },
        TEXT_SPRITE: {
            x: 655,
            y: 2
        },
        TREX: {
            x: 848,
            y: 2
        }
    };

    constructor(container) {
        this.dimensions = {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT
        }

        this.canvas = null;
        this.canvasCtx = null;
        this.runner = null;
        this.container = container;
        this.fps = getFPS();
        this.version = "1.0.0";
        this.init();
    }

    async init() {
        //We wait for a promise :)
        await loadImageSprite();
        //this.spriteDef = Runner.spriteDefinition;

        //Canvas definition
        this.canvas = this.createCanvas(
            this.container,
            this.dimensions.width,
            this.dimensions.height,
        );

        this.canvasCtx = this.canvas.getContext('2d');
        this.canvasCtx.fillStyle = '#f7f7f7';
        this.canvasCtx.fill();
        this.startListening();
        this.runner = new runner(this.canvas, app.spriteDefinition.TREX);
        this.floor = new floor(this.canvas, app.spriteDefinition.FLOOR);

        this.loopUpdate();
    }

    update() {
        this.clearCanvas();
        this.runner.update();
        this.floor.update();

    }


    loopUpdate() {
        var that = this;
        setTimeout(function() {
            //Code exec
            that.update();
            requestAnimationFrame(function() {
                that.loopUpdate();
            });
        }, 1000 / this.fps);
    }


    createCanvas(container, width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        container.appendChild(canvas);
        return canvas;
    }

    clearCanvas() {
        this.canvasCtx.clearRect(
            0,
            0,
            this.dimensions.width,
            this.dimensions.height
        );
    }


    //Event Handler
    startListening() {
        document.addEventListener("keydown", (e) => {
            this.onKeyDown(e);
        });
    }

    onKeyDown(e) {
        //Space Bar (32)
        if (e.keyCode == 32) {
            console.log("salta");
            this.runner.startJump();
        }
    }

}


var appIns = new app(document.querySelector("#app"));
