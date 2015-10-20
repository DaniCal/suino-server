var Booking = require('../models/booking.js');

var statusMessage = {
    'dataIncomplete': 'Received data is incomplete or undefined',
    "dbError": 'Error while loading model from database',
    'dataCreated': 'New item created',
    'dataExist': 'Item already exists',
    'dataNotFound': 'Item not found',
    'dataFound': 'Item found'
};

//loads and returns ONE booking of a specific user and course
exports.load = function(req, res){
    var data = req.query;
    var booking = new Booking(data);
    booking.load(function(err, booking){
        if (err || !booking){
            res.status(500).send(statusMessage.dbError);
        }
        else{
            res.status(200).send(booking);
        }
    });
};


//loads and returns all bookings of a specific user
exports.loadAll = function(req, res) {
    var data = req.query;
};

//loads and returns all bookings of a specific user after a specific date
exports.loadNext = function(req, res) {

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