class Bubble extends Phaser.Scene {
    constructor() {
        super('Bubble');
        this.gameController;
    };

    init(data) {
        this.gameController = data.gameController;
    }

    create() {
        this.add.text(110, 300, config.language === "en" ? 'Exit Game?' : '結束遊戲 ? ', { fill: '#FFF', font: '40px Noto San HK' });

        this.add.text(130, 400, 'Yes', { fill: '#FFF', font: '20px Noto Sans HK' })
            .setInteractive()
            .on('pointerup', function () {
                this.gameController.newGameSetting();
                this.scene.stop();
                this.scene.stop('GameScene')
                this.scene.start("GameStart");
            }, this);

        this.add.text(260, 400, 'No', { fill: '#FFF', font: '20px Noto Sans HK' })
            .setInteractive()
            .on('pointerup', function () {
                this.scene.stop();
                this.scene.wake("GameScene");
            }, this);
    };
};