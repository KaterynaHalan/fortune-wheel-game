import * as PIXI from 'pixi.js';
import {shuffle} from '../helpers/randomHelper';

class Wheel {
    constructor(app, options) {
        this.app = app;
        this.options = options;

        this.externalCircle = null;
        this.bottom = null;
        this.spinner = null;
        this.internalCircle = null;
        this.numbers = [];

        this.EXTERNAL_CIRCLE_Y = 40;
    }

    createBottom() {
        this.bottom = PIXI.Sprite.from('bottom');
        this.bottom.x = this.externalCircle.x;
        this.bottom.y = this.externalCircle.height;
        this.bottom.anchor.set(0.5, 0);
    }

    createExternalCircle() {
        this.externalCircle = PIXI.Sprite.from('external_circle');

        this.externalCircle.x = this.app.screen.width * 0.5;
        this.externalCircle.y = this.EXTERNAL_CIRCLE_Y + this.externalCircle.height / 2;
        this.externalCircle.anchor.set(0.5);
    }

    createSpinner() {
        this.spinner = PIXI.Sprite.from('spinner');
        this.spinner.x = this.app.screen.width * 0.5;
        this.spinner.anchor.set(0.5, 0);
    }

    createInternalCircle() {
        this.internalCircle = PIXI.Sprite.from('internal_circle');
        this.internalCircle.x = this.externalCircle.x;
        this.internalCircle.y = this.externalCircle.height / 2 + this.EXTERNAL_CIRCLE_Y;
        this.internalCircle.anchor.set(0.5);
    }

    createNumbers () {
        const radius = this.externalCircle.height / 2 - 30;
        const numberOfSectors = this.options.numbers.length;
        const piTwo = Math.PI * 2;
        const radiansPerSector = piTwo / numberOfSectors;
        this.numbers = shuffle(this.options.numbers);

        this.numbers.forEach((number, index) => {
            const text = new PIXI.Text(number);

            const rotation = index * radiansPerSector + radiansPerSector / 2 - radiansPerSector * 3;
            const textAnchorPercentage = (radius - 20 / 2) / radius;

            text.anchor.set(0.5, 0.5);
            text.rotation = rotation + Math.PI - 1.55;
            text.position.x = radius * textAnchorPercentage * Math.cos(rotation);
            text.position.y = radius * textAnchorPercentage * Math.sin(rotation);

            this.externalCircle.addChild(text);
        });
    }

    createWheel() {
        this.createExternalCircle();
        this.createBottom();
        this.createSpinner();
        this.createInternalCircle();
        this.createNumbers();

        this.app.stage.addChild(this.bottom, this.externalCircle, this.spinner, this.internalCircle);
    }
}

export default Wheel;