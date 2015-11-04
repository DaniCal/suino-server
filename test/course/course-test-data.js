
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseTestData = function(){

};


var myFbId = '234234';
var notMyParticipantId = '567567567';
var specificCourseId = '123123';
var specificEventId = '567567';
var myTags = ['yoga','meditation'];

CourseTestData.mySpecificSet1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000001'),
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    level: 1,
    location:  [20,20],
    groupSize: 4,
    category: 'fitness',
    tags: myTags,
    price: 5
};

CourseTestData.mySet2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000002'),
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    level: 1,
    location:  [23,23],
    groupSize: 1,
    category: 'fitness',
    tags: myTags,
    price: 5
};

CourseTestData.mySet3 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    level: 2,
    location:  [22,22],
    groupSize: 2,
    category: 'fitness',
    tags: myTags,
    price: 5
};

CourseTestData.mySet4 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000004'),
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    level: 1,
    location:  [30,30],
    groupSize: 6,
    category: 'fitness',
    tags: myTags,
    price: 5
};


CourseTestData.notMySet1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000011'),
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    level: 3,
    location:  [25,25],
    groupSize: 4,
    category: 'fitness',
    tags: ['futbol'],
    price: 5
};

CourseTestData.notMySet2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000012'),
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    level: 2,
    location:  [25,25],
    groupSize: 4,
    category: 'fitness',
    tags: ['tennis'],
    price: 5
};


CourseTestData.setIncomplete = {
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    level: 3,
    location:  [25,25],
    groupSize: 4,
    tags: ['tennis'],
    price: 5
};

CourseTestData.setInvalidDataType1 = {
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    level: 1,
    location:  [25,25],
    groupSize: 4,
    category: 'fitness',
    tags: ['tennis'],
    price: '4s'
};

CourseTestData.setInvalidDataType2 = {
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    level: 2,
    location:  25,
    groupSize: 4,
    category: 'fitness',
    tags: ['tennis'],
    price: 5
};





module.exports = CourseTestData;