class GameStart extends Phaser.Scene {
    constructor() {
        super("GameStart");
        if (config.DEBUG) console.log("GameStart-constructor");
        this.music;
        this.timeIsUp;
        this.soundOn;      // 背景音樂: 用作控制, 1:開, 0:關
        this.volumeUp;     // 背景音樂: 代表有聲的圖片
        this.mute;         // 背景音樂: 代表冇聲的圖片
        this.flipSoundOn;  // 翻牌聲音: 用作控制, 1:開, 0:關
        this.flipVolumeUp; // 翻牌聲音: 代表有聲的圖片
        this.flipMute;     // 翻牌聲音: 代表冇聲的圖片 
    }

    init(data) {
        if (config.DEBUG) console.log("GameStart-init");
        this.music = data.music;
        this.timeIsUp = data.timeIsUp;
        this.soundOn = data.soundOn;
        this.flipSoundOn = data.flipSoundOn;
    }

    create() {
        if (config.DEBUG) console.log("GameStart-create");
        // this.add.dom(200,300, 'div', "background-color: lime", 'LOGLOG')

        this.add.text(110, 300, config.language === "en" ? 'Game Start' : '遊 戲 開 始', { fill: "#FFF", font: '40px Noto Sans HK' });
        this.add.text(150, 380, config.language === "en" ? 'Click to start' : "點 擊 開 始", { fill: "#FFF", font: "20px Noto Sans HK" });
        this.add.text(120, 530, config.language === "en" ? 'Background Music' : "背景音樂", { fill: "#FFF", font: "18px Noto Sans HK" });
        this.add.text(150, 630, config.language === "en" ? 'Card Sound' : "揭牌音效", { fill: "#FFF", font: "18px Noto Sans HK" });

        // 有關翻牌聲音
        this.flipMute = this.add.sprite(200, 600, 'flipMute')
            .setScale(0.04)
            .setInteractive()

        this.flipVolumeUp = this.add.sprite(200, 600, 'flipVolumeUp')
            .setScale(0.04)
            .setInteractive();

        if (this.flipSoundOn === 1) {
            this.flipVolumeUp.setVisible(true)
            this.flipMute.setVisible(false);
        } else {
            this.flipVolumeUp.setVisible(false)
            this.flipMute.setVisible(true);
        }

        this.flipVolumeUp.on('pointerup', function (pointer, x, y, event) {
            event.stopPropagation();
            this.flipVolumeUp.setVisible(false);
            this.flipMute.setVisible(true);
            this.flipSoundOn = 0;
        }, this);

        this.flipMute.on('pointerup', function (pointer, x, y, event) {
            event.stopPropagation();
            this.flipVolumeUp.setVisible(true);
            this.flipMute.setVisible(false);
            this.flipSoundOn = 1;
        }, this);
        // END 有關翻牌聲音

        // 背景音樂
        this.volumeUp = this.add.sprite(200, 500, 'volumeUp')
            .setScale(0.04)
            .setInteractive();

        this.mute = this.add.sprite(200, 500, 'mute')
            .setScale(0.04)
            .setInteractive();

        if (this.soundOn === 1) {
            this.volumeUp.setVisible(true);
            this.mute.setVisible(false);
            this.music.play();
        } else {
            this.volumeUp.setVisible(false);
            this.mute.setVisible(true);
            this.music.stop();
        }

        this.volumeUp.on('pointerup', function(pointer, x, y, event) {
            event.stopPropagation();            
            this.volumeUp.setVisible(false);
            this.mute.setVisible(true);
            this.music.stop();
            this.soundOn = 0;
        }, this);

        this.mute.on('pointerup', function(pointer, x, y, event) {
            event.stopPropagation();
            this.volumeUp.setVisible(true);
            this.mute.setVisible(false);
            this.music.play();
            this.soundOn = 1;
        }, this);
        // END 背景音樂

        this.input.on('pointerup', function () {
            this.scene.start('GameScene', this);
        }, this);

        this.add.text(150, 440, "Explanation")
            .setInteractive()
            .on('pointerup', function (pointer, x, y, event) {
                event.stopPropagation();
                this.scene.start('Explanation')
            }, this);     
        
        // 由Storage取最高的分數
        let db = new LocalDatabase();
        let highScore = db.getData('highScore');
        if (! highScore)
            highScore = 0;

        this.add.text(140, 200, ('High Score')+ parseInt(highScore), {fill:"#FFF",font:"20px Noto Sans HK"});
        
        if (config.DEBUG) console.log('High Score', highScore);
        // END 由Storage取最高的分數
    }
}