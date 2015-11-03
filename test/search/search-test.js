var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var CourseModel = mongoose.model('Course');
var EventModel = mongoose.model('Event');
var SearchTestData = require('./search-test-data.js');
var UserModel = mongoose.model('User');
var async = require('async');


//empty search
//2 tag search
//2 tag level
//category
//1 tag category
//2 tag category
//2 tag size
//1 tag, size, level
//2 tag, size, level

//no full, no canceled


var createUser = function(user){
    UserModel.create(user, function (err, user) {
        if (err){
            throw 'Test user was not created';
        }
    });
};


var createCourse = function(course, callback){
    CourseModel.create(course, function (err, course) {
        if (err){
            throw err;
        }
        callback(course);
    });
};


var createEvent = function(event){
    EventModel.create(event, function (err, event) {
        if (err){
            throw 'Test course was not created';
        }
    });
};


var clearTestDatabase = function(){
    CourseModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });

    EventModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });
    UserModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });
};


describe ('SEARCH', function () {

    var asyncTasks = [];


    var createCourse1 = function(callback){
        createCourse(SearchTestData.courseSet1, function(course){
            SearchTestData.eventSet1EmptyC1.courseId = course._id.toString();
            SearchTestData.eventSet2PlacesLeftC1.courseId = course._id.toString();
            SearchTestData.eventSet3FullC1.courseId = course._id.toString();
            SearchTestData.eventSet4CanceledC1.courseId = course._id.toString();
            SearchTestData.eventSet5PlacesLeftC1.courseId = course._id.toString();
            SearchTestData.eventSet6EmptyC1.courseId = course._id.toString();

            createEvent(SearchTestData.eventSet1EmptyC1);
            createEvent(SearchTestData.eventSet2PlacesLeftC1);
            createEvent(SearchTestData.eventSet3FullC1);
            createEvent(SearchTestData.eventSet4CanceledC1);
            createEvent(SearchTestData.eventSet5PlacesLeftC1);
            createEvent(SearchTestData.eventSet6EmptyC1);

            callback();
        });
    };

    var createCourse2 = function(callback){
        createCourse(SearchTestData.courseSet2, function(course){
            SearchTestData.eventSet1EmptyC2.courseId = course._id.toString();
            SearchTestData.eventSet2PlacesLeftC2.courseId = course._id.toString();
            SearchTestData.eventSet3FullC2.courseId = course._id.toString();
            SearchTestData.eventSet4CanceledC2.courseId = course._id.toString();
            SearchTestData.eventSet5PlacesLeftC2.courseId = course._id.toString();
            SearchTestData.eventSet6EmptyC2.courseId = course._id.toString();

            createEvent(SearchTestData.eventSet1EmptyC2);
            createEvent(SearchTestData.eventSet2PlacesLeftC2);
            createEvent(SearchTestData.eventSet3FullC2);
            createEvent(SearchTestData.eventSet4CanceledC2);
            createEvent(SearchTestData.eventSet5PlacesLeftC2);
            createEvent(SearchTestData.eventSet6EmptyC2);

            callback();
        });
    };

    before(function(done){


        asyncTasks.push(
            function(callback){
                createCourse1(callback);
            });

        asyncTasks.push(
            function(callback){
                createCourse2(callback);
            });

        async.parallel(asyncTasks, function(){
            createUser(SearchTestData.testUserInDb);
            done();
        });

    });

    after(function(done){
        clearTestDatabase();
        done();
    });

    it('should return the search related results in the right order (tags, active)',
        function(done){
            request(app)
                .get('/search')
                .type('json')
                .query({
                    longitude: 20,
                    latitude: 20,
                    keywords: 'yoga'
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.length.should.equal(10);

                    should.exist(res.body[0].event, 'event is not part of the search object');
                    should.exist(res.body[0].event.participants, 'participants is not part of the event object');
                    should.exist(res.body[0].event.start, 'start is not part of the event object');
                    should.exist(res.body[0].event.end, 'end is not part of the event object');

                    should.exist(res.body[0].course, 'course is not part of the search object');
                    should.exist(res.body[0].course.groupSize, 'groupSize is not part of the course object');
                    should.exist(res.body[0].course.level, 'level is not part of the course object');
                    should.exist(res.body[0].course.price, 'price is not part of the course object');
                    should.exist(res.body[0].course.location, 'location is not part of the course object');
                    should.exist(res.body[0].course.tags, 'tags is not part of the course object');
                    should.exist(res.body[0].course.description, 'description is not part of the course object');


                    should.exist(res.body[0].user, 'user is not part of the search object');
                    should.exist(res.body[0].user.fbName, 'fbFirstName is not part of the search object');
                    should.exist(res.body[0].user.fbPictureLink, 'fbPictureLink is not part of the search object');



                    res.body[0].event.eventId.should.equal(SearchTestData.eventSet3FullC1.eventId, 'Not sorted by time');
                    res.body[1].event.eventId.should.equal(SearchTestData.eventSet3FullC2.eventId, 'Not sorted by time');
                    res.body[2].event.eventId.should.equal(SearchTestData.eventSet5PlacesLeftC1.eventId, 'Not sorted by time');
                    res.body[3].event.eventId.should.equal(SearchTestData.eventSet5PlacesLeftC2.eventId, 'Not sorted by time');
                    res.body[4].event.eventId.should.equal(SearchTestData.eventSet2PlacesLeftC1.eventId, 'Not sorted by time');
                    res.body[5].event.eventId.should.equal(SearchTestData.eventSet2PlacesLeftC2.eventId, 'Not sorted by time');
                    res.body[6].event.eventId.should.equal(SearchTestData.eventSet1EmptyC1.eventId, 'Not sorted by time');
                    res.body[7].event.eventId.should.equal(SearchTestData.eventSet1EmptyC2.eventId, 'Not sorted by time');
                    res.body[8].event.eventId.should.equal(SearchTestData.eventSet6EmptyC1.eventId, 'Not sorted by time');
                    res.body[9].event.eventId.should.equal(SearchTestData.eventSet6EmptyC2.eventId, 'Not sorted by time');
                    done();
                });
        });


    it('should return the search related results in the right order ( 1 tag & level , active)',
        function(done){
            request(app)
                .get('/search')
                .type('json')
                .query({
                    longitude: 20,
                    latitude: 20,
                    keywords: 'yoga',
                    level: 1
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.length.should.equal(5);
                    res.body[0].event.eventId.should.equal(SearchTestData.eventSet3FullC1.eventId, 'Not sorted by time');
                    res.body[1].event.eventId.should.equal(SearchTestData.eventSet5PlacesLeftC1.eventId, 'Not sorted by time');
                    res.body[2].event.eventId.should.equal(SearchTestData.eventSet2PlacesLeftC1.eventId, 'Not sorted by time');
                    res.body[3].event.eventId.should.equal(SearchTestData.eventSet1EmptyC1.eventId, 'Not sorted by time');
                    res.body[4].event.eventId.should.equal(SearchTestData.eventSet6EmptyC1.eventId, 'Not sorted by time');
                    done();
                });
        });

    it('should return the search related results in the right order ( 1 tag & size , active)',
        function(done){
            request(app)
                .get('/search')
                .type('json')
                .query({
                    longitude: 20,
                    latitude: 20,
                    keywords: 'yoga',
                    groupSize: 1
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.length.should.equal(5);
                    res.body[0].event.eventId.should.equal(SearchTestData.eventSet3FullC2.eventId, 'Not sorted by time');
                    res.body[1].event.eventId.should.equal(SearchTestData.eventSet5PlacesLeftC2.eventId, 'Not sorted by time');
                    res.body[2].event.eventId.should.equal(SearchTestData.eventSet2PlacesLeftC2.eventId, 'Not sorted by time');
                    res.body[3].event.eventId.should.equal(SearchTestData.eventSet1EmptyC2.eventId, 'Not sorted by time');
                    res.body[4].event.eventId.should.equal(SearchTestData.eventSet6EmptyC2.eventId, 'Not sorted by time');
                    done();
                });
        });
});