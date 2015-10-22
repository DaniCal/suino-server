var EventTestData = function(){

};


EventTestData.set1Empty = {
    eventId: '1',
    courseId: '1',
    participants: [],
    spotsLeft: 8,
    start: 123123,
    end: 123123,
    state: 1
};

EventTestData.set2PlacesLeft = {
    eventId: '2',
    courseId: '1',
    participants: ['123123', '3345345'],
    spotsLeft: 8,
    start: 123123,
    end: 123123,
    state: 1
};

EventTestData.set3Full = {
    eventId: '3',
    courseId: '2',
    participants: ['123123', '3345345'],
    spotsLeft: 0,
    start: 123123,
    end: 123123,
    state: 1
};

EventTestData.set3Canceled = {
    eventId: '3',
    courseId: '2',
    participants: ['123123', '3345345'],
    spotsLeft: 0,
    start: 123123,
    end: 123123,
    state: 3
};

module.exports = EventTestData;