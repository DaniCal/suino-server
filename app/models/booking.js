var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BookingSchema = new Schema({
    courseId: {type: String},
    participantId: {type: String},
    confirmed: {type: Boolean},
    date: {type: Number},
    start: {type: Number},
    end: {type:Number}
});

var BookingModel = mongoose.model('Booking', BookingSchema);


var Booking = function(data){
    this._courseId = data.courseId;
    this._participantId = data.participantId;
    this._date = data.date;
    this._start = data.start;
    this._end = data.end;
};

Booking.prototype.createBooking = function(callback){

};

Booking.prototype.load = function(callback){

};

Booking.isBookingDataValid = function(){

};