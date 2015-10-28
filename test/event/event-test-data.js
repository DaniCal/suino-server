var EventTestData = function(){

};


var me = '123123';

EventTestData.set1Empty = {
    eventId: '1',
    courseId: '1',
    participants: [],
    start: 220000,
    end: 220000,
    state: 1
};

EventTestData.set2PlacesLeft = {
    eventId: '2',
    courseId: '1',
    participants: [me, '3345345'],
    start: 210000,
    end: 210010,
    state: 1
};

EventTestData.set3Full = {
    eventId: '3',
    courseId: '3',
    participants: [me, '3345345'],
    start: 100000,
    end: 100010,
    state: 1
};

EventTestData.set4Canceled = {
    eventId: '4',
    courseId: '4',
    participants: ['234234', me],
    start: 200000,
    end: 200010,
    state: 3
};

EventTestData.set5Canceled = {
    eventId: '4',
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