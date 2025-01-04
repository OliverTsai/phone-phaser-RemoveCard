class Explanation extends Phaser.Scene{
    constructor(){
        super('Explanation')
        if(config.DEBUG) console.log('Explanation-constuctor')
    }
    create(){
        this.add.text(140, 130,'記憶翻牌', { fill: "#FFF", font: '30px Noto Sans HK' });
        this.add.text(20, 200,'遊戲畫面分成上下，可以兩人即時互動', { fill: "#FFF", font: '20px Noto Sans HK' });
        this.add.text(20, 230,'兩位玩家皆使用同一組牌組，看誰分數高，', { fill: "#FFF", font: '20px Noto Sans HK' });
        this.add.text(20, 260,'點擊即可翻牌，將兩個數字一樣的牌翻開，', { fill: "#FFF", font: '20px Noto Sans HK' });
        this.add.text(20, 290,'即可獲得分數，一對牌分數皆為10分', { fill: "#FFF", font: '20px Noto Sans HK' });
        this.add.text(20, 320,'所有牌翻開即可進入下一個級別', { fill: "#FFF", font: '20px Noto Sans HK' });
        this.add.text(20, 350,'每上升一個級別會增加一副對牌', { fill: "#FFF", font: '20px Noto Sans HK' });

        this.input.on('pointerup', () => this.scene.start('GameStart'), this);
    }
}