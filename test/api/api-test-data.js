var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ApiTestData = function(){

};


var me = '123123';
var myFbId = '234234';
ApiTestData.fbId = myFbId;

//Course 1

ApiTestData.courseSet1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000101'),
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    teacherFirstName: 'Dani',
    teacherFbPictureLink: 'somelink.com/link',
    level: 1,
    location:  [20,20],
    groupSize: 4,
    category: 'fitness',
    tags: ['yoga','meditation'],
    price: 5
};

ApiTestData.eventSet1EmptyC1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000001'),
    courseId: ApiTestData.courseSet1._id.toString(),
    participants: [],
    start: 220000,
    end: 220000,
    state: 1
};

ApiTestData.eventSet2PlacesLeftC1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000002'),
    courseId: ApiTestData.courseSet1._id.toString(),
    participants: [me, '3345345'],
    start: 210000,
    end: 210010,
    state: 1
};

ApiTestData.eventSet3FullC1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
    courseId: ApiTestData.courseSet1._id.toString(),
    participants: [me, '3345345', '23423234', '234333'],
    start: 100000,
    end: 100010,
    state: 1
};

ApiTestData.eventSet4CanceledC1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000004'),
    courseId: ApiTestData.courseSet1._id.toString(),
    participants: ['234234', me],
    start: 200000,
    end: 200010,
    state: 3
};

ApiTestData.eventSet5PlacesLeftC1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000005'),
    courseId: ApiTestData.courseSet1._id.toString(),
    participants: ['234234', me, '4353455'],
    start: 200000,
    end: 200010,
    state: 1
};

ApiTestData.eventSet6EmptyC1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000006'),
    courseId: ApiTestData.courseSet1._id.toString(),
    participants: [],
    start: 250000,
    end: 250010,
    state: 1
};

//Course 2

ApiTestData.courseSet2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000102'),
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    teacherFirstName: 'Dani',
    teacherFbPictureLink: 'somelink.com/link',
    level: 2,
    location:  [20,20],
    groupSize: 1,
    category: 'fitness',
    tags: ['yoga','karate'],
    price: 5
};

ApiTestData.eventSet1EmptyC2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000007'),
    courseId: ApiTestData.courseSet2._id.toString(),
    participants: [],
    start: 220001,
    end: 220011,
    state: 1
};

ApiTestData.eventSet2PlacesLeftC2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000008'),
    courseId: ApiTestData.courseSet2._id.toString(),
    participants: [me, '3345345'],
    start: 210001,
    end: 210011,
    state: 1
};

ApiTestData.eventSet3FullC2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000009'),
    courseId: ApiTestData.courseSet2._id.toString(),
    participants: [me, '3345345', '23423234', '234333'],
    start: 100001,
    end: 100011,
    state: 1
};

ApiTestData.eventSet4CanceledC2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000010'),
    courseId: ApiTestData.courseSet2._id.toString(),
    participants: ['234234', me],
    start: 200001,
    end: 200011,
    state: 3
};

ApiTestData.eventSet5PlacesLeftC2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000011'),
    courseId: ApiTestData.courseSet2._id.toString(),
    participants: ['234234', me, '4353455'],
    start: 200001,
    end: 200011,
    state: 1
};

ApiTestData.eventSet6EmptyC2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000012'),
    courseId: ApiTestData.courseSet2._id.toString(),
    participants: [],
    start: 250001,
    end: 250011,
    state: 1
};


ApiTestData.testUserInDb = {
    fbId : myFbId,
    fbName: 'Daniel Lohse',
    fbPictureLink:'facebook.com/somepicturelink',
    platform: 'apple',
    deviceToken: '123455',
    age:25,
    city: 'Barcelona',
    email: 'daniel.lohse@suinoapp.com'
};

module.exports = ApiTestData;