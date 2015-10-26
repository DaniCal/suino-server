var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var EventModel = mongoose.model('Event');
var EventTestData = require('./event-test-data.js');

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



describe ('Event GET EVENT', function () {
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


    it('should return all event with a certain courseId',
        function (done) {
            request(app)
                .get('/event/courseId')
                .type('json')
                .query({
                   courseId: EventTestData.set1Empty.courseId
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.length.should.be.equal(2);
                    res.body[0].eventId.should.be.equal(EventTestData.set1Empty.eventId);
                    res.body[1].eventId.should.be.equal(EventTestData.set2PlacesLeft.eventId);
                    done();

                });
        });
});