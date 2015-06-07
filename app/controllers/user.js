var mongoose = require('mongoose');
var user = require('../models/user.js');

var User = mongoose.model('User');

var tag = "user controller - ";


exports.load = function (req, res, next, id) {

};


exports.create = function (req, res) {

};

exports.login = function (req, res) {
    var userData = req.body;

    validateUserData(userData, function(err){
        if(err) {
            res.status(400)
                .send('Received data undefined or incomplete');
            return;
        }
    })


    doesUserExist(userData, function(err, user){
        if(err){
            res.status(204)
                .send();
            return;
        }

        doesUserHasSameDevice(userData, user, function(err){
            if(err){
                res.status(200)
                    .send();
            }else{
                updateUserDeviceList(userData, user, function(err){
                    if(err){
                        res.status(500)
                            .send();
                        return;
                    }else{
                        res.status(200)
                            .send();
                        return;
                    }
                });
            }

        });

        res.status(200)
            .send();
    });
};

validateUserData = function (data, callback){
    if(data == null || data == undefined){
        callback(tag + "data received is null or undefined");
    }else if(data.deviceToken == undefined || data.fbName == undefined || data.platform == undefined || data.fbId == undefined){
        callback(tag + "data received is incomplete");
    }else{
        callback();
    }
}

doesUserExist = function (data, callback){
    User.findOne({ fbId: 5}, function (err, user){
        callback(err, user);
    });

}

doesUserHasSameDevice = function(data, user, callback){

}

updateUserDeviceList = function(data, user, callback){

}

