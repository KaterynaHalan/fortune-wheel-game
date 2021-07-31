import * as PIXI from 'pixi.js';

class UserPanel {
    constructor(app, options) {
        this.app = app;
        this.options = options;

        this.graphics = null;
        this.textContainer = null;
        this.balanceValue = null;
        this.winValue = null;
        this.betValue = null;
    }

    createGraphics() {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0x000000);
        this.graphics.drawRect(0, 500, this.app.screen.width, this.app.screen.width);
        this.graphics.endFill();
        this.graphics.alpha = 0.5;
    }

    createTextContainer() {
        const style = new PIXI.TextStyle({ fontFamily: 'Arial', fontSize: 24, fontWeight: 'bold', fill: '#ffffff' });
        const balanceLabel = new PIXI.Text('Balance:', style);
        const betLabel = new PIXI.Text('Bet:', style);
        const winLabel = new PIXI.Text('Win:', style);

        balanceLabel.x = 50;
        betLabel.x = 500;
        winLabel.x = 650;

        this.textContainer = new PIXI.Container();
        this.balanceValue = new PIXI.Text(this.options.balance, style);
        this.betValue = new PIXI.Text(this.options.bet, style);
        this.winValue = new PIXI.Text(0, style);

        this.balanceValue.x = balanceLabel.x + balanceLabel.width + 5;
        this.betValue.x = betLabel.x + betLabel.width + 5;
        this.winValue.x = winLabel.x + winLabel.width + 5;

        this.textContainer.y = this.app.screen.height - balanceLabel.height - 15;
        this.textContainer.addChild(balanceLabel, betLabel, winLabel, this.balanceValue, this.betValue, this.winValue);
    }

    createUserPanel() {
        this.createGraphics();
        this.createTextContainer();

        this.app.stage.addChild(this.graphics, this.textContainer);
    }
}

export default UserPanel;