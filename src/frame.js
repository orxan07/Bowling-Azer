'use strict';
var FrameStatus = require('../src/status.js');
var MAX_PINS = 10;

var Frame = {

    init: function(id, previousFrame){

        this.previosFrame = previousFrame;

        this.id = id;
        this.firstShoot = undefined;
        this.secondShoot = undefined;
        this.thirdShoot = undefined;
        this.score = 0;
        this.status = FrameStatus.REGULAR;
    },

    isOver: function(){
        if (this.firstShoot !== undefined && this.secondShoot !== undefined) {
            return true;
        } else {
            return false;
        }
    },

    isStrike: function() {
        return this.status === FrameStatus.STRIKE;
    },

    isSpare: function () {
        return this.status === FrameStatus.SPARE;
    },

    updateStatus: function (pins) {
        if (pins === MAX_PINS) {
            this.status = FrameStatus.STRIKE;
            this.secondShoot = 0;
        }
        else if (this.score === MAX_PINS) {
            this.status = FrameStatus.SPARE;
        }
    },

    update: function (pins) {

        if (this.previosFrame && this.previosFrame.isStrike()) {
            this.previosFrame.score += pins;
        }
        else if (this.previosFrame && this.previosFrame.isSpare() && !this.firstShoot) {
            this.previosFrame.score += pins;
        }

        if (!this.firstShoot) {
            this.firstShoot = pins;
        }
        else {
            this.secondShoot = pins;
        }
        this.score += pins;

        this.updateStatus(pins);

    }
};

module.exports = Frame;