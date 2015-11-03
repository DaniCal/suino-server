var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var CourseModel = mongoose.model('Course');
var CourseTestData = require('./course-test-data.js');
var async = require('async');

var createCourse = function(course, callback){
    CourseModel.create(course, function (err, courseItem) {
        if (err){
            throw err;
        }else{
            course.id = courseItem._id.toString();
            callback();
        }
    });
};

var clearTestDatabase = function(){
    CourseModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });
};

describe ('Course GET', function () {

    before(function(done){
        var asyncTasks = [];

        var createCourseAsync = function(data){
            asyncTasks.push(
                function(callback){
                    createCourse(data, callback);
                });
        };
        createCourseAsync(CourseTestData.mySpecificSet1);
        createCourseAsync(CourseTestData.mySet2);
        createCourseAsync(CourseTestData.mySet3);
        createCourseAsync(CourseTestData.mySet4);
        createCourseAsync(CourseTestData.notMySet1);
        createCourseAsync(CourseTestData.notMySet2);

        async.parallel(asyncTasks, function(){
            done();
        });
    });

    after(function(done){
        clearTestDatabase();
        done();
    });

    it('should return that received data was processed and course was found',
        function(done){

            request(app)
                .get('/course')
                .type('json')
                .query({_id: CourseTestData.mySpecificSet1.id})
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    CourseModel.findOne({_id: CourseTestData.mySpecificSet1.id},function(err, course) {
                        should.not.exist(err);
                        course.should.be.an.instanceOf(CourseModel);
                        course.id.should.be.equal(CourseTestData.mySpecificSet1.id);
                        course.description.should.be.equal(CourseTestData.mySpecificSet1.description);
                        course.teacherFbId.should.be.equal(CourseTestData.mySpecificSet1.teacherFbId);

                        done();
                    });

                });
        });


    it('should return list of courseIds sorted by proximity',
        function(done){

            request(app)
                .get('/course/search')
                .type('json')
                .query({
                    longitude: 20,
                    latitude: 20
                })
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);

                    var courses = res.body;
                    courses.length.should.be.equal(6);
                    done();
                });
        });

    it('should return list of courseIds sorted by proximity including a certain tag',
        function(done){

            request(app)
                .get('/course/search')
                .type('json')
                .query({
                    longitude: 20,
                    latitude: 20,
                    maxDistance: 10,
                    keywords: ['yoga', 'meditation']
                })
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    var courses = res.body;
                    courses.length.should.be.equal(4);

                    courses[0]._id.should.be.equal(CourseTestData.mySpecificSet1.id);
                    courses[1]._id.should.be.equal(CourseTestData.mySet3.id);
                    courses[2]._id.should.be.equal(CourseTestData.mySet2.id);
                    courses[3]._id.should.be.equal(CourseTestData.mySet4.id);

                    done();
                });
        });

    it('should return an empty list of courses (keywords dont match)',
        function(done){

            request(app)
                .get('/course/search')
                .type('json')
                .query({
                    longitude: 20,
                    latitude: 20,
                    maxDistance: 10,
                    keywords: ['123', '123']
                })
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);

                    var courses = res.body;
                    courses.length.should.be.equal(0);

                    done();
                });
        });

    it('should return list of courseIds sorted by proximity including a certain tag & level',
        function(done){

            request(app)
                .get('/course/search')
                .type('json')
                .query({
                    longitude: 20,
                    latitude: 20,
                    maxDistance: 10,
                    keywords: ['yoga', 'meditation'],
                    level: 1
                })
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);

                    var courses = res.body;
                    courses.length.should.be.equal(3);
                    courses[0]._id.should.be.equal(CourseTestData.mySpecificSet1.id);
                    courses[1]._id.should.be.equal(CourseTestData.mySet2.id);
                    courses[2]._id.should.be.equal(CourseTestData.mySet4.id);

                    done();
                });
        });

    it('should return list of courseIds sorted by proximity including a certain tag & several levels',
        function(done){

            request(app)
                .get('/course/search')
                .type('json')
                .query({
                    longitude: 20,
                    latitude: 20,
                    maxDistance: 10,
                    keywords: ['yoga', 'meditation'],
                    level: [1, 2]
                })
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);

                    var courses = res.body;
                    courses.length.should.be.equal(4);
                    courses[0]._id.should.be.equal(CourseTestData.mySpecificSet1.id);
                    courses[1]._id.should.be.equal(CourseTestData.mySet3.id);
                    courses[2]._id.should.be.equal(CourseTestData.mySet2.id);
                    courses[3]._id.should.be.equal(CourseTestData.mySet4.id);


                    done();
                });
        });

    it('should return list of courseIds sorted by proximity including a certain tag & several levels & single',
        function(done){

            request(app)
                .get('/course/search')
                .type('json')
                .query({
                    longitude: 20,
                    latitude: 20,
                    maxDistance: 10,
                    keywords: ['yoga', 'meditation'],
                    level: [1, 2],
                    groupSize: 1
                })
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);

                    var courses = res.body;
                    courses.length.should.be.equal(1);
                    courses[0]._id.should.be.equal(CourseTestData.mySet2.id);
                    done();
                });
        });

    it('should return list of courseIds sorted by proximity including a certain tag & several levels & group',
        function(done){

            request(app)
                .get('/course/search')
                .type('json')
                .query({
                    longitude: 20,
                    latitude: 20,
                    maxDistance: 10,
                    keywords: ['yoga', 'meditation'],
                    level: [1, 2],
                    groupSize: 2
                })
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    var courses = res.body;
                    courses.length.should.be.equal(3);
                    courses[0]._id.should.be.equal(CourseTestData.mySpecificSet1.id, 'wrong set (specificSet expected) or bad sorting');
                    courses[1]._id.should.be.equal(CourseTestData.mySet3.id, 'wrong set (set3 expected) or bad sorting');
                    courses[2]._id.should.be.equal(CourseTestData.mySet4.id, 'wrong set (set4 expected) or bad sorting');


                    done();
                });
        });
});