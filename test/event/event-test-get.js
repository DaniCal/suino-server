var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var EventModel = mongoose.model('Event');
var EventTestData = require('./event-test-data.js');
var CourseModel = mongoose.model('Course');

var createEvent = function(event){
    EventModel.create(event, function (err, event) {
        if (err){
            throw err;
        }
    });
};

var createCourse = function(course){
    CourseModel.create(course, function (err, courseItem) {
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



describe ('Event GET EVENT', function () {

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


    it('should return a specific event with a specific ID',
        function (done) {
            request(app)
                .get('/event')
                .type('json')
                .query({
                    _id: EventTestData.set1Empty._id.toString()
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body._id.should.be.equal(EventTestData.set1Empty._id.toString());
                    done();

                });
        });


    it('should return that event was not found',
        function (done) {
            request(app)
                .get('/event')
                .type('json')
                .query({
                    _id: EventTestData.set5Canceled._id.toString()
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
                    participantId: EventTestData.set2PlacesLeft._participants[0],
                    start: 150000

                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.length.should.be.equal(2);
                    res.body[0]._id.should.be.equal(EventTestData.set4Canceled._id.toString());
                    res.body[1]._id.should.be.equal(EventTestData.set2PlacesLeft._id.toString());
                    res.body[0]._course.should.exist;
                    res.body[0]._course.description.should.exist;
                    res.body[0]._course.price.should.exist;
                    res.body[0]._course.groupSize.should.exist;
                    res.body[1]._course.should.exist;
                    res.body[1]._course.description.should.exist;
                    res.body[1]._course.price.should.exist;
                    res.body[1]._course.groupSize.should.exist;
                    done();

                });
        });

    it('should return all event with a certain participantId after a specific date (sorted & active)',
        function (done) {
            request(app)
                .get('/event/query')
                .type('json')
                .query({
                    participantId: EventTestData.set2PlacesLeft._participants[0],
                    start: 150000,
                    state: 1

                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.length.should.be.equal(1);
                    res.body[0]._id.should.be.equal(EventTestData.set2PlacesLeft._id.toString());
                    done();

                });
        });

    it('should return all event with a certain courseId (sorted)',
        function (done) {
            request(app)
                .get('/event/query')
                .type('json')
                .query({
                    _course: EventTestData.mySpecificCourseSet1._id.toString()
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.length.should.be.equal(2);
                    res.body[0]._id.should.be.equal(EventTestData.set2PlacesLeft._id.toString());
                    res.body[1]._id.should.be.equal(EventTestData.set1Empty._id.toString());

                    done();

                });
        });

    it('should return all event with a certain courseId, after a date & active',
        function (done) {
            request(app)
                .get('/event/query')
                .type('json')
                .query({
                    courseId: EventTestData.mySpecificCourseSet1._id.toString(),
                    start: 150000,
                    state: 1
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.length.should.be.equal(2);
                    res.body[0]._id.should.be.equal(EventTestData.set2PlacesLeft._id.toString());
                    res.body[1]._id.should.be.equal(EventTestData.set1Empty._id.toString());
                    done();

                });
        });

    it('should return all event with a certain participantId (sorted by date)',
        function (done) {
            request(app)
                .get('/event/query')
                .type('json')
                .query({
                    participantId: EventTestData.set2PlacesLeft._participants[0]
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.length.should.be.equal(3);
                    res.body[0]._id.should.be.equal(EventTestData.set3Full._id.toString());
                    res.body[1]._id.should.be.equal(EventTestData.set4Canceled._id.toString());
                    res.body[2]._id.should.be.equal(EventTestData.set2PlacesLeft._id.toString());
                    done();

                });
        });
});