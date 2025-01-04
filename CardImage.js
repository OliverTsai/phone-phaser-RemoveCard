// 一張牌
class CardImage extends Phaser.GameObjects.Image {

    constructor(scene, symbol, value, pos, faceUpOrDn, parent) {
        // super(scene, 500, 300)      // TODO: x, y value should NOT be hardcode
        super(scene);
        this.scene = scene
        this.symbol = symbol; // spade, heart, club, diamond
        this.value = value;   // 1,2,3,...10,J,Q,K,A
        this.pos = pos;       // in deck position, i.e. 0,1,2,3,4,... 
                              // 0 is the bottom, 51 is the top
 
        this.faceUpOrDn = faceUpOrDn;  // FACEUP | FACEDN
        this.parent = parent;

        if (faceUpOrDn === "FACEUP") {
            this.setTexture(`${this.value}_of_${this.symbol}`);
            this.setScale(0.32);
        } else {
            this.setTexture(`${this.value}_of_${this.symbol}`);
            this.setScale(0.32);
            // this.setTexture('card_back');
            // this.setScale(0.32);
            //目前else將所有牌翻開
        }
        scene.add.existing(this)
        this.setInteractive();
    }
}