var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventTestData = function(){

};

var myFbId = mongoose.Types.ObjectId('4edd40c86762e0fb12100001').toString();
var participantId_1 = mongoose.Types.ObjectId('4edd40c86762e0fb12110001').toString();
var participantId_2 = mongoose.Types.ObjectId('4edd40c86762e0fb12110003').toString();

EventTestData.newParticipantId_1 = mongoose.Types.ObjectId('4edd40c86762e0fb12110201').toString();
EventTestData.newParticipantId_2 = mongoose.Types.ObjectId('4edd40c86762e0fb12110201').toString();


EventTestData.testUser = {
    _id: myFbId,
    fbName: 'Dani Lo',
    fbId: '123123123',
    fbPictureLink: 'somelink.com/pic',
    age: 25,
    email: 'daniel.lohse@trash.com',
    city: 'Barcelona',
    date: 123123123,
    device: [{token: 'somerandomtoken', platform: 'android'}],
    gender: 'male'
};


EventTestData.mySpecificCourseSet1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000011'),
    date: 12,
    description: 'some description',
    _teacher: myFbId,
    level: 1,
    location:  [20,20],
    groupSize: 4,
    category: 'sport',
    tags: ['yoga'],
    price: 5
};

EventTestData.mySpecificCourseSet2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000012'),
    date: 12,
    description: 'some description',
    _teacher: myFbId,
    level: 1,
    location:  [20,20],
    groupSize: 2,
    category: 'sport',
    tags: ['yoga'],
    price: 5
};

EventTestData.mySpecificCourseSet3 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000013'),
    date: 12,
    description: 'some description',
    _teacher: myFbId,
    level: 1,
    location:  [20,20],
    groupSize: 4,
    category: 'sport',
    tags: ['yoga'],
    price: 5
};

EventTestData.set1Empty = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000001'),
    _course: EventTestData.mySpecificCourseSet1._id,
    _participants: [],
    start: 220000,
    end: 220000,
    state: 1
};

EventTestData.set2PlacesLeft = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000002'),
    _course: EventTestData.mySpecificCourseSet1._id,
    _participants: [participantId_1, participantId_2],
    start: 210000,
    end: 210010,
    state: 1
};

EventTestData.set3Full = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
    _course: EventTestData.mySpecificCourseSet2._id.toString(),
    _participants: [participantId_1, participantId_2],
    start: 100000,
    end: 100010,
    state: 1
};

EventTestData.set4Canceled = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000004'),
    _course:EventTestData.mySpecificCourseSet3._id.toString(),
    _participants: [participantId_2, participantId_1],
    start: 200000,
    end: 200010,
    state: 3
};

EventTestData.set5Canceled = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000005'),
    _course: mongoose.Types.ObjectId('4edd40c86762e0fb12000105'),
    _participants: [participantId_2, participantId_1],
    start: 300000,
    end: 300010,
    state: 3
};

EventTestData.set5Incomplete = {
    _course: EventTestData.mySpecificCourseSet2._id,
    end: 123123
};

EventTestData.set6DataTypeNotValid = {
    _course: EventTestData.mySpecificCourseSet2._id,
    start: '12312s3',
    end: 123123
};

EventTestData.set7Complete = {
    _course: EventTestData.mySpecificCourseSet1._id,
    start: 123123,
    end: 123123
};

module.exports = EventTestData;