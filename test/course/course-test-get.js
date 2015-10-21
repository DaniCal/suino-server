var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var CourseModel = mongoose.model('Course');
var CourseTestData = require('./course-test-data.js');

var createCourse = function(course){
    CourseModel.create(course, function (err, course) {
        if (err){
            throw err;
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
        createCourse(CourseTestData.mySpecificSet1);
        createCourse(CourseTestData.mySet2);
        createCourse(CourseTestData.mySet3);
        createCourse(CourseTestData.notMySet1);
        createCourse(CourseTestData.notMySet2);



        done();
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
                .query(123123123)
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    CourseModel.findOne({id: CourseTestData.mySpecificSet1.id},function(err, course) {
                        should.not.exist(err)
                        course.should.be.an.instanceOf(CourseModel);
                        course.id.should.be.equal(CourseTestData.mySpecificSet1.id);
                        course.description.should.be.equal(CourseTestData.mySpecificSet1.description);
                        course.teacherFbId.should.be.equal(CourseTestData.mySpecificSet1.teacherFbId);

                        done();
                    });

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
                    courses.length.should.be.equal(3);
                    courses[0].id.should.be.equal(CourseTestData.mySpecificSet1.id);
                    courses[1].id.should.be.equal(CourseTestData.mySet3.id);
                    courses[2].id.should.be.equal(CourseTestData.mySet2.id);
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
});