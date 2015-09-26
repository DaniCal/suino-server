var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var CourseModel = mongoose.model('Course');


var createCourse = function(course){
    CourseModel.create(course, function (err, course) {
        if (err){
            throw 'Test course was not created';
        }
    });
};

var clearTestDatabase = function(){
    CourseModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });
};

describe ('Course POST', function (){

    var courseInDb = {
        title: 'some title',
        description: 'some description',
        teacherFbId: '123123123123',
        teacherFirstName: 'Dani',
        teacherFbPictureLink: 'somelink.com/link',
        level: 1,
        location: {longitude: 20, altitude: 20},
        address: {
            country: 'germany',
            city: 'nuremberg',
            zip: '90408',
            street: 'friedrichstrasse',
            number: '43'
        },
        category: 'fitness',
        tags: ['yoga'],
        material: ['matt', 'drink'],
        price: 5,
        availability: {
            days: [{
                date: 1,
                segments: [{
                    start: 2,
                    end: 3,
                    places: 8,
                    students: []
                }]
            }]
        }
    };

    before(function(done){
        createCourse(courseInDb);
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
            courseInDb.title = undefined;
            request(app)
                .post('/course')
                .type('json')
                .send(courseInDb)
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    courseInDb.title = 'some title';
                    done();
                });
        });

    it('should return that data type is not valid (price)',
        function(done){
            courseInDb.price = '2s';
            request(app)
                .post('/course')
                .type('json')
                .send(courseInDb)
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    courseInDb.price = 5;
                    done();
                });
        });

    it('should return that data type is not valid (location)',
        function(done){
            courseInDb.location.longitude = '2s';
            request(app)
                .post('/course')
                .type('json')
                .send(courseInDb)
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    courseInDb.location.longitude = 20;
                    done();
                });
        });

    it('should return that the course was created and data in the database',
        function(done){
            request(app)
                .post('/course')
                .type('json')
                .send(courseInDb)
                .expect(201)
                .end(function(err, res){
                    res.status.should.equal(201);
                    CourseModel.find({title: courseInDb.title}, function(err, courses){
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