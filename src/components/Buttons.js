import * as PIXI from 'pixi.js';

class Buttons {
    constructor(container, buttons, onStartSpin) {
        this.buttons = buttons;
        this.container = container;
        this.onStartSpin = onStartSpin;
        this.buttonsSprite = [];

        this._pressedBtn = null;
        this.defaultTint = null;
    }

    get pressedBtn() {
        return this._pressedBtn;
    }

    set pressedBtn(val) {
        this._pressedBtn = val;
    }

    disableAll() {
        this.buttonsSprite.forEach(btn => {
            btn.interactive = false;
            btn.tint = 0x7C7C7C;
        });
    }

    enableAll() {
        this.buttonsSprite.forEach(btn => {
            btn.interactive = true;
            btn.tint = this.defaultTint;
        });
    }

    createButtons() {
        this.buttons.forEach((button, idx) => {
            const btn = PIXI.Sprite.from('round_yellow');
            btn.x = ((btn.width + 20) * idx);
            btn.interactive = true;
            btn.on('pointerdown', () => {
                this.pressedBtn = button;
                this.onStartSpin();
            });

            const btnText = new PIXI.Text(button.button);
            btnText.x = btn.height / 2;
            btnText.y = btn.width / 2;
            btnText.anchor.set(0.5);

            btn.addChild(btnText);
            this.buttonsSprite.push(btn);
            this.container.addChild(btn);
        });
        this.defaultTint = this.buttonsSprite[0].tint;
    }
}

export default Buttons;
