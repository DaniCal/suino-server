var SearchTestData = function(){

};

var me = '123123';
var myFbId = '234234';
var myTags = ['yoga','meditation'];

//Course 1

SearchTestData.courseSet1 = {
    id: '1',
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

SearchTestData.eventSet1EmptyC1 = {
    eventId: '1',
    courseId: '1',
    participants: [],
    start: 220000,
    end: 220000,
    state: 1
};

SearchTestData.eventSet2PlacesLeftC1 = {
    eventId: '2',
    courseId: '1',
    participants: [me, '3345345'],
    start: 210000,
    end: 210010,
    state: 1
};

SearchTestData.eventSet3FullC1 = {
    eventId: '3',
    courseId: '1',
    participants: [me, '3345345', '23423234', '234333'],
    start: 100000,
    end: 100010,
    state: 1
};

SearchTestData.eventSet4CanceledC1 = {
    eventId: '4',
    courseId: '1',
    participants: ['234234', me],
    start: 200000,
    end: 200010,
    state: 3
};

SearchTestData.eventSet5PlacesLeftC1 = {
    eventId: '5',
    courseId: '1',
    participants: ['234234', me, '4353455'],
    start: 200000,
    end: 200010,
    state: 1
};

SearchTestData.eventSet6EmptyC1 = {
    eventId: '6',
    courseId: '1',
    participants: [],
    start: 250000,
    end: 250010,
    state: 1
};

//Course 2

SearchTestData.courseSet2 = {
    id: '2',
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

SearchTestData.eventSet1EmptyC2 = {
    eventId: '7',
    courseId: '2',
    participants: [],
    start: 220001,
    end: 220011,
    state: 1
};

SearchTestData.eventSet2PlacesLeftC2 = {
    eventId: '8',
    courseId: '2',
    participants: [me, '3345345'],
    start: 210001,
    end: 210011,
    state: 1
};

SearchTestData.eventSet3FullC2 = {
    eventId: '9',
    courseId: '2',
    participants: [me, '3345345', '23423234', '234333'],
    start: 100001,
    end: 100011,
    state: 1
};

SearchTestData.eventSet4CanceledC2 = {
    eventId: '10',
    courseId: '2',
    participants: ['234234', me],
    start: 200001,
    end: 200011,
    state: 3
};

SearchTestData.eventSet5PlacesLeftC2 = {
    eventId: '11',
    courseId: '2',
    participants: ['234234', me, '4353455'],
    start: 200001,
    end: 200011,
    state: 1
};

SearchTestData.eventSet6EmptyC2 = {
    eventId: '12',
    courseId: '2',
    participants: [],
    start: 250001,
    end: 250011,
    state: 1
};

module.exports = SearchTestData;