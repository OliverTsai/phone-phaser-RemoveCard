class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
        if(config.DEBUG) console.log("Preload constructor");
        this.music;
        this.timeIsUp;
        this.progressBox;
        this.progressBar;
        this.width;
        this.height;
        this.assetsText;
        this.percentText;
        this.soundOn = 1;     // 這是this.soundOn初始化的地方
        this.flipSoundOn = 1; // 這是this.flipSoundOn初始化的地方
    }

    preload() {
        if(config.DEBUG) console.log("Preload-preload");

        // 載入所有 Card 的圖片
        //A
        this.load.image('A_of_club', 'assets/images/cards/A_of_club.png');
        this.load.image('A_of_diamond', 'assets/images/cards/A_of_diamond.png');
        this.load.image('A_of_heart', 'assets/images/cards/A_of_heart.png');
        this.load.image('A_of_spade', 'assets/images/cards/A_of_spade.png');
        //2
        this.load.image('2_of_club', 'assets/images/cards/2_of_club.png');
        this.load.image('2_of_diamond', 'assets/images/cards/2_of_diamond.png');
		this.load.image('2_of_heart', 'assets/images/cards/2_of_heart.png');
        this.load.image('2_of_spade', 'assets/images/cards/2_of_spade.png');
        //3
		this.load.image('3_of_club', 'assets/images/cards/3_of_club.png');
		this.load.image('3_of_diamond', 'assets/images/cards/3_of_diamond.png');
		this.load.image('3_of_heart', 'assets/images/cards/3_of_heart.png');
        this.load.image('3_of_spade', 'assets/images/cards/3_of_spade.png');
        //4
		this.load.image('4_of_club', 'assets/images/cards/4_of_club.png');
		this.load.image('4_of_diamond', 'assets/images/cards/4_of_diamond.png');
		this.load.image('4_of_heart', 'assets/images/cards/4_of_heart.png');
        this.load.image('4_of_spade', 'assets/images/cards/4_of_spade.png');
        //5
		this.load.image('5_of_club', 'assets/images/cards/5_of_club.png');
		this.load.image('5_of_diamond', 'assets/images/cards/5_of_diamond.png');
		this.load.image('5_of_heart', 'assets/images/cards/5_of_heart.png');
        this.load.image('5_of_spade', 'assets/images/cards/5_of_spade.png');
        //6
		this.load.image('6_of_club', 'assets/images/cards/6_of_club.png');
		this.load.image('6_of_diamond', 'assets/images/cards/6_of_diamond.png');
		this.load.image('6_of_heart', 'assets/images/cards/6_of_heart.png');
        this.load.image('6_of_spade', 'assets/images/cards/6_of_spade.png');
        //7
		this.load.image('7_of_club', 'assets/images/cards/7_of_club.png');
		this.load.image('7_of_diamond', 'assets/images/cards/7_of_diamond.png');
		this.load.image('7_of_heart', 'assets/images/cards/7_of_heart.png');
        this.load.image('7_of_spade', 'assets/images/cards/7_of_spade.png');
        //8
		this.load.image('8_of_club', 'assets/images/cards/8_of_club.png');
		this.load.image('8_of_diamond', 'assets/images/cards/8_of_diamond.png');
		this.load.image('8_of_heart', 'assets/images/cards/8_of_heart.png');
        this.load.image('8_of_spade', 'assets/images/cards/8_of_spade.png');
        //9
        this.load.image('9_of_club', 'assets/images/cards/9_of_club.png');
		this.load.image('9_of_diamond', 'assets/images/cards/9_of_diamond.png');
		this.load.image('9_of_heart', 'assets/images/cards/9_of_heart.png');
        this.load.image('9_of_spade', 'assets/images/cards/9_of_spade.png');
        //10
        this.load.image('10_of_club', 'assets/images/cards/10_of_club.png');
		this.load.image('10_of_diamond', 'assets/images/cards/10_of_diamond.png');
		this.load.image('10_of_heart', 'assets/images/cards/10_of_heart.png');
        this.load.image('10_of_spade', 'assets/images/cards/10_of_spade.png');
        //J
        this.load.image('J_of_club', 'assets/images/cards/J_of_club.png');
		this.load.image('J_of_diamond', 'assets/images/cards/J_of_diamond.png');
		this.load.image('J_of_heart', 'assets/images/cards/J_of_heart.png');
        this.load.image('J_of_spade', 'assets/images/cards/J_of_spade.png');
        //Q
        this.load.image('Q_of_club', 'assets/images/cards/Q_of_club.png');
        this.load.image('Q_of_diamond', 'assets/images/cards/Q_of_diamond.png');
        this.load.image('Q_of_heart', 'assets/images/cards/Q_of_heart.png');
        this.load.image('Q_of_spade', 'assets/images/cards/Q_of_spade.png');
        //K
        this.load.image('K_of_club', 'assets/images/cards/K_of_club.png');
		this.load.image('K_of_diamond', 'assets/images/cards/K_of_diamond.png');
		this.load.image('K_of_heart', 'assets/images/cards/K_of_heart.png');
        this.load.image('K_of_spade', 'assets/images/cards/K_of_spade.png');
        //Card Back
        this.load.image('card_back', 'assets/images/cards/card_back.png');
        //Audio
        this.load.audio('flipOn', 'assets/audio/flipOn.mp3');
        this.load.audio('flipOff', 'assets/audio/flipOff.mp3');
        this.load.audio('flipAll', 'assets/audio/flipAll.mp3');
        this.load.audio('cardMoving', 'assets/audio/cardMoving.mp3');
        this.load.audio('background', 'assets/audio/backgroundMusic.mp3');
        this.load.audio('timeIsUp', 'assets/audio/timeIsUp.mp3')
        // icon
        this.load.image('mute', 'assets/images/mute.jpg');
        this.load.image('volumeUp', 'assets/images/volumeUp.jpg');
        this.load.image('email', 'assets/images/email.png')
        this.load.image('flipMute', 'assets/images/mute.jpg');
        this.load.image('flipVolumeUp', 'assets/images/volumeUp.jpg');
        this.load.image('exit', 'assets/images/exit.png')
        //background image
        this.load.image('imageLevel0', 'assets/images/background/level0.jpg');
        this.load.image('imageLevel1', 'assets/images/background/level1.jpg');
        this.load.image('imageLevel2', 'assets/images/background/level2.jpg');
        this.load.image('imageLevel3', 'assets/images/background/level3.jpg');
        this.load.image('imageLevel4', 'assets/images/background/level4.png');
        this.load.image('imageLevel5', 'assets/images/background/level5.jpg');
        this.load.image('imageLevel6', 'assets/images/background/level6.jpg');
        this.load.image('imageLevel7', 'assets/images/background/level7.jpg');
        this.load.image('imageLevel8', 'assets/images/background/level8.jpg');
        this.load.image('imageLevel9', 'assets/images/background/level9.jpg');
        this.load.image('imageLevel10', 'assets/images/background/level10.jpg');
        this.load.image('imageLevel11', 'assets/images/background/level11.jpg');
        this.load.image('imageLevel12', 'assets/images/background/level12.jpg');
        this.load.image('imageLevel13', 'assets/images/background/level13.jpg');
        this.load.image('imageLevel14', 'assets/images/background/level14.jpg');
        this.load.image('imageLevel15', 'assets/images/background/level15.jpg');
        this.load.image('imageLevel16', 'assets/images/background/level16.jpg');
        this.load.image('imageLevel17', 'assets/images/background/level17.jpg');
        this.load.image('imageLevel18', 'assets/images/background/level18.jpg');

        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(40, 350, 320, 35);

        this.load.on('progress', function(value){
            this.progressBar.fillStyle(0xffffff);
            this.progressBar.fillRect(45,355,310 * value,25);
        this.percentText.setText(parseInt(value * 100)+'%');

        },this); // 留意, 最尾參數this是optional, 但現在是必需的, 否則, this.deck 不能用到 
        
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.loadingText = this.make.text({
            x: this.width / 2,
            y: this.height / 2-40,
            // text: 'Loading...',
            text: config.language === 'en' ? 'Loading ...' :　'加載...',
            style: {
                font: '30px Noto Sans HK',
                fill:'#ffffff'
            }
        });
        this.loadingText.setOrigin(0.5,0.5);
        
        this.assetsText = this.make.text({
            x:this.width / 2,
            y: this.height / 2+50,
            text:'',
            style:{
                font:'18px',
                fill:'#ffffff'
            }
        });
        this.assetsText.setOrigin(0.5 , 0,5);
        
        this.percentText = this.make.text({
            x: this.width / 2,
            y: this.height / 2+10,
            text: "0%",
            style:{
                font:'18px',
                fill:'#ffffff'
            }
        });
        this.percentText.setOrigin(0.5,0.5);
        // this.percentText.setText(parseInt(this.value * 100)+'%');
    }

    create() {
        // let db = new LocalDatabase();
        // let f = {a:1, b:2, c:3}
        // db.saveObjectData('f',f);
        // console.log('e', db.getObjectData('f'));

        if(config.DEBUG) console.log("Preload-create");
        this.music = this.sound.add('background');
        this.timeIsUp = this.sound.add('timeIsUp');
        this.scene.start("GameStart", this);
    }
}