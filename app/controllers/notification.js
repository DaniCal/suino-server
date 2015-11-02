var Notification = require('../models/notification.js');

//______________________________HTTP CALLS

exports.query = function(req, res){
    var data = req.query;
    Notification.query(data, function(err, notifications){
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send(notifications);
        }
    });
};

exports.read = function(req, res){

};

//______________________________INTERNAL FUNCTIONS

exports.createReservationNotification = function(data, callback){

};

exports.createCancelingNotification = function(data, callback){

};

exports.createFeedbackRequestNotification = function(data, callback){

};

exports.createFeedbackReceivedNotification = function(data, callback){

};

exports.createPublicMessageNotification = function (data, callback){

};