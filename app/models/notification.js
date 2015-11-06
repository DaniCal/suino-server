var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var NotificationSchema = new Schema({
    userId: {type: String},
    sourceId: {type: String},
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

var createNotification = function(data, type, callback){
    if(!isNotificationDataValid(data)){
        callback('data not valid', 400);
        return;
    }

    var newNotification = new NotificationModel({
        userId: data.userId,
        sourceId: data.sourceId,
        type: type,
        message: generateNotificationMessage(type),
        token: data.token,
        read: false,
        date: getDate()
    });

    newNotification.save(function(err){
        if(err){
            callback('server error', 500);
        }else{
            callback('notification created', 200);
        }
    });
};

Notification.createReservationNotification = function(data, callback){
    createNotification(data, notificationType.reservation, callback);
};

Notification.createCancelingNotification = function(data, callback){
    createNotification(data, notificationType.canceling, callback);
};

Notification.createFeedbackRequestNotification = function(data, callback){
    createNotification(data, notificationType.feedbackRequest, callback);
};

Notification.createFeedbackReceivedNotification = function(data, callback){
    createNotification(data, notificationType.feedbackReceived, callback);
};

Notification.createPublicMessageNotification = function (data, callback){
    createNotification(data, notificationType.publicMessage, callback);
};

Notification.read = function (data, callback){
    NotificationModel.findByIdAndUpdate(
        data._id,
        {
            read: true
        },
        function(err, notification){
            if(err){
                callback(err, 500);
            }else{
                callback('read', 200);
            }
        }
    );
};

Notification.query = function(data, callback){

    if(data == null || data == undefined || data.userId == undefined){
        callback('data not valid');
        return;
    }

    var query = NotificationModel.find({userId: data.userId}); //, callback);

    if(data.read != undefined){
        query.where('read').equals(data.read);
    }


    query.sort({date: -1}).exec(callback);
};

var isNotificationDataValid = function(data){
    if(data == null || data == undefined){
        return false;
    }else if(data.userId == undefined || data.sourceId == undefined||data.token == undefined ){
        return false;
    }else{
        return true;
    }
};

var generateNotificationMessage = function(type){
    return 'This is my default notification message, type: ' + type;
};

var getDate = function(){
    return Math.floor((new Date().getTime()/1000));
};

module.exports = Notification;



