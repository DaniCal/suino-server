var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BookingSchema = new Schema({
    courseId: {type: String},
    participantId: {type: String},
    state: {type: Number},
    start: {type: Number}
});

var BookingModel = mongoose.model('Booking', BookingSchema);


var BookingStates = {
    request: 1,
    confirmed: 2,
    canceledOrg: 3,
    canceledPart: 4
};


var Booking = function(data){
    this._courseId = data.courseId;
    this._participantId = data.participantId;
    this._start = data.start;
    this._state = BookingStates.request;

};

Booking.prototype.createBooking = function(callback){
    var newBooking = new BookingModel({
        courseId: this._courseId,
        participantId: this._participantId,
        state: this._state,
        start: this._start
    });
};

Booking.prototype.load = function(callback){

};

Booking.prototype.update = function(callback){

};

Booking.prototype.cancel = function(callback){

};

Booking.prototype.confirm = function(callback){

};

Booking.isBookingDataValid = function(data, callback){
    if(!isDataComplete(data)){
        callback('data is incomplete');
    }else if(!isDataTypeValid(data)){
        callback('data type is not valid');
    }else{
        callback();
    }
};

var isDataComplete = function(data){
    return !(data.courseId == undefined ||
    data.participantId == undefined ||
    data.start == undefined);
};

var isDataTypeValid = function(data){
    return !isNaN(data.start);
};

module.exports = Booking;