var User = require('../models/user.js');


exports.load = function (req, res, next, id) {

};


exports.create = function (req, res) {
    var data = req.body;

    if(!User.isRegistrationDataValid(data)){
        res.status(400).send('Received data is incomplete or undefined');
        return;
    }

    var user  = new User(data);

    user.load(function(err, exist){
        if (err){
            res.status(500).send('Error while loading model from database');
        }
        else if (!exist){
            user.createUser(function(){
                res.status(201).send('User created');
            });
        }else{
            res.status(409).send('User already exists');
        }
    });
};

exports.login = function (req, res) {
    var data = req.body;

    if(!User.isLoginDataValid(data)){
        res.status(400).send('Received data is incomplete or undefined');
        return;
    }

    var user = new User(data);

    user.load(function(err, exist) {
        if (err){
            res.status(500).send('Error while loading model from database');
        }
        else if (!exist){
            res.status(204).send('User does not exist');
        }else{
            res.status(200).send('User found');
        }
    });
};


