var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var CourseModel = mongoose.model('Course');
var CourseTestData = require('./course-test-data.js');
var UserModel = mongoose.model('User');
var CourseC = require('../../app/controllers/course.js');
var CourseM = require('../../app/models/course.js');


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

describe ('Course UNIT Controller', function () {

    before(function (done) {
        createUser(CourseTestData.testUser);
        createCourse(CourseTestData.mySpecificSet1);
        done();
    });

    after(function (done) {
        clearTestDatabase();
        done();
    });

    it('should return the course with the specific _id and the associated user data',
        function(done){
            CourseC.loadById(
                {_id: CourseTestData.mySpecificSet1._id},
                function(err, course){
                    err.should.be.false;
                    course.should.exist;
                    course._teacher.should.exist;
                    course._teacher.fbName.should.exist;
                    course._id.toString().should.be.equal(CourseTestData.mySpecificSet1._id.toString());
                    course._teacher._id.toString().should.be.equal(CourseTestData.testUser._id.toString());
                    done();
                });
        });

    it('should return that course with the specific _id does not exist',
        function(done){
            CourseC.loadById(
                {_id: CourseTestData.mySet2._id},
                function(err, course){
                    err.should.be.equal('course not found');
                    should.not.exist(course);
                    done();
                });
        });

    it('should return that data sent is not valid',
        function(done){
            CourseC.loadById(
                {id: CourseTestData.mySpecificSet1._id},
                function(err, course){
                    err.should.be.equal('data not valid');
                    should.not.exist(course);
                    done();
                });
        });
});

describe ('Course UNIT Model', function () {

    before(function (done) {
        createUser(CourseTestData.testUser);
        createCourse(CourseTestData.mySpecificSet1);
        done();
    });

    after(function (done) {
        clearTestDatabase();
        done();
    });

    it('should return the update information is not valid (level negative)',
        function(done){
            CourseM.update(
                {
                    _id: CourseTestData.mySpecificSet1._id,
                    level: -1
                },
                function(err, statusCode){
                    err.should.exist;
                    statusCode.should.be.equal(400);
                    err.should.be.equal('data not valid');
                    done();
                });
        });

    it('should return the update information is not valid (category not in enum)',
        function(done){
            CourseM.update(
                {
                    _id: CourseTestData.mySpecificSet1._id,
                    category: 'fitness'
                },
                function(err, statusCode){
                    err.should.exist;
                    statusCode.should.be.equal(400);
                    err.should.be.equal('data not valid');
                    done();
                });
        });

    it('should return the update information is not valid (price negative)',
        function(done){
            CourseM.update(
                {
                    _id: CourseTestData.mySpecificSet1._id,
                    price: -1
                },
                function(err, statusCode){
                    err.should.exist;
                    statusCode.should.be.equal(400);
                    err.should.be.equal('data not valid');
                    done();
                });
        });

    it('should return the update information is not valid (groupSize negative)',
        function(done){
            CourseM.update(
                {
                    _id: CourseTestData.mySpecificSet1._id,
                    groupSize: -1
                },
                function(err, statusCode){
                    err.should.exist;
                    statusCode.should.be.equal(400);
                    err.should.be.equal('data not valid');
                    done();
                });
        });

    it('should return the update information is not valid (location wrong)',
        function(done){
            CourseM.update(
                {
                    _id: CourseTestData.mySpecificSet1._id,
                    level: 3,
                    category: 'cuisine',
                    tags: ['asia', 'cuisine'],
                    price: 15,
                    groupSize: 8,
                    location: {longitude: 2, latitude: 5},
                    description: 'this is a new description'
                },
                function(err, statusCode){
                    err.should.exist;
                    statusCode.should.be.equal(400);
                    err.should.be.equal('data not valid');
                    done();
                });
        });

    it('should return the course was updated (groupSize)',
        function(done){
            CourseM.update(
                {
                    _id: CourseTestData.mySpecificSet1._id,
                    groupSize: 10
                },
                function(msg, statusCode){
                    statusCode.should.be.equal(200);
                    msg.should.be.equal('Course updated');
                    CourseModel.findById(CourseTestData.mySpecificSet1._id,
                    function(err, course){
                        course.groupSize.should.be.equal(10);
                        done();

                    });

                });
        });
    
    it('should return the course was updated (all)',
        function(done){
            CourseM.update(
                {
                    _id: CourseTestData.mySpecificSet1._id,
                    level: 3,
                    category: 'cuisine',
                    tags: ['asia', 'cuisine'],
                    price: 15,
                    groupSize: 8,
                    location: [17,18],
                    description: 'this is a new description'
                },
                function(msg, statusCode){
                    statusCode.should.be.equal(200);
                    msg.should.be.equal('Course updated');
                    CourseModel.findById(CourseTestData.mySpecificSet1._id,
                        function(err, course){
                            course.level.should.be.equal(3);
                            course.category.should.be.equal('cuisine');
                            course.tags[0].should.be.equal('asia');
                            course.tags[1].should.be.equal('cuisine');
                            course.price.should.be.equal(15);
                            course.groupSize.should.be.equal(8);
                            course.location[0].should.be.equal(17);
                            course.location[1].should.be.equal(18);
                            course.description.should.be.equal('this is a new description');
                            done();

                        });

                });
        });
});