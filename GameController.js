class GameController {
    constructor() {
        if(config.DEBUG) console.log("GameController-constructor");

        this.initCardNumber;
        this.gameLevel;
        this.playCardNumbers;
        this.pairedCardNumbers;
        this.player1Score
        this.player2Score
        this.newGameSetting();
    }

    newGameSetting() {
        // this function is called by GameOver
        if(config.DEBUG) console.log("GameController-myInit")
        this.initCardNumber = 18;  //hard code

        this.gameLevel = 0; // Level決定補派多少張牌和最初派多少張牌，如Level 1 只派18張牌，不需要補牌        
        this.playCardNumbers = this.gameLevel * 2 + this.initCardNumber; // depends on level
        
        this.pairedCardNumbers = 0;

        this.player1Score = 0;
        this.player2Score = 0;
    }
    
    goNextLevel(music, timeIsUp) {
        this.gameLevel++;
        this.playCardNumbers = this.gameLevel * 2 + this.initCardNumber;

        // reset to initial state
        this.pairedCardNumbers = 0;
        
        music.stop();
        timeIsUp.stop();
    }

    isGameFinished() {
        return this.pairedCardNumbers === this.playCardNumbers;
    }

    keepScores(player1Score, player2Score) {
        [this.player1Score, this.player2Score] = [player1Score, player2Score]
    }

    countPair() {
        this.pairedCardNumbers += 2;
    }

}