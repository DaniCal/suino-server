


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
    price: 5,
    availability: {
        days: [
            {
                dayOfTheWeek: 3,
                start: 123123,
                end: 123123
            }
        ]
    }
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
    groupSize: 4,
    category: 'fitness',
    tags: myTags,
    price: 5,
    availability: {
        days: [
            {
                dayOfTheWeek: 3,
                start: 123123,
                end: 123123
            }
        ]
    }
};

CourseTestData.mySet3 = {
    id: '3',
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    teacherFirstName: 'Dani',
    teacherFbPictureLink: 'somelink.com/link',
    level: 1,
    location:  [22,22],
    groupSize: 4,
    category: 'fitness',
    tags: myTags,
    price: 5,
    availability: {
        days: [
            {
                dayOfTheWeek: 3,
                start: 123123,
                end: 123123
            }
        ]
    }
};


CourseTestData.notMySet1 = {
    id: '4',
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    teacherFirstName: 'Dani',
    teacherFbPictureLink: 'somelink.com/link',
    level: 1,
    location:  [25,25],
    groupSize: 4,
    category: 'fitness',
    tags: ['futbol'],
    price: 5,
    availability: {
        days: [
            {
                dayOfTheWeek: 3,
                start: 123123,
                end: 123123
            }
        ]
    }
};

CourseTestData.notMySet2 = {
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
    price: 5,
    availability: {
        days: [
            {
                dayOfTheWeek: 3,
                start: 123123,
                end: 123123
            }
        ]
    }
};


CourseTestData.setIncomplete = {
    id: '5',
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    teacherFirstName: 'Dani',
    teacherFbPictureLink: 'somelink.com/link',
    level: 1,
    location:  [25,25],
    groupSize: 4,
    tags: ['tennis'],
    price: 5,
    availability: {
        days: [
            {
                dayOfTheWeek: 3,
                start: 123123,
                end: 123123
            }
        ]
    }
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
    price: '4s',
    availability: {
        days: [
            {
                dayOfTheWeek: 3,
                start: 123123,
                end: 123123
            }
        ]
    }
};

CourseTestData.setInvalidDataType2 = {
    id: '5',
    date: 12,
    description: 'some description',
    teacherFbId: myFbId,
    teacherFirstName: 'Dani',
    teacherFbPictureLink: 'somelink.com/link',
    level: 1,
    location:  25,
    groupSize: 4,
    category: 'fitness',
    tags: ['tennis'],
    price: 5,
    availability: {
        days: [
            {
                dayOfTheWeek: 3,
                start: 123123,
                end: 123123
            }
        ]
    }
};





module.exports = CourseTestData;