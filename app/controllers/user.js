var User = require('../models/user.js');


exports.load = function (req, res, next, id) {

};


exports.create = function (req, res) {
    var data = req.body;

    if(!isRegistrationDataValid(data)){
        res.status(400).send('Received data is incomplete or undefined');
        return;
    }

    var user  = new User(data);

    user.loadFromDb(function(err, exist){
        if (err){
            res.status(500).send();
        }
        else if (!exist){
            user.createUser(function(err){
                res.status(201).send();
            });
        }else{
            res.status(409).send();
        }
    });


};

exports.login = function (req, res) {
    var data = req.body;

    if(!isLoginDataValid(data)){
        res.status(400).send('Received data is incomplete or undefined');
        return;
    }

    var user = new User(data);

    user.loadFromDb(function(err, exist) {
        if (err){
            res.status(500).send();
        }
        else if (!exist){
            res.status(204).send();
        }else{
            res.status(200).send();
        }
    });
};

isLoginDataValid = function (data){
    if(data == null || data == undefined){
        return false;
    }else if(data.deviceToken == undefined || data.fbName == undefined
        || data.platform == undefined || data.fbId == undefined){
        return false;
    }
    return true;
};

isRegistrationDataValid = function (data){
    if(data == null || data == undefined){
        return false;
    }else if(data.deviceToken == undefined || data.fbName == undefined
        || data.platform == undefined || data.fbId == undefined || data.email == undefined){
        return false;
    }
    return true;
};


