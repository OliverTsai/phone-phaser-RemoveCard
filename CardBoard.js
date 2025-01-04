class CardBoard extends Phaser.Scene {
    constructor() {
        super('CardBoard')
        if(config.DEBUG) console.log('CardBoard')
        Phaser.Scene.call(this, {key: "CardBoard", active: true});
    }

    preload(){
        // this.grid = new AlignGrid({
        //     scene:this,
        //     rows:8,
        //     cols:7,
        //     width:400,
        //     height:712
        // });
        // this.grid.show();        
    }
    create(){
        if(config.DEBUG) console.log('CardBoard')
    }
}