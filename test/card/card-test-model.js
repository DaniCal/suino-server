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
    uuid: '1111222233334444',
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
}

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
            var data = {uuid: 1111222233334444};
            var card = new Card(data);
            card.loadFromDb();
            should.exist(card.uuid, 'uuid should exist');
            should.exist(card.title, 'title should exist');
            should.exist(card.mode, 'mode should exist');
            should.exist(card.stickerUuid, 'stickerUuid should exist');
            should.exist(card.creatorFbId, 'creatorFbId should exist');
            should.exist(card.creatorFbName, 'creatorFbName should exist');
            should.exist(card.date, 'date should exist');
            should.exist(card.finalDate, 'finalDate should exist');
            should.exist(card.location, 'location should exist');
            should.exist(card.invited, 'invited should exist');

            card.uuid.should.be.equal(testCard.uuid);

            done();
        });

});