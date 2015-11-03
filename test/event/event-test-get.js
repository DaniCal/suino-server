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
        createEvent(EventTestData.set5Canceled);

        done();
    });

    after(function (done) {
        clearTestDatabase();
        done();
    });




    it('should return a specific event with a specific ID',
        function (done) {
            request(app)
                .get('/event')
                .type('json')
                .query({
                    eventId: EventTestData.set1Empty.eventId
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.eventId.should.be.equal(EventTestData.set1Empty.eventId);
                    done();

                });
        });


    it('should return that event was not found',
        function (done) {
            request(app)
                .get('/event')
                .type('json')
                .query({
                    eventId: 'blabalsdasd'
                })
                .expect(204)
                .end(function (err, res) {
                    res.status.should.equal(204);
                    done();

                });
        });

    it('should return that data was not valid',
        function (done) {
            request(app)
                .get('/event')
                .type('json')
                .query({
                    eventID: 'blabalsdasd'
                })
                .expect(400)
                .end(function (err, res) {
                    res.status.should.equal(400);
                    done();

                });
        });

    it('should return all event with a certain participantId after a specific date (sorted earliest first)',
        function (done) {
            request(app)
                .get('/event/query')
                .type('json')
                .query({
                    participantId: EventTestData.set2PlacesLeft.participants[0],
                    start: 150000

                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.length.should.be.equal(3);
                    res.body[0].eventId.should.be.equal(EventTestData.set4Canceled.eventId);
                    res.body[1].eventId.should.be.equal(EventTestData.set2PlacesLeft.eventId);
                    res.body[2].eventId.should.be.equal(EventTestData.set5Canceled.eventId);

                    done();

                });
        });

    it('should return all event with a certain participantId after a specific date (sorted & active)',
        function (done) {
            request(app)
                .get('/event/query')
                .type('json')
                .query({
                    participantId: EventTestData.set2PlacesLeft.participants[0],
                    start: 150000,
                    state: 1

                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.length.should.be.equal(1);
                    res.body[0].eventId.should.be.equal(EventTestData.set2PlacesLeft.eventId);
                    done();

                });
        });

    it('should return all event with a certain courseId (sorted)',
        function (done) {
            request(app)
                .get('/event/query')
                .type('json')
                .query({
                    courseId: EventTestData.set1Empty.courseId
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.length.should.be.equal(3);
                    res.body[0].eventId.should.be.equal(EventTestData.set2PlacesLeft.eventId);
                    res.body[1].eventId.should.be.equal(EventTestData.set1Empty.eventId);
                    res.body[2].eventId.should.be.equal(EventTestData.set5Canceled.eventId);

                    done();

                });
        });

    it('should return all event with a certain courseId, after a date & active',
        function (done) {
            request(app)
                .get('/event/query')
                .type('json')
                .query({
                    courseId: EventTestData.set1Empty.courseId,
                    start: 150000,
                    state: 1
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.length.should.be.equal(2);
                    res.body[0].eventId.should.be.equal(EventTestData.set2PlacesLeft.eventId);
                    res.body[1].eventId.should.be.equal(EventTestData.set1Empty.eventId);
                    done();

                });
        });

    it('should return all event with a certain participantId (sorted by date)',
        function (done) {
            request(app)
                .get('/event/query')
                .type('json')
                .query({
                    participantId: EventTestData.set2PlacesLeft.participants[0]
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.length.should.be.equal(4);
                    res.body[0].eventId.should.be.equal(EventTestData.set3Full.eventId);
                    res.body[1].eventId.should.be.equal(EventTestData.set4Canceled.eventId);
                    res.body[2].eventId.should.be.equal(EventTestData.set2PlacesLeft.eventId);
                    res.body[3].eventId.should.be.equal(EventTestData.set5Canceled.eventId);

                    done();

                });
        });


});