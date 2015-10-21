var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var CourseModel = mongoose.model('Course');
var BookingModel = mongoose.model('Booking');


var createCourse = function(course){
    CourseModel.create(course, function (err, course) {
        if (err){
            throw 'Test course was not created';
        }
    });
};

var createBooking = function(booking){
    BookingModel.create(booking, function (err, booking) {
        if (err){
            throw 'Test booking was not created';
        }
    });
};

var clearTestDatabase = function(){
    CourseModel.remove({}, function(err){
        if(err) throw 'Database (Courses) was not cleared';
    });

    BookingModel.remove({}, function(err){
        if(err) throw 'Database (Bookings) was not cleared';
    });
};

describe ('Booking POST', function (){

    var testBooking = {
        courseId: '123123123',
        participantId: '123123',
        eventId: '234234'
    };

    var courseInDb = {
        id: '123123123',
        description: 'some description',
        teacherFbId: '123123123123',
        teacherFirstName: 'Dani',
        teacherFbPictureLink: 'somelink.com/link',
        level: 1,
        location: [20, 20],
        category: 'fitness',
        tags: ['yoga'],
        price: 5,
        groupSize: 3,
        availability: {
            days: [
                {
                    dayOfTheWeek: 2,
                    start: 3,
                    end: 4
                }
            ],
            dates: [
                {
                    start: 123,
                    end: 123,
                    participants: []
                }
            ]
        }
    };

    before(function(done){
        createCourse(courseInDb);
        //createBooking(testBooking);
        done();
    });

    after(function(done){
        clearTestDatabase();
        done();
    });


    it('should return that data is null or undefined',
        function(done){
            request(app)
                .post('/booking')
                .type('json')
                .send()
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    done();

                });
        });



    it('should return that booking request was created',
        function(done){
            request(app)
                .post('/booking')
                .type('json')
                .send(testBooking)
                .expect(201)
                .end(function(err, res){
                    res.status.should.equal(201);
                    BookingModel.find({courseId: testBooking.courseId}, function(err, bookings){
                        should.not.exist(err);
                        should.exist(bookings);
                        bookings.length.should.be.equal(1);
                        should.exist(bookings[0].courseId);
                        should.exist(bookings[0].participantId);
                        should.exist(bookings[0].start);
                    });
                    done();
                });
        });


    it('should return that course ID is invalid',
        function(done){
            testBooking.courseId = 'abc'
            request(app)
                .post('/booking')
                .type('json')
                .send(testBooking)
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    done();
                    testBooking.courseId = '123123123'
                });
        });
});