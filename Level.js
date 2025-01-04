// 不同的Level分配出對應牌的數目
// 完成後Deck裡面牌巳完成分配
class PrepareCardsForLevel {
    constructor(level, scene, grid, deck){
        this.scene = scene;
        this.grid = grid;
        this.level = level;
        this.deck = deck;
        this.completed;

        this.init();
    }

    level0() {
        let pos = 0;
        ['spade', 'heart'].forEach(s => {
            ['2', '3', '4', '5', '6', '7', '8', '9', '10'].forEach(v => {
                this.deck.addCard(new Card(this.scene, s, v, pos++, this.grid))
            })
        })
        return pos;
    }

    level1() {
        let pos = this.level0();
        this.deck.addCard(new Card(this.scene, 'spade', 'J', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'heart', 'J', pos++, this.grid));
        return pos;
    }

    level2() {
        let pos = this.level1();
        this.deck.addCard(new Card(this.scene, 'spade', 'Q', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'heart', 'Q', pos++, this.grid));
        return pos;        
    }

    level3(){
        let pos = this.level2();
        this.deck.addCard(new Card(this.scene, 'spade', 'K', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'heart', 'K', pos++, this.grid));
        return pos;
    }

    level4(){
        let pos = this.level3();
        this.deck.addCard(new Card(this.scene, 'spade', 'A', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'heart', 'A', pos++, this.grid));
        return pos;
    }

    level5(){
        let pos = this.level4();
        this.deck.addCard(new Card(this.scene, 'club', '2',pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'diamond', '2', pos++, this.grid));
        return pos;
    }

    level6(){
        let pos = this.level5();
        this.deck.addCard(new Card(this.scene, 'club', '3', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'diamond', '3', pos++, this.grid));
        return pos;
    }

    level7(){
        let pos = this.level6();
        this.deck.addCard(new Card(this.scene, 'club', '4', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'diamond', '4', pos++, this.grid));
        return pos;
    }

    level8(){
        let pos = this.level7();
        this.deck.addCard(new Card(this.scene, 'club', '5', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'diamond', '5', pos++, this.grid));
        return pos;
    }

    level9(){
        let pos = this.level8();
        this.deck.addCard(new Card(this.scene, 'club', '6', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'diamond', '6', pos++, this.grid));
        return pos;
    }

    level10(){
        let pos = this.level9();
        this.deck.addCard(new Card(this.scene, 'club', '7', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'diamond', '7', pos++, this.grid));
        return pos;
    }

    level11(){
        let pos = this.level10();
        this.deck.addCard(new Card(this.scene, 'club', '8', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'diamond', '8', pos++, this.grid));
        return pos;
    }

    level12(){
        let pos = this.level11();
        this.deck.addCard(new Card(this.scene, 'club', '9', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'diamond', '9', pos++, this.grid));
        return pos;
    }

    level13(){
        let pos = this.level12();
        this.deck.addCard(new Card(this.scene, 'club', '10', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'diamond', '10', pos++, this.grid));
        return pos;
    }

    level14(){
        let pos = this.level13();
        this.deck.addCard(new Card(this.scene, 'club', 'J', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'diamond', 'J', pos++, this.grid));
        return pos;
    }

    level15(){
        let pos = this.level14();
        this.deck.addCard(new Card(this.scene, 'club', 'Q', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'diamond', 'Q', pos++, this.grid));
        return pos;
    }

    level16(){
        let pos = this.level15();
        this.deck.addCard(new Card(this.scene, 'club', 'K', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'diamond', 'K', pos++, this.grid));
        return pos;
    }

    level17(){
        let pos = this.level16();
        this.deck.addCard(new Card(this.scene, 'club', 'A', pos++, this.grid));
        this.deck.addCard(new Card(this.scene, 'diamond', 'A', pos++, this.grid));
        return pos;
    }
    complete(){
        // let pos = this.level17()
        this.completed = this.scene.add.text(130,100, 'Well done!!', {fontSize:'20px', fill:'#FFF'});
        // return pos
    }

    init() {
        switch (this.level) {
            case 0: this.level0(); break;
            case 1: this.level1(); break;
            case 2: this.level2(); break;
            case 3: this.level3(); break;
            case 4: this.level4(); break;
            case 5: this.level5(); break;
            case 6: this.level6(); break;
            case 7: this.level7(); break;
            case 8: this.level8(); break;
            case 9: this.level9(); break;
            case 10: this.level10(); break;
            case 11: this.level11(); break;
            case 12: this.level12(); break;
            case 13: this.level13(); break;
            case 14: this.level14(); break;
            case 15: this.level15(); break;
            case 16: this.level16(); break;
            case 17: this.level17(); break;
            case 18: this.complete(); break;
            default:
        }        
    }
}

