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
                .send('Received data is undefined or incomplete');
        }else{
            User.findOne({ fbId: userData.fbId}, function(err, user){

                if(err){
                    res.status(500).send();
                    return;
                }else if(user == undefined){
                    res.status(204).send();
                    return;
                }

                if(!doesUserHasSameDevice(userData, user)){
                    user.device.push({token: userData.deviceToken, platform: userData.platform});
                    user.save();
                    res.status(200).send();
                }else{
                    res.status(200).send();
                }
            });
        }
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

findUser = function (data, callback){

}

doesUserHasSameDevice = function(data, user){
    for(var i = 0; i < user.device.length; i++){
        if(data.deviceToken == user.device[i].token){
            return true;
        }
    }
    return false;
}



