var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var CardModel = mongoose.model('Card');
var Card = require('./../../app/models/card.js');


var createCard = function(card){
    CardModel.create(card, function (err, card) {
        if (err){
            throw 'Test user was not created';
        }
    });
};

var clearTestDatabase = function(){
    CardModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });
};

var testCard = {
    hash: '1111222233334444',
    title: 'LetsBeach',
    mode: 'instant',
    stickerUuid: '1111222233334444',
    creatorFbId: '123456',
    creatorFbName: 'Daniel Lohse',
    date: 123456,
    finalDate: 123457,
    location: {
        altitude: '',
        longitude: ''
    },
    invited: [{
        fbId: '123455',
        fbName: 'Max Mustermann',
        participating: 'no',
        read: false
    }]
};

var testCardInsert = {
    hash: '2222333322223333',
    title: 'LetsBeach',
    mode: 'instant',
    stickerUuid: '1111222233334444',
    creatorFbId: '123456',
    creatorFbName: 'Daniel Lohse',
    date: 123456,
    finalDate: 123457,
    location: {
        altitude: '',
        longitude: ''
    },
    invited: [{
        fbId: '123455',
        fbName: 'Max Mustermann',
        participating: 'no',
        read: false
    }]
};

describe ('Card Unit', function (){
    before(function(done){
        createCard(testCard);
        done();
    });

    after(function(done){
        clearTestDatabase();
        done();
    });

    it('should create a card instance and load data from database',
        function(done){
            var hash = '1111222233334444';
            var card = new Card(hash);
            card.load(function(err, data){
                should.not.exist(err, 'error while reading database');
                data.should.not.be.equal(false, 'user does not exist in database');
                should.exist(data.hash, 'hash should exist');
                should.exist(data.title, 'title should exist');
                should.exist(data.mode, 'mode should exist');
                should.exist(data.stickerUuid, 'stickerUuid should exist');
                should.exist(data.creatorFbId, 'creatorFbId should exist');
                should.exist(data.creatorFbName, 'creatorFbName should exist');
                should.exist(data.date, 'date should exist');
                should.exist(data.finalDate, 'finalDate should exist');
                should.exist(data.location, 'location should exist');
                should.exist(data.invited, 'invited should exist');
                data.hash.should.be.equal(testCard.hash);
                done();
            });
        });

    it('should create a card instance and recognize that card does not exist in db',
        function(done){
            var hash = '4444333322221111';
            var card = new Card(hash);
            card.load(function(err, data){
                should.not.exist(err, 'error while reading database');
                data.should.be.equal(false, 'user should not exist');
                done();
            });
        });

    it('should create a card instance and create an item in the database',
        function(done){
            var card = new Card();
            card.create(testCardInsert, function(err){
                should.not.exist(err, 'error while writing in database');
                CardModel.findOne({hash: testCardInsert.hash}, function(err, card){
                    should.exist(card, 'card should be saved in database');
                    card.hash.should.be.equal(testCardInsert.hash, 'hash should exist');
                    card.title.should.be.equal(testCardInsert.title);
                    card.mode.should.be.equal(testCardInsert.mode);
                    card.stickerUuid.should.be.equal(testCardInsert.stickerUuid);
                    card.creatorFbId.should.be.equal(testCardInsert.creatorFbId);
                    card.creatorFbName.should.be.equal(testCardInsert.creatorFbName);
                    card.date.should.be.equal(testCardInsert.date);
                    card.finalDate.should.be.equal(testCardInsert.finalDate);
                    card.location.altitude.should.be.equal(testCardInsert.location.altitude);
                    card.location.longitude.should.be.equal(testCardInsert.location.longitude);
                    should.exist(card.invited, 'invited array should exist');
                    checkInvited(card.invited);
                    done();

                });
            });

            function checkInvited(invited){
                for(var i = 0; i < invited.length; i++){
                    invited[i].fbId.should.be.equal(testCardInsert.invited[i].fbId);
                    invited[i].fbName.should.be.equal(testCardInsert.invited[i].fbName);
                    invited[i].participating.should.be.equal(testCardInsert.invited[i].participating);
                    invited[i].read.should.be.equal(testCardInsert.invited[i].read);
                }

            }
        });
});