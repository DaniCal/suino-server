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
        if(err){
            res.status(400)
                .send('Received data undefined or incomplete');
        }


    })
};

function validateUserData(data, callback){
    if(data == null || data == undefined){
        callback(tag + "data received is null or undefined");
    }else if(data.device == undefined || data.fb_name == undefined || data.plattform == undefined || data.fb_id == undefined){
        callback(tag + "data received is incomplete");
    }


}