const GameSceneConfig = {
    key: 'GameScene',
    cameras: [
        {
            width: 400,
            height: 356,
            backgroundColor: '#00ff00'
        },
        {
            x: 0,
            y: 356,
            width: 400,
            height: 356,
            backgroundColor: '#0000ff'
        }
    ]
}

class GameScene extends Phaser.Scene {
    constructor() {
        super(GameSceneConfig);
        if (config.DEBUG) console.log('GameScene constructor');
        this.backgroundImage;
        this.grid;
        this.deck;
        this.player1;
        this.player2;
        this.scoreText1;
        this.scoreText2;
        this.timerText;
        this.timerValue;
        this.timerEvent;
        this.music;
        this.timeIsUp;
        this.gameController = new GameController();
        this.score1Counter;
        this.score2Counter;
        this.soundOn;
        this.flipSoundOn;
        this.flipOn;
        this.flipOff;
        this.cardMoving;
    }

    // 在init(data)這個function裡, 每次過level時(即是GameScene restart),
    // 都會從新行一次, 重點是data的資料會保存, 沒有消失
    init(data) {
        if (config.DEBUG) console.log("GameScene-init")
        this.music = data.music;
        this.timeIsUp = data.timeIsUp;
        this.soundOn = data.soundOn;
        this.flipSoundOn = data.flipSoundOn;
    }

    create() {
        if (config.DEBUG) console.log('GameScene-create')
        this.flipOn = this.sound.add('flipOn');
        this.flipOff = this.sound.add('flipOff');
        this.cardMoving = this.sound.add('cardMoving');

        if (this.soundOn === 1)
            this.music.play();
        else
            this.music.stop();

        // 18句 switch case code 簡化為一句
        this.backgroundImage = this.add.image(200, 50, `imageLevel${this.gameController.gameLevel}`);

        //Exit icon
        this.add.sprite(386, 25, 'exit')
            .setScale(0.015)
            .setInteractive()
            .on('pointerdown', function (pointer, x, y, event) {
                this.scene.sleep();
                this.scene.launch('Bubble', { gameController: this.gameController });
                event.stopPropagation();
            }, this);

        //總計時
        this.timerValue = 60;
        this.grid = new AlignGrid({
            scene: this,
            rows: 3, cols: 6, width: 400, height: 356,    // for two players play
            // rows: 7, cols: 6, width: 400, height: 712, // for one player play only
            marginTop: 50, marginBottom: 10, marginLeft: 0, marginRight: 0,
        });

        // 一副牌52隻
        this.deck = new Deck(this.gameController.initCardNumber, this.gameController.playCardNumbers, this.flipSoundOn);

        this.score1Counter = this.tweens.addCounter({ from: this.gameController.player1Score, to: this.gameController.player1Score, duration: 0 });
        this.score2Counter = this.tweens.addCounter({ from: this.gameController.player2Score, to: this.gameController.player2Score, duration: 0 });

        this.scoreText1 = this.add.text(10, 10, (config.language === 'en' ? 'Score:' : '分數:') + this.gameController.player1Score, { fill: '#FFF', font: "20px Noto Sans HK" });
        this.scoreText2 = this.add.text(285, 10, (config.language === 'en' ? 'Score:' : '分數:') + this.gameController.player2Score, { font: "20px Noto Sans HK", fill: '#FFF' });

        this.player1 = new Player(1, this.scoreText1, this.gameController.player1Score);
        this.player2 = new Player(2, this.scoreText2, this.gameController.player2Score);

        this.cameras.cameras[0].setRotation(3.14);

        this.timerText = this.add.text(145, 10, config.language === 'en' ? "Time:" : '時間:', { font: '20px Noto Sans HK', fill: '#fff' });
        this.timerEvent = this.time.addEvent({ delay: 1000, callback: this.timeEventHandler, callbackScope: this, loop: true })

        new PrepareCardsForLevel(this.gameController.gameLevel, this, this.grid, this.deck)

        this.deck.randomCards();

        // this.grid.show();        // show grid only
        // this.grid.showNumbers(); // show grid with numbers

        this.deck.distribute(this)

        // click 牌後可以取得card object
        this.input.on('gameobjectdown', function (pointer, gameobject) {
            let player;
            if (pointer.camera.id === 1)
                player = this.player1;
            else
                player = this.player2;

            // console.log("player: ", pointer.camera.id) // which camera is selected (i.e. we know player1 or player2)

            let card = gameobject.parent; // retreive card object              

            card.disableInteractive();
            card.frameOn(player);

            if (this.flipSoundOn === 1)
                this.flipOn.play();

            // leave the loop
            if (card.runningState === "FACEUP")
                return;

            // card.toggle(); // without animation for testing
            this.flip(card, player);  // with animation

        }, this); // 留意, 最尾參數this是optional, 但現在是必需的, 否則, this.deck 不能用到  
    }


