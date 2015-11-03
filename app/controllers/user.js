var User = require('../models/user.js');

//______________________________HTTP CALLS

exports.load = function(req, res){
    var data = req.query;
    User.load(data, function(err, statusCode, user){
        if(err){
            res.status(statusCode).send(err);
        }else{
            res.status(statusCode).send(user);
        }
    });
};

exports.create = function(req, res) {
    var data = req.body;
    User.load(data, function(err){
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
    var data = req.body;
    User.login(data, function(msg, statusCode){
            res.status(statusCode).send(msg);
    });
};

exports.get = function(data, callback){
    User.load(data, function(err, statusCode, user){
        if(err){
            callback(err);
        }else{
            callback(err, user);
        }
    });
};