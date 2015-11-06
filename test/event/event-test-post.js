var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var EventModel = mongoose.model('Event');
var EventTestData = require('./event-test-data.js');
var CourseModel = mongoose.model('Course');

var createCourse = function(course){
    CourseModel.create(course, function (err, courseItem) {
        if (err){
            throw err;
        }
    });
};

var clearTestDatabase = function(){
    EventModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });
    CourseModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });
};

describe ('Event POST', function () {

    before(function (done) {
        createCourse(EventTestData.mySpecificCourseSet1);
        done();
    });

    after(function (done) {
        clearTestDatabase();
        done();
    });

    it('should return that data is null or undefined',
        function (done) {
            request(app)
                .post('/event')
                .type('json')
                .send()
                .expect(400)
                .end(function (err, res) {
                    res.status.should.equal(400);
                    done();

                });
        });

    it('should return that data is not valid (incomplete)',
        function (done) {
            request(app)
                .post('/event')
                .type('json')
                .send(EventTestData.set5Incomplete)
                .expect(400)
                .end(function (err, res) {
                    res.status.should.equal(400);
                    done();

                });
        });

    it('should return that data is not valid (wrong data type)',
        function (done) {
            request(app)
                .post('/event')
                .type('json')
                .send(EventTestData.set6DataTypeNotValid)
                .expect(400)
                .end(function (err, res) {
                    res.status.should.equal(400);
                    done();

                });
        });

    it('should return that event was created',
        function (done) {
            request(app)
                .post('/event')
                .type('json')
                .send(EventTestData.set7Complete)
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    EventModel.find(function(err, events){
                        events.length.should.equal(1);
                        done();
                    });

                });
        });
});
