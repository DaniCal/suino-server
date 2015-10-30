


var CourseTestData = function(){

};


var myFbId = '234234';
var notMyParticipantId = '567567567';
var specificCourseId = '123123';
var specificEventId = '567567';
var myTags = ['yoga','meditation'];

CourseTestData.mySpecificSet1 = {
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
    tags: myTags,
    price: 5
};

CourseTestData.mySet2 = {
    id: '2',
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    teacherFirstName: 'Dani',
    teacherFbPictureLink: 'somelink.com/link',
    level: 1,
    location:  [23,23],
    groupSize: 1,
    category: 'fitness',
    tags: myTags,
    price: 5
};

CourseTestData.mySet3 = {
    id: '3',
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    teacherFirstName: 'Dani',
    teacherFbPictureLink: 'somelink.com/link',
    level: 2,
    location:  [22,22],
    groupSize: 2,
    category: 'fitness',
    tags: myTags,
    price: 5
};

CourseTestData.mySet4 = {
    id: '4',
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    teacherFirstName: 'Dani',
    teacherFbPictureLink: 'somelink.com/link',
    level: 1,
    location:  [30,30],
    groupSize: 6,
    category: 'fitness',
    tags: myTags,
    price: 5
};


CourseTestData.notMySet1 = {
    id: '11',
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    teacherFirstName: 'Dani',
    teacherFbPictureLink: 'somelink.com/link',
    level: 3,
    location:  [25,25],
    groupSize: 4,
    category: 'fitness',
    tags: ['futbol'],
    price: 5
};

CourseTestData.notMySet2 = {
    id: '5',
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    teacherFirstName: 'Dani',
    teacherFbPictureLink: 'somelink.com/link',
    level: 2,
    location:  [25,25],
    groupSize: 4,
    category: 'fitness',
    tags: ['tennis'],
    price: 5
};


CourseTestData.setIncomplete = {
    id: '5',
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    teacherFirstName: 'Dani',
    teacherFbPictureLink: 'somelink.com/link',
    level: 3,
    location:  [25,25],
    groupSize: 4,
    tags: ['tennis'],
    price: 5
};

CourseTestData.setInvalidDataType1 = {
    id: '5',
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    teacherFirstName: 'Dani',
    teacherFbPictureLink: 'somelink.com/link',
    level: 1,
    location:  [25,25],
    groupSize: 4,
    category: 'fitness',
    tags: ['tennis'],
    price: '4s'
};

CourseTestData.setInvalidDataType2 = {
    id: '5',
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    teacherFirstName: 'Dani',
    teacherFbPictureLink: 'somelink.com/link',
    level: 2,
    location:  25,
    groupSize: 4,
    category: 'fitness',
    tags: ['tennis'],
    price: 5
};





module.exports = CourseTestData;