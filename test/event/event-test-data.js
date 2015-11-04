var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var EventTestData = function(){

};


var me = '123123';


EventTestData.mySpecificCourseSet1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000011'),
    date: 12,
    description: 'some description',
    teacherFbId: '123123',
    level: 1,
    location:  [20,20],
    groupSize: 4,
    category: 'fitness',
    tags: ['yoga'],
    price: 5
};

EventTestData.set1Empty = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000001'),
    courseId: EventTestData.mySpecificCourseSet1._id,
    participants: [],
    start: 220000,
    end: 220000,
    state: 1
};

EventTestData.set2PlacesLeft = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000002'),
    courseId: EventTestData.mySpecificCourseSet1._id,
    participants: [me, '3345345'],
    start: 210000,
    end: 210010,
    state: 1
};

EventTestData.set3Full = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
    courseId: '3',
    participants: [me, '3345345'],
    start: 100000,
    end: 100010,
    state: 1
};

EventTestData.set4Canceled = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000004'),
    courseId: '4',
    participants: ['234234', me],
    start: 200000,
    end: 200010,
    state: 3
};

EventTestData.set5Canceled = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000005'),
    courseId: '1',
    participants: ['234234', me],
    start: 300000,
    end: 300010,
    state: 3
};

EventTestData.set5Incomplete = {
    courseId: '2',
    end: 123123
};

EventTestData.set6DataTypeNotValid = {
    courseId: '2',
    start: '12312s3',
    end: 123123
};

EventTestData.set7Complete = {
    courseId: '1',
    start: 123123,
    end: 123123
};

module.exports = EventTestData;