var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var CourseModel = mongoose.model('Course');
var CourseTestData = require('./course-test-data.js');
var UserModel = mongoose.model('User');


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
            var course = CourseTestData.mySpecificSet1;
            request(app)
                .post('/course')
                .type('json')
                .send(course)
                .expect(201)
                .end(function(err, res){
                    res.status.should.equal(201);
                    CourseModel.find({description: course.description}, function(err, courses){
                        should.not.exist(err);
                        should.exist(courses);
                        courses.length.should.be.equal(1);
                        should.exist(courses[0].id);
                        should.exist(courses[0].date);
                    });
                    done();
                });
        });
});