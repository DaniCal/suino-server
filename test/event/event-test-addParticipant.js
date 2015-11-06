var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var EventModel = mongoose.model('Event');
var CourseModel = mongoose.model('Course');
var EventTestData = require('./event-test-data.js');


var createEvent = function(event){
    EventModel.create(event, function (err, event) {
        if (err){
            throw err;
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
        if(err) throw err;
    });

    CourseModel.remove({}, function(err){
        if(err) throw err;
    });
};

describe ('Event ADD PARTICIPANT', function () {

    before(function (done) {
        createEvent(EventTestData.set1Empty);
        createEvent(EventTestData.set2PlacesLeft);
        createEvent(EventTestData.set3Full);
        createEvent(EventTestData.set4Canceled);
        createCourse(EventTestData.mySpecificCourseSet1);
        createCourse(EventTestData.mySpecificCourseSet2);
        createCourse(EventTestData.mySpecificCourseSet3);
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
                    _id: EventTestData.set2PlacesLeft._id,
                    participantId: EventTestData.newParticipantId_1
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    EventModel.findOne(
                        {_id: EventTestData.set2PlacesLeft._id},
                        function(err, event){
                            event._participants.length.should.equal(3, 'participant not added to list');
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
                    _id: EventTestData.set1Empty._id,
                    participantId: EventTestData.newParticipantId_2
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    EventModel.findOne(
                        {_id: EventTestData.set1Empty._id},
                        function(err, event){
                            event._participants.length.should.equal(1, 'participant not added to list');
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
                    _id: EventTestData.set3Full._id,
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
                    _id: EventTestData.set2PlacesLeft._id,
                    participantId: EventTestData.set2PlacesLeft._participants[0]
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
                    _id: EventTestData.set4Canceled._id,
                    participantId: EventTestData.newParticipantId_1
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
                    _id: EventTestData.set5Canceled._id,
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