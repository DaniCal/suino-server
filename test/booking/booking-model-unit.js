var Booking = require('../../app/models/booking.js');
var should = require('should');

describe ('Course Unit', function () {


    var testBooking = {
        courseId: '123123123',
        participantId: '123123',
        eventId: '234234'
    };

    it("should return that data is valid (full data)",
        function(done){
            Booking.isBookingDataValid(testBooking, function(err){
                if(err == undefined){
                    done();
                }
                throw err;
            });
        });

    it("should return that data is incomplete",
        function(done){
            testBooking.courseId = undefined;
            Booking.isBookingDataValid(testBooking, function(err){
                if(err != undefined){
                    err.should.equal('data is incomplete');
                    done();
                    testBooking.courseId = '123123123';

                }
            });
        });
});