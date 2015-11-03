
var NotificationTestData = function(){

};

NotificationTestData.myUserId = '123456';
NotificationTestData.mySourceId = '654321';

var myUserId = '123456';
var mySourceId = '654321';

var defaultMessage = 'This is a default notification message';
var defaultToken = '234567';


//POST DATA


NotificationTestData.postData = {
    userId: myUserId,
    sourceId: mySourceId,
    token: defaultToken
};

NotificationTestData.postDataIncomplete = {
    userId: myUserId,
    token: defaultToken
};

//MY

NotificationTestData.myReservationNotification = {
    userId: myUserId,
    sourceId: mySourceId,
    type: 1,
    message: defaultMessage,
    token: defaultToken,
    read: true,
    date: 104
};

NotificationTestData.myCancelationNotification = {
    userId: myUserId,
    sourceId: mySourceId,
    type: 2,
    message: defaultMessage,
    token: defaultToken,
    read: false,
    date: 105
};

NotificationTestData.myFeedbackRequestNotification = {
    userId: myUserId,
    sourceId: mySourceId,
    type: 3,
    message: defaultMessage,
    token: defaultToken,
    read: true,
    date: 102
};

NotificationTestData.myFeedbackReceivedNotification = {
    userId: myUserId,
    sourceId: mySourceId,
    type: 4,
    message: defaultMessage,
    token: defaultToken,
    read: false,
    date: 101
};

NotificationTestData.myPublicMessageNotification = {
    userId: myUserId,
    sourceId: mySourceId,
    type: 5,
    message: defaultMessage,
    token: defaultToken,
    read: false,
    date: 100
};


//OTHER

NotificationTestData.otherReservationNotification = {
    userId: '111111',
    sourceId: mySourceId,
    type: 1,
    message: defaultMessage,
    token: defaultToken,
    read: true,
    date: 100
};

NotificationTestData.otherCancelationNotification = {
    userId: '111111',
    sourceId: mySourceId,
    type: 2,
    message: defaultMessage,
    token: defaultToken,
    read: false,
    date: 100
};

NotificationTestData.otherFeedbackRequestNotification = {
    userId: '111111',
    sourceId: mySourceId,
    type: 3,
    message: defaultMessage,
    token: defaultToken,
    read: false,
    date: 100
};

NotificationTestData.otherFeedbackReceivedNotification = {
    userId: '111111',
    sourceId: mySourceId,
    type: 4,
    message: defaultMessage,
    token: defaultToken,
    read: false,
    date: 100
};

NotificationTestData.otherPublicMessageNotification = {
    userId: '111111',
    sourceId: mySourceId,
    type: 5,
    message: defaultMessage,
    token: defaultToken,
    read: false,
    date: 100
};


module.exports = NotificationTestData;