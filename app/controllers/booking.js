var Booking = require('../models/booking.js');


exports.load = function(req, res){

};


exports.create = function(req, res){
    var data = req.body;
    Booking.isBookingDataValid(data, function(err){
        if(err){
            res.status(400).send(err);
        }else{
            var booking  = new Booking(data);
            booking.createBooking(function(err){
                if(err){
                    res.status(400).send(err);
                }else{
                    res.status(201).send();
                }
            });
        }
    });
};