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


describe ('Course GET', function () {

    var courseInDb = {
        id: '123123123',
        date: 12,
        description: 'some description',
        teacherFbId: '123123123123',
        teacherFirstName: 'Dani',
        teacherFbPictureLink: 'somelink.com/link',
        level: 1,
        location: {longitude: 20, altitude: 20},
        groupSize: 4,
        category: 'fitness',
        tags: ['yoga'],
        price: 5,
        availability: {
            days: [
                {
                    dayOfTheWeek: 3,
                    start: 123123,
                    end: 123123
                }
            ]
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

    it('should return that received data was processed and course was found',
        function(done){

            request(app)
                .get('/course')
                .type('json')
                .query(123123123)
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    CourseModel.findOne({id: courseInDb.id},function(err, course) {
                        should.not.exist(err)
                        course.should.be.an.instanceOf(CourseModel);
                        course.id.should.be.equal(courseInDb.id);
                        course.description.should.be.equal(courseInDb.description);
                        course.teacherFbId.should.be.equal(courseInDb.teacherFbId);

                        done();
                    });

                });
        });
});