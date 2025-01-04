class Player {
    constructor(id, scoreText, score) {
        this.id = id;               // 1 or 2, means player 1 or 2
        this.openCard1 = "EMPTY";   // 舊叫法是card1 for player1, card3 for player2
        this.openCard2 = "EMPTY";   // 舊叫法是card2 for player2, card4 for player2
        this.scoreText = scoreText;
        this.score     = score;
    }

    isPair() { 
        return this.openCard1.value === this.openCard2.value ? true : false;
    }

    isTwoCardsOnHand() {
        return ! (this.openCard1 === "EMPTY" || this.openCard2 === "EMPTY")
    }

    pickCard(card) {
    if (this.openCard1 === "EMPTY")
        this.openCard1 = card;
    else 
        this.openCard2 = card;
    }

    cancelCards() {
        this.openCard1.frameOff();
        this.openCard2.frameOff();

        this.openCard1.destroy();
        this.openCard2.destroy();
    }

    handOffCards() {
        [this.openCard1, this.openCard2] = ["EMPTY","EMPTY"]                
    }

    scoreCalculate() {
        let prevScore = this.score;
        this.score += 10;
        let currScore = this.score;
        
        return [prevScore, currScore];
    }
}