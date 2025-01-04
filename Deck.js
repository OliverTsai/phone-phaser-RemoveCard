// 整副牌
class Deck {
    constructor(initCardNumber, playCardNumbers, flipSoundOn) {
        if(config.DEBUG) console.log("Deck-constructor");
        this.cards = [];                      // 存正副牌
        this.initCardNumber = initCardNumber; // 開始牌的數目
        this.curPos = this.initCardNumber;    // 記錄派到那一張牌
        this.playCardNumbers = playCardNumbers;
        this.flipSoundOn = flipSoundOn;
    }

    static arrayDelete(arr, index) {
        return arr.slice(0, index).concat(arr.slice(index + 1))
    }

    hasAvailableCard() {
        // console.log(this.curPos,this.playCardNumbers)
        return this.curPos < this.playCardNumbers;
    }

    setCurCardPos(newpos) {
        this.cards[this.curPos].newpos = newpos;   
    }

    // Take current position card
    takeCurCard() {
        let card = this.cards[this.curPos]; // should be return this.cards[this.curPos++]
        this.curPos++;
        return card;
    }

    addCard(card) {
        this.cards[card.pos] = card;
    }

    // 派牌
    distribute(scene) {
        let flipAll = scene.sound.add('flipAll');
        if(this.flipSoundOn === 1)
        flipAll.play()

        for (let i = 0; i < this.cards.length; i++) {
            //i等於0 當i小於所有卡片的數量時執行 每執行一次i數量加一
            let card = this.cards[i];
    
            if (i === this.initCardNumber)
                 break

            let gridX = scene.grid.getX(i);
            let gridY = scene.grid.getY(i);

            scene.tweens.add({
                targets: card,
                x: { value: gridX, duration: 800, },
                y: { value: gridY, duration: 800, },
                delay: i * 50
            });
        }
    }

    // 洗牌
    randomCards() {

        // 現在狀況是:
        // this.cards = [card obj of 2_of_spade, card obj of 3_of_spade, card obj of 4_of_spade, ...]
        // 把 this.cards 的內容變成 random

        // 比較之前和之後結果
        // console.log(this.cards);

        let tempDeck = [];
        //先設tempDeck為空陣列
        let totalCards = this.cards.length;
        //設totalCards為卡片位置的總數(其陣列長度)
        
        for (let i = 0; i < totalCards; i++) {
            //設i為0 在i小於totalCards執行 每執行一次i加1次
            let num = Phaser.Math.RND.between(0, this.cards.length - 1);
            //設num為Phaser.Math.RND亂數 在0與totalCards之間
            
            tempDeck.push(this.cards[num]);
            tempDeck[i].newpos = i
            
            // 將tempDeck空陣列以Phaser.Math.RND打亂順序的牌塞滿
            this.cards = Deck.arrayDelete(this.cards, num)
            //將this.Pos與num之間的空格的位置刪除 由下一張牌遞補
            // this.newpos = i;
        }
        this.cards = tempDeck;

        // 比較之前和之後結果
        
    }
}