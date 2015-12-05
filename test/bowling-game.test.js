/**
 * Created by Azer on 01.12.2015.
 */
'use strict';
var FrameStatus = require('../src/status.js');
var chai = require('chai');
var assert = chai.assert;

var BowlingGame = require('../src/bowling-game');

describe('Testing Bowling game', function() {

    describe('must create game with given players count', function() {

        var game = Object.create(BowlingGame);
        before(function() {
           game.init(3);
        });

        it('should return created game participants count', function() {
            var expected = 3;
            var actual = game.players.length;
            assert.equal(actual,expected);
        });
    });

    describe('must create a player frames', function() {

        var game = Object.create(BowlingGame);
        before(function() {
            game.init(1);
        });

        it('should return created game frame count', function() {
            var expected = 10;
            var actual = game.players[0].frames.length;
            assert.equal(actual,expected);
        });
    });

    describe('with first player shoot', function() {

        var game = Object.create(BowlingGame);
        before(function() {
            game.init(1);
            game.roll(5);
        });

        it('should return created game frame count', function() {
            var expected = 5;
            var actual = game.players[0].frames[0].firstShoot;
            assert.equal(actual,expected);
        });
    });

    describe('with first player made 2 shoots', function(){

        var game = Object.create(BowlingGame);
        before(function(){
            game.init(1);
            game.roll(4);
            game.roll(2);
        });

        it('should return created first and second shoots',function(){
            assert.equal(game.players[0].frames[0].firstShoot,4);
            assert.equal(game.players[0].frames[0].secondShoot,2);
        });
    });

    describe('with first player made 2 shoots and second player made 1 shoot', function(){

        var game = Object.create(BowlingGame);
        before(function(){
            game.init(2);

            game.roll(4);
            game.roll(2);

            game.roll(1);
        });

        it('should return created first shoot of second player',function(){

            assert.equal(game.players[1].frames[0].firstShoot, 1);
        });
    });

    describe('with first player made 3 shoots and second player made 2 shoots', function(){

        var game = Object.create(BowlingGame);
        before(function(){
            game.init(2);

            game.roll(4);
            game.roll(2);

            game.roll(1);
            game.roll(3);

            game.roll(5);
        });

        it('should return first player first shoot in frame2',function(){
            assert.equal(game.players[0].frames[1].firstShoot,5);
        });
    });

    describe('with first and second players made 4 shoots and third player made 3 shoots', function(){

        var game = Object.create(BowlingGame);
        before(function(){
            game.init(3);

            game.roll(4); //1st player
            game.roll(2);

            game.roll(1); //2nd player
            game.roll(3);

            game.roll(5); // 3rd player
            game.roll(4);

            game.roll(4); //1st player
            game.roll(3);

            game.roll(2); //2nd player
            game.roll(1);

            game.roll(3); // 3rd player



        });

        it('should return first player first shoot in frame2',function(){
            assert.equal(game.players[2].frames[1].firstShoot,3);
        });
    });

    describe('#setNextPlayer',function() {
        describe('when 2 players are playing after first player finished his turn', function () {
            var game = Object.create(BowlingGame);
            before(function () {
                game.init(2);

                game.roll(5);
                game.roll(3);
            });
            it('should return the second player',function(){

                var actual = game.getCurrentPlayer();
                var expected = 1;
                assert.equal(actual.id, expected);
            })
        });

        describe('when 2 players are playing after second player finished his turn', function () {
            var game = Object.create(BowlingGame);
            before(function () {
                game.init(2);

                game.setNextPlayer();
                game.setNextPlayer();
            });
            it('should return the first player',function(){

                var actual = game.getCurrentPlayer();
                var expected = 0;
                assert.equal(actual.id, expected);
            })
        });
    });



    describe('when  STRIKE is made',function(){
        var game = Object.create(BowlingGame);
        before(function(){
            game.init(1);

            game.roll(10);

            game.roll(4);
            game.roll(3);
        });
        it('should return the status as STRIKE',function(){

            var expected =  FrameStatus.STRIKE;
            var actual = game.players[0].frames[0].status;
            assert.equal(actual,expected);


        });

        it('should return the score as 24',function(){

            var expected = 24;
            var actual = game.players[0].score();
            assert.equal(actual,expected);


        });

    });

    describe('when  SPARE is made',function(){
        var game = Object.create(BowlingGame);
        before(function(){
            game.init(1);

            game.roll(4);
            game.roll(6);

            game.roll(3);
            game.roll(4);
        });
        it('should return the status as SPARE',function(){

            var expected = FrameStatus.SPARE;
            var actual = game.players[0].frames[0].status;

            assert.equal(actual,expected);


        });

        it('should return the score as 20', function(){
            var expected = 20;
            var actual = game.players[0].score();

            assert.equal(actual,expected);
        });
    });

    describe('when 2 players are present and first has made 1 shoot and second has made 2',function(){
        var game = Object.create(BowlingGame);
        before(function(){
            game.init(2);

            game.roll(10);

            game.roll(4);
            game.roll(3);

            game.roll(5);
            game.roll(3);
        });

        it('should return 7 as the score of second player',function(){
            var expected = 26;
            console.log('$$$',game.players[0])
            var actual = game.players[0].score();
            assert.equal(actual,expected);
        })
    })


});