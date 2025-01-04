// 一張牌
class Card {
    constructor(scene, symbol, value, pos, grid) {
        this.runningState  = "FACEDN";

        this.cardImageFront= new CardImage(scene, symbol, value, pos, "FACEUP", this);
        this.cardImageBack = new CardImage(scene, symbol, value, pos, "FACEDN", this);
        this.scene         = this.cardImageFront.scene;
        this.symbol        = this.cardImageFront.symbol;
        this.value         = this.cardImageFront.value;
        this.pos           = this.cardImageFront.pos;          // 順排的位置，即是random之前的位置
        this.name          = `${this.value}_of_${this.symbol}`
        this.newpos        = this.pos;                         // random後的位置, 最新的位置
        this._x;                              
        this._y;                              
        this.x             = 500;// hardcode value for init
        this.y             = 300;// hardcode value for init
        this.grid          = grid;
        this.graphics;
        
        if (this.runningState === "FACEUP") {
            this.cardImageFront.setVisible(true);
            this.cardImageBack.setVisible(false);
        } else {
            this.cardImageFront.setVisible(false);
            this.cardImageBack.setVisible(true);
        }
    }

    gridX() {
        return this.grid.getX(this.newpos);
    }

    gridY() {
        return this.grid.getY(this.newpos);
    }

    set x(x) {
        this._x = x;
        this.cardImageFront.x = this.x;
        this.cardImageBack.x  = this.x;
    }

    get x() {
        return this._x;
    }

    set y(y) {
        this._y = y;
        this.cardImageFront.y = this.y;
        this.cardImageBack.y  = this.y;
    }

    get y() {
        return this._y;
    }

    setInteractive() {
        this.cardImageFront.setInteractive();
        this.cardImageBack.setInteractive();
    }

    disableInteractive() {
        this.cardImageFront.disableInteractive();
        this.cardImageBack.disableInteractive();
    }

    destroy() {
        if (this.cardImageFront.active)
            this.cardImageFront.destroy();
        
        if (this.cardImageBack.active)
            this.cardImageBack.destroy();
    }

    // set to face up
    toFaceUp() {
        this.runningState = "FACEUP";
        this.cardImageFront.setVisible(true);
        this.cardImageBack.setVisible(false);
    }

    // set to face dowon
    toFaceDown() {
        this.runningState = "FACEDN";
        this.cardImageFront.setVisible(false);
        this.cardImageBack.setVisible(true);
    }

    toggle() {
        if (this.runningState === "FACEDN")
            this.toFaceUp();
        else 
            this.toFaceDown();
    }

    getCardImage() {
        if (this.runningState === "FACEDN") {
            return this.cardImageBack;
        } else {
            return this.cardImageFront;
        }
    }
    
    frameOn(player){
        // console.log("frameOn()")
        this.graphics = this.scene.add.graphics()
        
        if (player.id === 1) {
            this.graphics.lineStyle(4, 0xff0000);
        } else {
            this.graphics.lineStyle(4, 0x000000);    
        }
        
        this.graphics.strokeRectShape(this.cardImageFront.getBounds())
    }

    frameOff(player){
        // console.log("frameOff()")
        this.graphics.clear();
    }
}

