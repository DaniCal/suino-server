var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require('mongoose');
var NotificationModel = mongoose.model('Notification');
var NotificationTestData = require('./notification-test-data.js');

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


describe ('Notification POST', function () {
    before(function (done) {
        createNotification(NotificationTestData.myReservationNotification);
        createNotification(NotificationTestData.myCancelationNotification);
        createNotification(NotificationTestData.myFeedbackRequestNotification);
        createNotification(NotificationTestData.myFeedbackReceivedNotification);
        createNotification(NotificationTestData.myPublicMessageNotification);

        createNotification(NotificationTestData.otherReservationNotification);
        createNotification(NotificationTestData.otherCancelationNotification);
        createNotification(NotificationTestData.otherFeedbackRequestNotification);
        createNotification(NotificationTestData.otherFeedbackReceivedNotification);
        createNotification(NotificationTestData.otherPublicMessageNotification);

        done();
    });

    after(function (done) {
        clearTestDatabase();
        done();
    });

    it('should set the notification read flag true',
        function (done) {

            NotificationModel.findOne({
                userId: NotificationTestData.myUserId,
                type: NotificationTestData.myCancelationNotification.type
            }, function(err, notification){
                request(app)
                    .post('/notification/read')
                    .type('json')
                    .send({
                        _id: notification._id
                    })
                    .expect(200)
                    .end(function (err, res) {
                        res.status.should.equal(200);
                        NotificationModel.findOne({_id: notification._id}, function(err, notification){
                            notification.read.should.equal(true);
                            done();
                        });
                    });
            });
        });
});
