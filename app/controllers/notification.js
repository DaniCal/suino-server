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
    Notification.createReservationNotification(data, callback);
};

exports.createCancelingNotification = function(data, callback){
    Notification.createCancelingNotification(data, callback);
};

exports.createFeedbackRequestNotification = function(data, callback){
    Notification.createFeedbackRequestNotification(data, callback);
};

exports.createFeedbackReceivedNotification = function(data, callback){
    Notification.createFeedbackReceivedNotification(data, callback);
};

exports.createPublicMessageNotification = function (data, callback){
    Notification.createPublicMessageNotification(data, callback);
};