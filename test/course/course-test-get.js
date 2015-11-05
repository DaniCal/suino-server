var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var CourseModel = mongoose.model('Course');
var CourseTestData = require('./course-test-data.js');
var UserModel = mongoose.model('User');

var createCourse = function(course){
    CourseModel.create(course, function (err, courseItem) {
        if (err){
            throw err;
        }
    });
};

var createUser = function(user){
    UserModel.create(user, function (err, user) {
        if (err){
            throw err;
        }
    });
};


var clearTestDatabase = function(){
    CourseModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });

    UserModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });
};

describe ('Course GET', function () {

    before(function(done){
        createUser(CourseTestData.testUser);
        createCourse(CourseTestData.mySpecificSet1);
        createCourse(CourseTestData.mySet2);
        createCourse(CourseTestData.mySet3);
        createCourse(CourseTestData.mySet4);
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
                .query({_id: CourseTestData.mySpecificSet1._id.toString()})
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    CourseModel.findOne({_id: CourseTestData.mySpecificSet1._id})
                        .populate('_teacher')
                        .exec(function(err, course) {
                            should.not.exist(err);
                            course.should.be.an.instanceOf(CourseModel);
                            course._id.toString().should.be.equal(CourseTestData.mySpecificSet1._id.toString());
                            course.description.should.be.equal(CourseTestData.mySpecificSet1.description);
                            course._teacher._id.toString().should.be.equal(CourseTestData.mySpecificSet1._teacher.toString());
                            course._teacher.fbName.should.be.equal(CourseTestData.testUser.fbName);
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

                    courses[0]._id.should.be.equal(CourseTestData.mySpecificSet1._id.toString());
                    courses[1]._id.should.be.equal(CourseTestData.mySet3._id.toString());
                    courses[2]._id.should.be.equal(CourseTestData.mySet2._id.toString());
                    courses[3]._id.should.be.equal(CourseTestData.mySet4._id.toString());

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
                    courses[0]._id.should.be.equal(CourseTestData.mySpecificSet1._id.toString());
                    courses[1]._id.should.be.equal(CourseTestData.mySet2._id.toString());
                    courses[2]._id.should.be.equal(CourseTestData.mySet4._id.toString());

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
                    courses[0]._id.should.be.equal(CourseTestData.mySpecificSet1._id.toString());
                    courses[1]._id.should.be.equal(CourseTestData.mySet3._id.toString());
                    courses[2]._id.should.be.equal(CourseTestData.mySet2._id.toString());
                    courses[3]._id.should.be.equal(CourseTestData.mySet4._id.toString());


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
                    courses[0]._id.should.be.equal(CourseTestData.mySet2._id.toString());
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
                    courses[0]._id.should.be.equal(CourseTestData.mySpecificSet1._id.toString(), 'wrong set (specificSet expected) or bad sorting');
                    courses[1]._id.should.be.equal(CourseTestData.mySet3._id.toString(), 'wrong set (set3 expected) or bad sorting');
                    courses[2]._id.should.be.equal(CourseTestData.mySet4._id.toString(), 'wrong set (set4 expected) or bad sorting');


                    done();
                });
        });
});