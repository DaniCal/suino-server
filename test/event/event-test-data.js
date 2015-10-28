var EventTestData = function(){

};


EventTestData.set1Empty = {
    eventId: '1',
    courseId: '1',
    participants: [],
    start: 123123,
    end: 123123,
    state: 1
};

EventTestData.set2PlacesLeft = {
    eventId: '2',
    courseId: '1',
    participants: ['123123', '3345345'],
    start: 123123,
    end: 123123,
    state: 1
};

EventTestData.set3Full = {
    eventId: '3',
    courseId: '3',
    participants: ['123123', '3345345'],
    start: 123123,
    end: 123123,
    state: 1
};

EventTestData.set4Canceled = {
    eventId: '4',
    courseId: '2',
    participants: ['234234', '123123'],
    start: 123123,
    end: 123123,
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