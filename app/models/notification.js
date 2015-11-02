var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    userId: {type: String},
    type: {type: Number},
    message: {type: String},
    token: {type: String},
    read: {type: Boolean},
    date: {type: Number}
});

var notificationType = {
    reservation: 1,
    canceling: 2,
    feedbackRequest: 3,
    feedbackReceived: 4,
    publicMessage: 5
};

var NotificationModel = mongoose.model('Notification', NotificationSchema);

var Notification = function(){};

Notification.createReservationNotification = function(data, callback){

};

Notification.createCancelingNotification = function(data, callback){

};

Notification.createFeedbackRequestNotification = function(data, callback){

};

Notification.createFeedbackReceivedNotification = function(data, callback){

};

Notification.createPublicMessageNotification = function (data, callback){

};

Notification.readNotification = function (data, callback){

};

Notification.query = function(data, callback){
    var query = NotificationModel.find({userId: data.userId}); //, callback);
    query.sort({date: -1}).exec(callback);
};


var createNotificationMessage = function(){

};

var isNotificationDataValid = function(data){
    if(data == null || data == undefined){
        return false;
    }else if(data.userId == undefined || data.type == undefined
    || data.token == undefined ){
        return false;
    }else{
        return true;
    }
};

module.exports = Notification;



