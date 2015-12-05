'use strict';

var Player = require('./player');

var BowlingGame = {

    init: function(input){
        this.players = [];
        this.currentPlayer = 0;
        this.gameFrame = 0;

        for(var index = 0; index < input; index++){
            var player = Object.create(Player);
            player.init(index);
            this.players.push(player);
        }
    },

    setNextPlayer: function(){
        if(this.currentPlayer >= this.players.length - 1)  {
            this.currentPlayer = 0;
            this.gameFrame++;
        }
        else this.currentPlayer++;
    },

    getCurrentPlayer: function () {
        return this.players[this.currentPlayer];
    },

    roll:function(pins){
        var currentPlayer = this.getCurrentPlayer();

        currentPlayer.play(pins);

        if(currentPlayer.isTurnOver(this.gameFrame))
            this.setNextPlayer();
    }
};

module.exports = BowlingGame;


