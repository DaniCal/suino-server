var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require('mongoose');
var NotificationModel = mongoose.model('Notification');
var NotificationTestData = require('./notification-test-data.js');
var Notification = require('../../app/controllers/notification.js');


describe ('Notification UNIT', function () {

    var clearTestDatabase = function(){
        NotificationModel.remove({}, function(err){
            if(err) throw 'Database was not cleared';
        });
    };

    afterEach(function (done) {
        clearTestDatabase();
        done();
    });

    it('should create reservation notification',
        function (done) {
            Notification.createReservationNotification(NotificationTestData.postData,
                function(msg, statusCode){
                    statusCode.should.equal(200);
                    NotificationModel.find({
                        userId: NotificationTestData.myUserId,
                        sourceId: NotificationTestData.mySourceId
                    }, function(err, notifications){
                        notifications.length.should.equal(1);
                        notifications[0].type.should.equal(1);
                        done();
                    });

                });
        });

    it('should create canceling notification',
        function (done) {
            Notification.createCancelingNotification(NotificationTestData.postData,
            function(msg, statusCode){
                statusCode.should.equal(200);
                NotificationModel.find({
                    userId: NotificationTestData.myUserId,
                    sourceId: NotificationTestData.mySourceId
                }, function(err, notifications){
                    notifications.length.should.equal(1);
                    notifications[0].type.should.equal(2);
                    done();
                });

            });
        });


    it('should create feedbackRequest notification',
        function (done) {
            Notification.createFeedbackRequestNotification(NotificationTestData.postData,
                function(msg, statusCode){
                    statusCode.should.equal(200);
                    NotificationModel.find({
                        userId: NotificationTestData.myUserId,
                        sourceId: NotificationTestData.mySourceId
                    }, function(err, notifications){
                        notifications.length.should.equal(1);
                        notifications[0].type.should.equal(3);
                        done();
                    });

                });
        });

    it('should create feedbackReceived notification',
        function (done) {
            Notification.createFeedbackReceivedNotification(NotificationTestData.postData,
                function(msg, statusCode){
                    statusCode.should.equal(200);
                    NotificationModel.find({
                        userId: NotificationTestData.myUserId,
                        sourceId: NotificationTestData.mySourceId
                    }, function(err, notifications){
                        notifications.length.should.equal(1);
                        notifications[0].type.should.equal(4);
                        done();
                    });

                });
        });

    it('should create publicMessage notification',
        function (done) {
            Notification.createPublicMessageNotification(NotificationTestData.postData,
                function(msg, statusCode){
                    statusCode.should.equal(200);
                    NotificationModel.find({
                        userId: NotificationTestData.myUserId,
                        sourceId: NotificationTestData.mySourceId
                    }, function(err, notifications){
                        notifications.length.should.equal(1);
                        notifications[0].type.should.equal(5);
                        done();
                    });

                });
        });

    it('should return that data is incomplete',
        function (done) {
            Notification.createPublicMessageNotification(NotificationTestData.postDataIncomplete,
                function(msg, statusCode){
                    statusCode.should.equal(400);
                    NotificationModel.find({
                        userId: NotificationTestData.myUserId,
                        sourceId: NotificationTestData.mySourceId
                    }, function(err, notifications){
                        notifications.length.should.equal(0);
                        done();
                    });

                });
        });
});