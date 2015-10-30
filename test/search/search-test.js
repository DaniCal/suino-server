var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var CourseModel = mongoose.model('Course');
var EventModel = mongoose.model('Event');
var SearchTestData = require('./search-test-data.js');


//empty search
//2 tag search
//2 tag level
//category
//1 tag category
//2 tag category
//1 tag size
//2 tag size
//1 tag, size, level
//2 tag, size, level

//no full, no canceled



var createCourse = function(course){
    CourseModel.create(course, function (err, course) {
        if (err){
            throw err;
        }
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
};


describe ('SEARCH', function () {
    before(function(done){

        createCourse(SearchTestData.courseSet1);
        createEvent(SearchTestData.eventSet1EmptyC1);
        createEvent(SearchTestData.eventSet2PlacesLeftC1);
        createEvent(SearchTestData.eventSet3FullC1);
        createEvent(SearchTestData.eventSet4CanceledC1);
        createEvent(SearchTestData.eventSet5PlacesLeftC1);
        createEvent(SearchTestData.eventSet6EmptyC1);


        createCourse(SearchTestData.courseSet2);
        createEvent(SearchTestData.eventSet1EmptyC2);
        createEvent(SearchTestData.eventSet2PlacesLeftC2);
        createEvent(SearchTestData.eventSet3FullC2);
        createEvent(SearchTestData.eventSet4CanceledC2);
        createEvent(SearchTestData.eventSet5PlacesLeftC2);
        createEvent(SearchTestData.eventSet6EmptyC2);


        done();
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
                    res.body[0].eventId.should.equal(SearchTestData.eventSet3FullC1.eventId, 'Not sorted by time');
                    res.body[1].eventId.should.equal(SearchTestData.eventSet3FullC2.eventId, 'Not sorted by time');
                    res.body[2].eventId.should.equal(SearchTestData.eventSet5PlacesLeftC1.eventId, 'Not sorted by time');
                    res.body[3].eventId.should.equal(SearchTestData.eventSet5PlacesLeftC2.eventId, 'Not sorted by time');
                    res.body[4].eventId.should.equal(SearchTestData.eventSet2PlacesLeftC1.eventId, 'Not sorted by time');
                    res.body[5].eventId.should.equal(SearchTestData.eventSet2PlacesLeftC2.eventId, 'Not sorted by time');
                    res.body[6].eventId.should.equal(SearchTestData.eventSet1EmptyC1.eventId, 'Not sorted by time');
                    res.body[7].eventId.should.equal(SearchTestData.eventSet1EmptyC2.eventId, 'Not sorted by time');
                    res.body[8].eventId.should.equal(SearchTestData.eventSet6EmptyC1.eventId, 'Not sorted by time');
                    res.body[9].eventId.should.equal(SearchTestData.eventSet6EmptyC2.eventId, 'Not sorted by time');
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
                    res.body[0].eventId.should.equal(SearchTestData.eventSet3FullC1.eventId, 'Not sorted by time');
                    res.body[1].eventId.should.equal(SearchTestData.eventSet5PlacesLeftC1.eventId, 'Not sorted by time');
                    res.body[2].eventId.should.equal(SearchTestData.eventSet2PlacesLeftC1.eventId, 'Not sorted by time');
                    res.body[3].eventId.should.equal(SearchTestData.eventSet1EmptyC1.eventId, 'Not sorted by time');
                    res.body[4].eventId.should.equal(SearchTestData.eventSet6EmptyC1.eventId, 'Not sorted by time');
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
                    res.body[0].eventId.should.equal(SearchTestData.eventSet3FullC2.eventId, 'Not sorted by time');
                    res.body[1].eventId.should.equal(SearchTestData.eventSet5PlacesLeftC2.eventId, 'Not sorted by time');
                    res.body[2].eventId.should.equal(SearchTestData.eventSet2PlacesLeftC2.eventId, 'Not sorted by time');
                    res.body[3].eventId.should.equal(SearchTestData.eventSet1EmptyC2.eventId, 'Not sorted by time');
                    res.body[4].eventId.should.equal(SearchTestData.eventSet6EmptyC2.eventId, 'Not sorted by time');
                    done();
                });
        });
});