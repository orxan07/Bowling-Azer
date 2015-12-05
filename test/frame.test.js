/**
 * Created by Azer on 03.12.2015.
 */
'use strict';

var chai = require('chai');

var assert = chai.assert;
var Frame = require('../src/frame');
var FrameStatus = require('../src/status');

describe ('testing the frame object', function(){
    describe('when one update is made', function(){

        var frame = Object.create(Frame);

        before(function(){
            frame.init(0, undefined);
            frame.update(4);
        });

        it('should return 4 as the firstShoot',function(){
            assert.equal(frame.firstShoot,4);
            assert.equal(frame.secondShoot, undefined);
            assert.equal(frame.score, 4);
        });
    });

    describe('when two updates are made', function(){

        var frame = Object.create(Frame);

        before(function(){
            frame.init(0, undefined);
            frame.update(4);
            frame.update(5);
        });

        it('should return 5 as the secondShoot',function(){
            assert.equal(frame.firstShoot, 4);
            assert.equal(frame.secondShoot, 5);
            assert.equal(frame.score, 9);
        });
    });

    describe('#isOver after first shoot', function(){

        var frame = Object.create(Frame);

        before(function(){
            frame.init(0, undefined);
            frame.update(4);
        });

        it('should return 5 as the secondShoot',function(){
            var actual = frame.isOver();
            assert.equal(actual, false);
        });
    });

    describe('#isOver after one shoots, previous frame is regular frame', function(){

        var frame = Object.create(Frame);

        var previousFrame = Object.create(Frame);

        before(function(){
            previousFrame.init(0, undefined);
            previousFrame.update(3);
            previousFrame.update(4);

            frame.init(1, previousFrame);
            frame.update(4);
            //frame.update(5);
        });

        it('frame should be over',function(){

            var actual = frame.isOver();
            assert.equal(actual, false);
        });
    });

    describe('#isOver after two shoots, previous frame is regular frame', function(){

        var frame = Object.create(Frame);

        var previousFrame = Object.create(Frame);

        before(function(){
            previousFrame.init(0, undefined);
            previousFrame.update(3);
            previousFrame.update(4);

            frame.init(1, previousFrame);
            frame.update(4);
            frame.update(5);
        });

        it('frame should be over',function(){

            var actual = frame.isOver();
            assert.equal(actual, true);
        });
    });

    describe('#update after two shoots, previous frame is strike', function(){

        var frame = Object.create(Frame);

        var previousFrame = Object.create(Frame);

        before(function(){
            previousFrame.init(0, undefined);
            previousFrame.update(10);

            frame.init(1, previousFrame);
            frame.update(4);
            frame.update(5);
        });

        it('frame should be over',function(){

            assert.equal(previousFrame.score, 19);

            assert.equal(frame.isOver(), true);
            assert.equal(frame.score, 9);
        });
    });


    describe('#update after two shoots, previous frame is spare', function(){

        var frame = Object.create(Frame);

        var previousFrame = Object.create(Frame);

        before(function(){
            previousFrame.init(0, undefined);
            previousFrame.update(4);
            previousFrame.update(6);

            frame.init(1, previousFrame);
            frame.update(3);
            frame.update(2);
        });

        it('frame should be over',function(){

            assert.equal(previousFrame.score, 13);

            assert.equal(frame.isOver(), true);
            assert.equal(frame.score, 5);
        });
    });


    describe('strike frame', function () {

        var frame = Object.create(Frame);

        before(function () {
            frame.init(0, undefined);

            frame.update(10);
        });

        it ('frame should have STRIKE status', function () {
            assert.isTrue(frame.isStrike());
            assert.equal(frame.secondShoot, 0);
        })
    });

    describe('spare frame', function () {

        var frame = Object.create(Frame);

        before(function () {
            frame.init(0, undefined);

            frame.update(4);
            frame.update(6);
        });

        it ('frame should have STRIKE status', function () {
            assert.isTrue(frame.isSpare());
        })
    });


    describe('#updateStatus regular frame', function () {

        var frame = Object.create(Frame);
        before(function () {
            frame.init(0, undefined);
            frame.updateStatus(5);
        });

        it('status should be REGULAR', function () {
            assert.equal(frame.status, FrameStatus.REGULAR);
        });
    });

    describe('#updateStatus strike frame', function () {

        var frame = Object.create(Frame);
        before(function () {
            frame.init(0, undefined);
            frame.updateStatus(10);
        });

        it('status should be STRIKE', function () {
            assert.equal(frame.status, FrameStatus.STRIKE);
        });
    });

    describe('#updateStatus spare frame', function () {

        var frame = Object.create(Frame);
        before(function () {
            frame.init(0, undefined);
            frame.update(4);
            frame.update(6);
        });

        it('status should be SPARE', function () {
            assert.equal(frame.status, FrameStatus.SPARE);
        });
    });

});