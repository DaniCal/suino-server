var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var EventModel = mongoose.model('Event');
var CourseModel = mongoose.model('Course');
var EventTestData = require('./event-test-data.js');
var CourseTestData = require('../course/course-test-data.js');



var createEvent = function(event){
    EventModel.create(event, function (err, event) {
        if (err){
            throw 'Test course was not created';
        }
    });
};

var createCourse = function(course){
    CourseModel.create(course, function (err, course) {
        if (err){
            throw err;
        }
    });
};

var clearTestDatabase = function(){
    EventModel.remove({}, function(err){
        if(err) throw 'Database (Events) was not cleared';
    });

    CourseModel.remove({}, function(err){
        if(err) throw 'Database (Course) was not cleared';
    });
};

describe ('Event ADD PARTICIPANT', function () {

    before(function (done) {
        createEvent(EventTestData.set1Empty);
        createEvent(EventTestData.set2PlacesLeft);
        createEvent(EventTestData.set3Full);
        createEvent(EventTestData.set4Canceled);

        createCourse(CourseTestData.mySpecificSet1);
        createCourse(CourseTestData.mySet2);
        createCourse(CourseTestData.mySet3);
        createCourse(CourseTestData.notMySet1);
        createCourse(CourseTestData.notMySet2);

        done();
    });

    after(function (done) {
        clearTestDatabase();
        done();
    });

    it('should return that participant was added (2 places left)',
        function (done) {
            request(app)
                .put('/event/addParticipant')
                .type('json')
                .send({
                    eventId: EventTestData.set2PlacesLeft.eventId,
                    participantId: '567567'
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    EventModel.findOne(
                        {eventId: EventTestData.set2PlacesLeft.eventId},
                        function(err, event){
                            event.participants.length.should.equal(3, 'participant not added to list');
                            done();
                        });

                });
        });

    it('should return that participant was added (empty)',
        function (done) {
            request(app)
                .put('/event/addParticipant')
                .type('json')
                .send({
                    eventId: EventTestData.set1Empty.eventId,
                    participantId: '567567'
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    EventModel.findOne(
                        {eventId: EventTestData.set1Empty.eventId},
                        function(err, event){
                            event.participants.length.should.equal(1, 'participant not added to list');
                            done();
                        });

                });
        });

    it('should return that event is full',
        function (done) {
            request(app)
                .put('/event/addParticipant')
                .type('json')
                .send({
                    eventId: EventTestData.set3Full.eventId,
                    participantId: '567567'
                })
                .expect(400)
                .end(function (err, res) {
                    res.status.should.equal(400);
                    res.text.should.equal('No spots left');
                    done();

                });
        });

    it('should return that user is already participating',
        function (done) {
            request(app)
                .put('/event/addParticipant')
                .type('json')
                .send({
                    eventId: EventTestData.set2PlacesLeft.eventId,
                    participantId: EventTestData.set2PlacesLeft.participants[0]
                })
                .expect(400)
                .end(function (err, res) {
                    res.status.should.equal(400);
                    res.text.should.equal('Already participating');
                    done();

                });
        });

    it('should return that event is canceled',
        function (done) {
            request(app)
                .put('/event/addParticipant')
                .type('json')
                .send({
                    eventId: EventTestData.set4Canceled.eventId,
                    participantId: 'sgfsdf'
                })
                .expect(400)
                .end(function (err, res) {
                    res.status.should.equal(400);
                    res.text.should.equal('Event canceled');

                    done();

                });
        });

    it('should return that event does not exist',
        function (done) {
            request(app)
                .put('/event/addParticipant')
                .type('json')
                .send({
                    eventId: '999999',
                    participantId: 'sgfsdf'
                })
                .expect(404)
                .end(function (err, res) {
                    res.status.should.equal(404);
                    res.text.should.equal('Not found');
                    done();

                });
        });
});