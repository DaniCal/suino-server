var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BookingSchema = new Schema({
    courseId: {type: String},
    participantId: {type: String},
    confirmed: {type: Boolean},
    canceled: {type: Boolean},
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
    var newBooking = new BookingModel({
        courseId: this._courseId,
        participantId: this._participantId,
        confirmed: false,
        canceled: false,
        date: this._date,
        start: this._start,
        end: this._end
    });
};

Booking.prototype.load = function(callback){

};


Booking.prototype.cancel = function(callback){

};

Booking.isBookingDataValid = function(){

};