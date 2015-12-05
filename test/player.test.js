/**
 * Created by Azer on 03.12.2015.
 */
'use strict';

var chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
var assert = chai.assert;

var Player = require('../src/player');

describe ('Testing Player object', function () {

    describe('#getPlayingFrame before the first try', function(){

        var player = Object.create(Player);

        before(function () {
            player.init(0);
        });

        it('should return current frame object with undefined first and second shoots', function(){
            var expected = {
                id: 0,
                firstShoot: undefined,
                secondShoot: undefined,
                thirdShoot: undefined,
                score: 0
            };
            assert.shallowDeepEqual(player.getPlayingFrame(), expected);
        });
    });


    describe('#getPlayingFrame at first try with 3 pins', function(){

        var player = Object.create(Player);

        before(function () {
            player.init(0);
            player.play(3);
        });

        it('should return current frame object with firstShoot 3 and secondShoot as undefined', function(){
            var expected = {
                id: 0,
                firstShoot: 3,
                secondShoot: undefined
            };
            assert.shallowDeepEqual(player.getPlayingFrame(), expected);
        });
    });

    describe('#getPlayingFrame with two trays', function(){

        var player = Object.create(Player);

        before(function () {
            player.init(0);
            player.play(3);
            player.play(5);
        });

        it('should return current new frame object', function(){
            var expected = {
                id: 1,
                firstShoot: undefined,
                secondShoot: undefined
            };
            assert.shallowDeepEqual(player.getPlayingFrame(), expected);
        });
    });


    describe('#getPlayingFrame after strike', function(){

        var player = Object.create(Player);

        before(function () {
            player.init(0);
            player.play(10);
        });

        it('should return current new frame object', function(){
            var expected = {
                id: 1,
                firstShoot: undefined,
                secondShoot: undefined
            };
            assert.shallowDeepEqual(player.getPlayingFrame(), expected);
        });
    });

    describe('#play 3 pins', function(){

        var player = Object.create(Player);

        before(function () {
            player.init(0);
            player.play(3);
        });

        it('should return first shoot as 3', function(){
            assert.equal(player.frames[0].firstShoot, 3);
        });
    });

    describe('#play two time 5 pins and 3 pins', function(){

        var player = Object.create(Player);

        before(function () {
            player.init(0);
            player.play(5);
            player.play(3);
        });

        it('should return first and second shoots as 5 and 3', function(){
            assert.equal(player.frames[0].firstShoot, 5);
            assert.equal(player.frames[0].secondShoot, 3);
        });
    });

    describe('#isTurnOver after first shoot', function(){

        var player = Object.create(Player);

        before(function () {
            player.init(0);
            player.play(5);
        });

        it('should return false after first try', function(){
            assert.equal(player.isTurnOver(0), false);
        });
    });

    describe('#isTurnOver after two shoots', function(){

        var player = Object.create(Player);

        before(function () {
            player.init(0);
            player.play(5);
            player.play(1);
        });

        it('should return false as it will return new frame for current user', function(){
            var expected = {
                id: 0,
                firstShoot: 5,
                secondShoot: 1
            };
            assert.shallowDeepEqual(player.frames[0], expected);
            assert.equal(player.isTurnOver(0), true);
        });
    });


    describe('#score player finished 3 turns', function () {

        var player = Object.create(Player);

        before(function () {
            player.init(0);

            player.play(4);
            player.play(3);

            player.play(1);
            player.play(2);

            player.play(5);
            player.play(0);

        });

        it('should have sum all the scores of the frames', function () {
           assert.equal(player.score(), 15);
        });
    })


    describe('#score player finished 3 turns, when the 2nd turn is STRIKE', function () {

        var player = Object.create(Player);

        before(function () {
            player.init(0);

            player.play(4);
            player.play(3);

            player.play(10);

            player.play(5);
            player.play(0);

        });

        it('should have sum all the scores of the frames', function () {
           assert.equal(player.score(), 27);
        });
    })
});