    flip(card, player, param) {
        if (param === "AUTOFLIPDOWN") {
            card.frameOff(player);
            if (this.flipSoundOn === 1)
                this.flipOff.play();
        }

        const timeline = this.tweens.timeline();

        timeline.add({
            onStart: () => {
                // console.log("onStart t1");
            },
            targets: card.getCardImage(),
            scale: 0.32,
            duration: 150,
            onComplete: () => {
                // console.log("onComplete t1");
            }
        });
        timeline.add({
            onStart: () => {
                // console.log("onStart t2");
            },
            targets: card.getCardImage(),
            scaleX: 0,
            duration: 150,
            onComplete: () => {
                // console.log("onComplete t2")
                card.toggle();
            }
        });
        timeline.add({
            onStart: () => {
                // console.log("onStart t3");
            },
            targets: card.getCardImage(),
            scale: 0.32,
            duration: 100,
            onComplete: () => {
                // console.log("onComplete t3", card);  
            }
        })
        timeline.add({
            onStart: () => {
                // console.log("onStart t4");
            },
            targets: card.getCardImage(),
            scaleX: 0.32,
            duration: 400,
            onComplete: () => {
                // console.log("onComplete t4", card);
                if (param !== "AUTOFLIPDOWN") {
                    this.doCheckAndAction(card, player);
                } else {
                    card.setInteractive();
                }
            }
        })

        timeline.play();
    }

    doCheckAndAction(card, player) {

        player.pickCard(card);

        if (player.isTwoCardsOnHand()) {
            if (player.isPair()) {
                if (config.DEBUG) console.log("Player", player.id, "has A PAIR");

                let [prevScore, currScore] = player.scoreCalculate();

                if (player.id === 1)
                    this.score1Counter = this.tweens.addCounter({ from: prevScore, to: currScore, duration: 1000 });
                else
                    this.score2Counter = this.tweens.addCounter({ from: prevScore, to: currScore, duration: 1000 });

                // console.log("player:", player.id, player.score);

                if (this.flipSoundOn === 1)
                    this.cardMoving.play();

                //補二個空位發牌
                if (this.deck.hasAvailableCard()) { // 派完整副牌就沒有得再派
                    this.deck.setCurCardPos(player.openCard1.newpos);
                    this.tweens.add({
                        targets: this.deck.takeCurCard(),
                        x: { value: player.openCard1.gridX(), duration: 800, },
                        y: { value: player.openCard1.gridY(), duration: 800, },
                    });

                    this.deck.setCurCardPos(player.openCard2.newpos);
                    this.tweens.add({
                        targets: this.deck.takeCurCard(),
                        x: { value: player.openCard2.gridX(), duration: 800, },
                        y: { value: player.openCard2.gridY(), duration: 800, },
                    });
                }

                player.cancelCards(); // cards is a pair, destroy it.

                // 計算巳完成pairing的牌
                this.gameController.countPair();

                // 檢查遊戲是否完結                
                if (this.gameController.isGameFinished()) {
                    this.gameController.goNextLevel(this.music, this.timeIsUp);
                    this.gameController.keepScores(this.player1.score, this.player2.score);
                    this.scene.restart();
                }

            } else {
                if (config.DEBUG) console.log("Player", player.id, "has NOT A PAIR");

                this.flip(player.openCard1, player, "AUTOFLIPDOWN");
                this.flip(player.openCard2, player, "AUTOFLIPDOWN");
            }
            player.handOffCards();
        }
    }

    timeEventHandler() {
        this.timerValue--;
        if (this.timerValue === 0) {
            this.timerEvent.remove();
        }
    }

    update() {
        this.timerText.setText((config.language === 'en' ? "Time:" : '時間:') + this.timerValue, { fill: '#FFF', font: '10px' });
        this.scoreText1.setText((config.language === 'en' ? 'Score:' : '分數:') + parseInt(this.score1Counter.getValue()), { fill: '#FFF', font: '20px Noto Sans HK' });
        this.scoreText2.setText((config.language === 'en' ? 'Score:' : '分數:') + parseInt(this.score2Counter.getValue()), { fill: '#FFF', font: '20px Noto Sans HK' });

        if (this.timerValue === 10) {
            this.music.stop();
            if (this.soundOn)
                this.timeIsUp.play();

        } else if (this.timerValue === 0) {
            this.scene.start("GameOver", this);
            this.gameController.newGameSetting();
        }
    }
}