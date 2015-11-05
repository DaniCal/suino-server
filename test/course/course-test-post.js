var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var CourseModel = mongoose.model('Course');
var CourseTestData = require('./course-test-data.js');
var UserModel = mongoose.model('User');

//create course with user not in db

var createUser = function(user){
    UserModel.create(user, function (err, user) {
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
    CourseModel.remove({}, function(err){
        if(err) {
            throw err;
        }
    });

    UserModel.remove({}, function (err) {
        if (err){
            throw err;
        }
    });
};

describe ('Course POST', function (){

    before(function(done){
        createUser(CourseTestData.testUser);
        createCourse(CourseTestData.mySpecificSet1);
        done();
    });

    after(function(done){
        clearTestDatabase();
        done();
    });

    it('should return that data is null or undefined',
        function(done){
            request(app)
                .post('/course')
                .type('json')
                .send()
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    done();

                });
        });

    it('should return that data is incomplete',
        function(done){
            request(app)
                .post('/course')
                .type('json')
                .send(CourseTestData.setIncomplete)
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    done();
                });
        });

    it('should return that data type is not valid (price)',
        function(done){
            request(app)
                .post('/course')
                .type('json')
                .send(CourseTestData.setInvalidDataType1)
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    done();
                });
        });

    it('should return that data type is not valid (location)',
        function(done){
            request(app)
                .post('/course')
                .type('json')
                .send(CourseTestData.setInvalidDataType2)
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    done();
                });
        });

    it('should return that the course was created and data in the database',
        function(done){
            request(app)
                .post('/course')
                .type('json')
                .send(CourseTestData.mySet2)
                .expect(201)
                .end(function(err, res){
                    res.status.should.equal(201);
                    CourseModel
                        .find({description: CourseTestData.mySet2.description})
                        .populate('_teacher')
                        .exec(function(err, courses){
                            should.not.exist(err);
                            should.exist(courses);
                            courses.length.should.be.equal(1);
                            should.exist(courses[0]._id);
                            should.exist(courses[0]._teacher);
                            should.exist(courses[0]._teacher.fbName);
                            courses[0]._teacher.fbName.should.be.equal(CourseTestData.testUser.fbName);
                            courses[0].tags[0].should.be.equal(CourseTestData.mySet2.tags[0]);
                            courses[0].tags[1].should.be.equal(CourseTestData.mySet2.tags[1]);
                            done();
                    });
                });
        });

});