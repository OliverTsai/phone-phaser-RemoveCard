class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver")
        if (config.DEBUG) console.log("GameOver-constructor")
        this.music;
        this.timeIsUp;
        this.soundOn;
        this.score1Counter;
        this.score2Counter;
    }

    init(data) {
        if (config.DEBUG) console.log("GameOver-init");
        this.timeIsUp = data.timeIsUp;
        this.music = data.music;
        this.soundOn = data.soundOn;
        this.score1Counter = data.score1Counter;
        this.score2Counter = data.score2Counter;
    }

    create() {
        if (config.DEBUG) console.log("GameOver-create");

        this.add.text(100, 300, config.language === 'en' ? 'Game Over' : "遊 戲 結 束", { fill: "#FFF", font: '40px Noto Sans HK' });
        this.add.text(140, 380, config.language === 'en' ? 'Click to restart' : "點擊重新開始", { fill: "#FFF", font: "20px Noto Sans HK" });

        this.add.text(95, 180, (config.language === 'en' ? 'Player1 Score:' : '玩家1 分數:') + parseInt(this.score1Counter.getValue()), { fill: '#FFF', font: '20px Noto Sans HK' });
        this.add.text(95, 220, (config.language === 'en' ? 'Player2 Score:' : '玩家2 分數:') + parseInt(this.score2Counter.getValue()), { fill: '#FFF', font: '20px Noto Sans HK' });

        this.music.stop();
        this.timeIsUp.stop();

        this.input.once('pointerup', () => this.scene.start('GameStart', this), this);

        // 比較三個分數誰是最高 (玩家一, 玩家二, 還是原本最高的分數)
        // 把最高的分數放入本地資料庫(LocalDatabase)內
        let db = new LocalDatabase();
        let highest = Math.max(db.getData('highScore'), parseInt(this.score1Counter.getValue()), parseInt(this.score2Counter.getValue()));
        db.saveData('highScore', highest);
    }
}