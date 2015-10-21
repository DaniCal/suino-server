var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Course = require('../models/course.js');


var BookingSchema = new Schema({
    courseId: {type: String},
    participantId: {type: String},
    eventId: {type: String},
    state: {type: Number}
});

var BookingModel = mongoose.model('Booking', BookingSchema);


var BookingStates = {
    request: 1,
    confirmed: 2,
    canceledOrg: 3,
    canceledPart: 4
};


var Booking = function(data){
    this._participantId = data.participantId;
    this._eventId = data.eventId;
    this._courseId = data.courseId;


    if(!isDataComplete(data)){
        return;
    }
    this._state = BookingStates.request;

};

Booking.prototype.createBooking = function(callback){
    var newBooking = new BookingModel({
        courseId: this._courseId,
        participantId: this._participantId,
        state: this._state,
        start: this._start
    });


    //Check if course really exists
    var course = new Course({id: newBooking.courseId});
    course.load(function(err, course){
        if (err || !course){
            callback('course id is invalid');
        }else{
            newBooking.save(function(err){
                if(err){
                    console.log(err);
                }
            });
            callback();
        }
    });

    //TODO: check if event really exists
};

Booking.prototype.load = function(callback){
    BookingModel.findOne(
        {
            courseId: this._courseId,
            participantId: this._participantId,
            eventId: this._eventId
        }, function(err, booking) {
        if (err || booking == undefined) {
            callback(err, false);
            return;
        }
        callback(false, booking)
    });
};

Booking.prototype.update = function(callback){

};

Booking.prototype.cancel = function(callback){

};

Booking.prototype.confirm = function(callback){

};

Booking.loadAll = function(data, callback){

    if(data == null || data == undefined || data.participantId == undefined){
        callback('data incomplete');
        return;
    }

    BookingModel.find(
        {
            participantId: data.participantId
        }, function(err, bookings) {
            if (err || !bookings || bookings == undefined) {
                callback(err, false);
                return;
            }
            callback(false, bookings)
        });
};

Booking.loadNext = function(data, callback){

};

Booking.isBookingDataValid = function(data, callback) {
    if(data == null || data == undefined){
        callback('data is null or undefined');
    }else if(!isDataComplete(data)){
        callback('data is incomplete');
    }else{
        callback();
    }
};

var isDataComplete = function(data){
    return !(data.courseId == undefined ||
    data.participantId == undefined ||
    data.eventId == undefined);
};


module.exports = Booking;