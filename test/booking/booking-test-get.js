var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var BookingModel = mongoose.model('Booking');


var createBooking = function(booking){
    BookingModel.create(booking, function (err, booking) {
        if (err){
            throw 'Test booking was not created';
        }
    });
};

var clearTestDatabase = function(){
    BookingModel.remove({}, function(err){
        if(err) throw 'Database (Bookings) was not cleared';
    });
};


describe ('Course GET', function () {

    var bookingInDb = {
        courseId: '123123123',
        participantId: '123123',
        eventId: '234234'
    };

    var testBooking = {
        courseId: '123123123',
        participantId: '123123',
        eventId: '234234'
    };

    before(function(done){
        //createCourse(courseInDb);
        createBooking(bookingInDb);
        done();
    });

    after(function(done){
        clearTestDatabase();
        done();
    });

    it('should return that received data was processed and booking was found',
        function(done){

            request(app)
                .get('/booking')
                .type('json')
                .query({
                    participantId: testBooking.participantId,
                    courseId: testBooking.courseId,
                    eventId: testBooking.eventId
                })
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    BookingModel.findOne({courseId: testBooking.courseId},function(err, booking) {
                        should.not.exist(err)
                        booking.should.be.an.instanceOf(BookingModel);
                        booking.courseId.should.be.equal(testBooking.courseId);
                        booking.participantId.should.be.equal(testBooking.participantId);
                        booking.eventId.should.be.equal(testBooking.eventId);

                        done();
                    });

                });
        });

});