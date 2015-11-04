var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var EventModel = mongoose.model('Event');
var EventTestData = require('./event-test-data.js');

//user not participating

var createEvent = function(event){
    EventModel.create(event, function (err, event) {
        if (err){
            throw 'Test course was not created';
        }
    });
};

var clearTestDatabase = function(){
    EventModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });
};

describe ('Event REMOVE PARTICIPANT', function () {

    before(function (done) {
        createEvent(EventTestData.set1Empty);
        createEvent(EventTestData.set2PlacesLeft);
        createEvent(EventTestData.set3Full);
        createEvent(EventTestData.set4Canceled);
        done();
    });

    after(function (done) {
        clearTestDatabase();
        done();
    });

    it('should return that participant was removed',
        function (done) {
            request(app)
                .put('/event/removeParticipant')
                .type('json')
                .send({
                    _id: EventTestData.set2PlacesLeft._id.toString(),
                    participantId: EventTestData.set2PlacesLeft.participants[0]
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    EventModel.findOne(
                        {_id: EventTestData.set2PlacesLeft._id},
                        function(err, event){
                            event.participants.length.should.equal(1, 'participant not removed from list');
                            done();
                        });

                });
        });

    it('should return that event does not exist',
        function (done) {
            request(app)
                .put('/event/removeParticipant')
                .type('json')
                .send({
                    _id: EventTestData.set5Canceled._id.toString(),
                    participantId: EventTestData.set2PlacesLeft.participants[0]
                })
                .expect(404)
                .end(function (err, res) {
                    res.text.should.equal('Not found');
                    res.status.should.equal(404);
                    done();
                });
        });

    it('should return that user is not participating',
        function (done) {
            request(app)
                .put('/event/removeParticipant')
                .type('json')
                .send({
                    _id: EventTestData.set2PlacesLeft._id.toString(),
                    participantId: 'abcd'
                })
                .expect(400)
                .end(function (err, res) {
                    res.status.should.equal(400);
                    res.text.should.equal('User not participating');
                    done();
                });
        });
});