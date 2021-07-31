import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import Buttons from './Buttons';
import Wheel from './Wheel';
import UserPanel from './UserPanel';
import {getAllIndexes, selectRandomValue} from '../helpers/randomHelper';

class Game {
    constructor(app, options) {
        this.app = app;
        this.options = options;

        this.wheel = null;
        this.userPanel = null;

        this.spinButtons = null;
        this.CIRCLE_DEGREES = 360;
    }

    createGame() {
        this.createBackground();
        this.createWheel();
        this.createUserPanel();
        this.createSpinButtons();
    }

    createBackground() {
        const background = PIXI.Sprite.from('background');
        this.app.stage.addChild(background);
    }

    createWheel() {
        this.wheel = new Wheel(this.app, this.options);
        this.wheel.createWheel();
    }

    createUserPanel() {
        this.userPanel = new UserPanel(this.app, this.options);
        this.userPanel.createUserPanel();
    }

    createSpinButtons() {
        const btnContainer = new PIXI.Container();
        btnContainer.x = this.app.screen.width * 0.5;
        btnContainer.y = this.app.screen.height - 140;

        this.spinButtons = new Buttons(btnContainer, this.options.buttons, this.onStartSpin.bind(this));
        this.spinButtons.createButtons();

        btnContainer.pivot.x = btnContainer.width / 2;
        this.app.stage.addChild(btnContainer);
    }

    onStartSpin() {
        const {balanceValue, winValue} = this.userPanel;

        balanceValue.text = Number(balanceValue.text) + Number(winValue.text) - this.options.bet;
        winValue.text = 0;

        this.spinButtons.disableAll();

        this.startWheelAnim();
    }

    startWheelAnim() {
        const {externalCircle} = this.wheel;
        const anim = gsap.to(externalCircle, {
            duration: this.options.spinTime,
            ease: 'none',
            angle: this.CIRCLE_DEGREES * 3,
            onComplete: () => {
                externalCircle.angle = 0;
                anim.kill();
                this.stoppingAnim();
            }
        });
    }

    stoppingAnim() {
        const {externalCircle, numbers} = this.wheel;
        const selectedBet = selectRandomValue(numbers);
        const sector = selectRandomValue(getAllIndexes(numbers, selectedBet)) + 1;
        const sectorDegrees = this.CIRCLE_DEGREES / numbers.length;
        const radius = (sector * sectorDegrees) - (sectorDegrees / 2);
        const stopRadius = this.CIRCLE_DEGREES * 3 - radius;
        const anim = gsap.to(externalCircle, {
            duration: 8,
            ease: 'power2.out',
            angle: stopRadius,
            onComplete: () => {
                anim.kill();
                externalCircle.angle -= (this.CIRCLE_DEGREES * parseInt(externalCircle.angle / this.CIRCLE_DEGREES));
                this.onEndSpin(selectedBet);
            }
        });
    }

    onEndSpin(selectedBet) {
        const {pressedBtn} = this.spinButtons;
        const {balanceValue, winValue} = this.userPanel;

        if (selectedBet === pressedBtn.button) {
            winValue.text = this.options.bet * pressedBtn.multiplier;
        } else if (Number(balanceValue.text) < this.options.bet) {
            this.gameOver();
            return;
        }
        this.spinButtons.enableAll();
    }

    gameOver() {
        const background = new PIXI.Graphics();
        const {width, height, x, y} = this.app.screen;
        const styles = {fontFamily: 'Arial', fontSize: 48, fontWeight: 'bold', fill: '#fff'};
        const text = new PIXI.Text('Game Over', styles);

        background.beginFill(0x0000);
        background.drawRect(x, y, width, height);
        background.endFill();
        background.alpha = 0.7;

        text.anchor.set(0.5, 1);
        text.x = width / 2;
        text.y = height / 2;

        this.app.stage.addChild(background, text);
    }
}

export default Game;