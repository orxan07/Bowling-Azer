'use strict';

var Frame = require('./frame');
var Player = {
    init: function(id){
        this.frames = [];
        this.id = id;
        this.gameFrame = 0;
        var previousFrame = undefined;
        for(var i = 0; i< 10; i++){
            var frame = Object.create(Frame);

            frame.init(i, previousFrame);
            this.frames.push(frame);

            previousFrame = frame;
        }
    },

    getPlayingFrame: function() {
        var result;
        for(var i = 0; i < 10 ; i++){
            if(this.frames[i].firstShoot === undefined || this.frames[i].secondShoot === undefined){
                result = this.frames[i];
                break;
            }
        }
        return result;
    },

    play: function (pins) {
        var currentFrame = this.getPlayingFrame();

        currentFrame.update(pins);

    },

    score: function () {
        return this.frames.reduce(function (totalScore, frame) {
            totalScore += frame.score;
            return totalScore;
        }, 0);
    },

    getFrame: function (frameId) {
        return this.frames[frameId];
    },

    isTurnOver: function(frameId){
        var self = this;
        if (self.getFrame(frameId).isOver()) {
            return true;
        } else {
            this.gameFrame ++ ;
            return false;
        }
    }
};

module.exports = Player;