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
        longitude: '',
        description: 'Room 2.222'
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
        longitude: '',
        description: 'Room 2.222'
    },
    invited: [{
        fbId: '123455',
        fbName: 'Max Mustermann',
        participating: 'no',
        read: false
    }]
};

describe ('Card Unit - Load & Create', function (){
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
            Card.create(testCardInsert, function(err, card){
                should.not.exist(err, 'error while writing in database');
                should.exist(card, 'new card does not exist');
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
                    card.location.description.should.be.equal(testCardInsert.location.description);

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

    it('should return that this hash is already in use to create a card',
        function(done){
            done();
        });

    it('should return that data received is undefined or incomplete',
        function(done){
            done();
        });

    it('should load all cards from this specific user',
        function(done){
            done();
        });
});


describe ('Card Unit Update', function () {
    before(function (done) {
        createCard(testCard);
        done();
    });

    after(function (done) {
        clearTestDatabase();
        done();
    });

    it('should return that card to update does not exist',
        function(done){
            done();
        });

    it('should update title',
        function(done){
            done();
        });

    it('should update sticker',
        function(done){
            done();
        });

    it('should update final date',
        function(done){
            done();
        });

    it('should update location',
        function(done){
            done();
        });

    it('should update location description',
        function(done){
            done();
        });

    it('should try to update read and return that the user is not invited',
        function(done){
            done();
        });

    it('should update read',
        function(done){
            done();
        });

    it('should try to update participating and return that the user is not invited',
        function(done){
            done();
        });

    it('should update participating',
        function(done){
            done();
        });

    it('should try to add a new user and return that user is already invited',
        function(done){
            done();
        });

    it('should add a new user to the invited list',
        function(done){
            done();
        });

    it('should remove a user from the invited list',
        function(done){
            done();
        });
});