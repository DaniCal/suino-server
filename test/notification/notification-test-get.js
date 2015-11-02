var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var NotificationModel = mongoose.model('Notification');
var NotificatioinTestData = require('./notification-test-data.js');

var createNotification = function(notification){
    NotificationModel.create(notification, function(err, notification){
       if(err){
           throw 'Test Notification was not created';
       }
    });
};

var clearTestDatabase = function(){
    NotificationModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });
};

describe ('Notification GET', function () {
    before(function (done) {
        createNotification(NotificatioinTestData.myReservationNotification);
        createNotification(NotificatioinTestData.myCancelationNotification);
        createNotification(NotificatioinTestData.myFeedbackRequestNotification);
        createNotification(NotificatioinTestData.myFeedbackReceivedNotification);
        createNotification(NotificatioinTestData.myPublicMessageNotification);

        createNotification(NotificatioinTestData.otherReservationNotification);
        createNotification(NotificatioinTestData.otherCancelationNotification);
        createNotification(NotificatioinTestData.otherFeedbackRequestNotification);
        createNotification(NotificatioinTestData.otherFeedbackReceivedNotification);
        createNotification(NotificatioinTestData.otherPublicMessageNotification);
        

        done();
    });

    after(function (done) {
        clearTestDatabase();
        done();
    });
});
