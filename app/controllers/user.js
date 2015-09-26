var User = require('../models/user.js');


exports.load = function (req, res, next, id) {

};


var statusMessage = {
    'dataIncomplete': 'Received data is incomplete or undefined',
    "dbError": 'Error while loading model from database',
    'dataCreated': 'New item created',
    'dataExist': 'Item already exists',
    'dataNotFound': 'Item not found',
    'dataFound': 'Item found'
};

exports.create = function(req, res) {
    var data = req.body;

    if(!User.isRegistrationDataValid(data)){
        res.status(400).send(statusMessage.dataIncomplete);
        return;
    }

    var user  = new User(data);

    user.load(function(err, exist){
        if (err){
            res.status(500).send(statusMessage.dbError);
        }
        else if (!exist){
            user.createUser(function(){
                res.status(201).send(statusMessage.dataCreated);
            });
        }else{
            res.status(409).send(statusMessage.dataExist);
        }
    });
};

exports.login = function (req, res) {
    var data = req.query;

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


