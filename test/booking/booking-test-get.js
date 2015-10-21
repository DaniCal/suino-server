var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var BookingModel = mongoose.model('Booking');
var BookingTestData = require('./booking-test-data.js');

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

    before(function(done){
        createBooking(BookingTestData.mySpecificSet1);
        createBooking(BookingTestData.mySet2);
        createBooking(BookingTestData.mySet3);
        createBooking(BookingTestData.mySet4);
        createBooking(BookingTestData.notMySet1);
        createBooking(BookingTestData.notMySet2);
        createBooking(BookingTestData.notMySet3);
        createBooking(BookingTestData.notMySet4);
        done();
    });

    after(function(done){
        clearTestDatabase();
        done();
    });

    it('should return the specific booking',
        function(done){

            request(app)
                .get('/booking')
                .type('json')
                .query({
                    participantId: BookingTestData.mySpecificSet1.participantId,
                    courseId: BookingTestData.mySpecificSet1.courseId,
                    eventId: BookingTestData.mySpecificSet1.eventId
                })
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    BookingModel.findOne(
                        {
                            courseId: BookingTestData.mySpecificSet1.courseId,
                            participantId: BookingTestData.mySpecificSet1.participantId,
                            eventId: BookingTestData.mySpecificSet1.eventId

                        },function(err, booking) {
                        should.not.exist(err)
                        booking.should.be.an.instanceOf(BookingModel);
                        booking.courseId.should.be.equal(BookingTestData.mySpecificSet1.courseId);
                        booking.participantId.should.be.equal(BookingTestData.mySpecificSet1.participantId);
                        booking.eventId.should.be.equal(BookingTestData.mySpecificSet1.eventId);

                        done();
                    });

                });
        });


    it('should return all bookings from a specific user',
        function(done){
            request(app)
                .get('/booking/all')
                .type('json')
                .query({
                    participantId: BookingTestData.mySpecificSet1.participantId
                })
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    BookingModel.find(
                        {
                            participantId: BookingTestData.mySpecificSet1.participantId

                        },function(err, bookings) {
                            should.not.exist(err);
                            bookings.length.should.be.equal(4);
                            bookings[0].eventId.should.not.be.equal(bookings[1].eventId);;
                            bookings[1].eventId.should.not.be.equal(bookings[3].eventId);;
                            done();
                        });

                });
        });

    //it('should return all future booking from a sepcific user',
    //    function(done){
    //        throw 'not implemented'
    //    });


});