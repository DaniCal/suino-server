
var mongoose = require('mongoose');

var CourseTestData = function(){

};


var myFbId = mongoose.Types.ObjectId('4edd40c86762e0fb12100001').toString();
var myTags = ['yoga','meditation'];

CourseTestData.testUser = {
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



CourseTestData.mySpecificSet1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000001'),
    date: 12,
    description: 'some description 1',
    _teacher: myFbId,
    level: 1,
    location:  [20,20],
    groupSize: 4,
    category: 'sport',
    tags: myTags,
    price: 5
};

CourseTestData.mySet2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000002'),
    date: 12,
    description: 'some description 2',
    teacherId: myFbId,
    _teacher: myFbId,
    level: 1,
    location:  [23,23],
    groupSize: 1,
    category: 'sport',
    tags: myTags,
    price: 5
};

CourseTestData.mySet3 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
    date: 12,
    description: 'some description',
    teacherId: myFbId,
    _teacher: myFbId,
    level: 2,
    location:  [22,22],
    groupSize: 2,
    category: 'sport',
    tags: myTags,
    price: 5
};

CourseTestData.mySet4 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000004'),
    date: 12,
    description: 'some description',
    teacherId: myFbId,
    _teacher: myFbId,
    level: 1,
    location:  [30,30],
    groupSize: 6,
    category: 'sport',
    tags: myTags,
    price: 5
};


CourseTestData.notMySet1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000011'),
    date: 12,
    description: 'some description',
    teacherId: myFbId,
    _teacher: myFbId,
    level: 3,
    location:  [25,25],
    groupSize: 4,
    category: 'sport',
    tags: ['futbol'],
    price: 5
};

CourseTestData.notMySet2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000012'),
    date: 12,
    description: 'some description',
    teacherId: myFbId,
    _teacher: myFbId,
    level: 2,
    location:  [25,25],
    groupSize: 4,
    category: 'sport',
    tags: ['tennis'],
    price: 5
};


CourseTestData.setIncomplete = {
    date: 12,
    description: 'some description',
    teacherId: myFbId,
    _teacher: myFbId,
    level: 3,
    location:  [25,25],
    groupSize: 4,
    tags: ['tennis'],
    price: 5
};

CourseTestData.setInvalidDataType1 = {
    date: 12,
    description: 'some description',
    teacherId: myFbId,
    _teacher: myFbId,
    level: 1,
    location:  [25,25],
    groupSize: 4,
    category: 'sport',
    tags: ['tennis'],
    price: '4s'
};

CourseTestData.setInvalidDataType2 = {
    date: 12,
    description: 'some description',
    teacherId: myFbId,
    level: 2,
    location:  25,
    groupSize: 4,
    category: 'sport',
    tags: ['tennis'],
    price: 5
};





module.exports = CourseTestData;