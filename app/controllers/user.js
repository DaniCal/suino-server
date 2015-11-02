var User = require('../models/user.js');


exports.load = function (req, res, next, id) {

};


exports.create = function(req, res) {
    var data = req.body;

    User.load(data, function(err, statusCode, user){
        if(err){
            User.createUser(data, function(msg, statusCode){
                res.status(statusCode).send(msg);
            });
        }else{
            res.status(409).send('user already registered');
        }
    });
};

exports.login = function (req, res) {
    var data = req.query;

    User.createUser(data, function(){

    });


    if(!User.isLoginDataValid(data)){
        res.status(400).send(statusMessage.dataIncomplete);
        return;
    }

    var user = new User(data);

    user.load(function(err, exist) {
        if (err){
            res.status(500).send(statusMessage.dbError);
        }
        else if (!exist){
            res.status(204).send(statusMessage.dataNotFound);
        }else{
            res.status(200).send(statusMessage.dataFound);
        }
    });
};


