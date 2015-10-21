


var BookingTestData = function(){

};


var myParticipantId = '234234';
var notMyParticipantId = '567567567';
var specificCourseId = '123123';
var specificEventId = '567567';

BookingTestData.mySpecificSet1 ={
    courseId: specificCourseId,
    participantId: myParticipantId,
    eventId: specificEventId
};


BookingTestData.mySet2 ={
    courseId: specificCourseId,
    participantId: myParticipantId,
    eventId: '234234'
};

BookingTestData.mySet3 ={
    courseId: '123123123',
    participantId: myParticipantId,
    eventId: '2433452'
};

BookingTestData.mySet4 ={
    courseId: '123123123',
    participantId: myParticipantId,
    eventId: '2343245'
};


BookingTestData.notMySet1 ={
    courseId: '123123123',
    participantId: notMyParticipantId,
    eventId: '2343245'
};

BookingTestData.notMySet2 ={
    courseId: '123123123',
    participantId: notMyParticipantId,
    eventId: '2343245'
};


BookingTestData.notMySet3 ={
    courseId: '123123123',
    participantId: notMyParticipantId,
    eventId: '2343245'
};


BookingTestData.notMySet4 ={
    courseId: '123123123',
    participantId: notMyParticipantId,
    eventId: '2343245'
};



module.exports = BookingTestData;