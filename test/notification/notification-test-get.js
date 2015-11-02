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

describe ('Notification GET', function () {
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

    it('should return all Notifications from the specific User ID sorted by date',
        function (done) {
            request(app)
                .get('/notification')
                .type('json')
                .query({
                    userId: NotificationTestData.myUserId
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    var notifications = res.body;
                    notifications.length.should.equal(5);
                    notifications[0].type.should.equal(2);
                    notifications[1].type.should.equal(1);
                    notifications[2].type.should.equal(3);
                    notifications[3].type.should.equal(4);
                    notifications[4].type.should.equal(5);
                    done();
                });
        });



});
