var User = require('../models/user.js');


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

