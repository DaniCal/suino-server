var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var SearchTestData = function(){

};

var me = '123123';
var myFbId = mongoose.Types.ObjectId('4edd40c86762e0fb12100000').toString();
var participantId_1 = mongoose.Types.ObjectId('4edd40c86762e0fb12110001').toString();
var participantId_2 = mongoose.Types.ObjectId('4edd40c86762e0fb12110003').toString();

var myTags = ['yoga','meditation'];

//Course 1

SearchTestData.courseSet1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000101'),
    date: 12,
    description: 'some description',
    _teacher: myFbId,
    level: 1,
    location:  [20,20],
    groupSize: 4,
    category: 'sport',
    tags: ['yoga','meditation'],
    price: 5,
    events: [
    ]
};

SearchTestData.eventSet1EmptyC1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000001'),
    _course: SearchTestData.courseSet1._id,
    _participants: [],
    start: 220000,
    end: 220000,
    state: 1
};

SearchTestData.eventSet2PlacesLeftC1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000002'),
    _course: SearchTestData.courseSet1._id,
    _participants: [participantId_1, participantId_2],
    start: 210000,
    end: 210010,
    state: 1
};

SearchTestData.eventSet3FullC1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
    _course: SearchTestData.courseSet1._id,
    _participants: [participantId_1, participantId_2, participantId_1, participantId_2],
    start: 100000,
    end: 100010,
    state: 1
};

SearchTestData.eventSet4CanceledC1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000004'),
    _course: SearchTestData.courseSet1._id,
    _participants: [participantId_1, participantId_2],
    start: 200000,
    end: 200010,
    state: 3
};

SearchTestData.eventSet5PlacesLeftC1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000005'),
    _course: SearchTestData.courseSet1._id,
    _participants: [participantId_1, participantId_2. participantId_2],
    start: 200000,
    end: 200010,
    state: 1
};

SearchTestData.eventSet6EmptyC1 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000006'),
    _course: SearchTestData.courseSet1._id,
    _participants: [],
    start: 250000,
    end: 250010,
    state: 1
};

//Course 2

SearchTestData.courseSet2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000102'),
    date: 12,
    description: 'some description',
    _teacher: myFbId,
    level: 2,
    location:  [20,20],
    groupSize: 1,
    category: 'sport',
    tags: ['yoga','karate'],
    price: 5
};

SearchTestData.eventSet1EmptyC2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000007'),
    _course: SearchTestData.courseSet2._id,
    _participants: [],
    start: 220001,
    end: 220011,
    state: 1
};

SearchTestData.eventSet2PlacesLeftC2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000008'),
    _course: SearchTestData.courseSet2._id,
    _participants: [participantId_1, participantId_2],
    start: 210001,
    end: 210011,
    state: 1
};

SearchTestData.eventSet3FullC2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000009'),
    _course: SearchTestData.courseSet2._id,
    _participants: [participantId_1, participantId_2, participantId_1, participantId_2],
    start: 100001,
    end: 100011,
    state: 1
};

SearchTestData.eventSet4CanceledC2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000010'),
    _course: SearchTestData.courseSet2._id,
    _participants: [participantId_1, participantId_2],
    start: 200001,
    end: 200011,
    state: 3
};

SearchTestData.eventSet5PlacesLeftC2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000011'),
    _course: SearchTestData.courseSet2._id,
    _participants: [participantId_1, participantId_2, participantId_1],
    start: 200001,
    end: 200011,
    state: 1
};

SearchTestData.eventSet6EmptyC2 = {
    _id:  mongoose.Types.ObjectId('4edd40c86762e0fb12000012'),
    _course: SearchTestData.courseSet2._id,
    _participants: [],
    start: 250001,
    end: 250011,
    state: 1
};


SearchTestData.testUserInDb = {
    fbId : myFbId,
    fbName: 'Daniel Lohse',
    fbPictureLink:'facebook.com/somepicturelink',
    platform: 'apple',
    deviceToken: '123455',
    age:25,
    city: 'Barcelona',
    email: 'daniel.lohse@suinoapp.com'
};

module.exports = SearchTestData;