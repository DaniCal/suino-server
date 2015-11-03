
var UserTestData = function(){

};


UserTestData.incompleteUserData = [

    {
        fbId : '0909090',
        fbName: 'Daniel Lohse',
        deviceToken: '123123123',
        email: 'daniel.lohse@suinoapp.com',
        age: 25
    },
    {
        fbId : '0909090',
        fbName: 'Daniel Lohse',
        deviceToken: '123456',
        email: 'daniel.lohse@suinoapp.com',
        age: 25,
        city: 'Barcelona',
        platform: 'Android'

    },
    {
        fbId : '0909090',
        platform: 'android',
        fbPictureLink:'facebook.com/somepicturelink',
        deviceToken: '123456',
        email: 'daniel.lohse@suinoapp.com'

    },
    {
        fbName: 'Daniel Lohse',
        platform: 'android',
        deviceToken: '123456',
        email: 'daniel.lohse@suinoapp.com'

    }
];


UserTestData.testUserNotInDb = {
    fbId : '654321',
    fbName: 'Daniel Lohse',
    fbPictureLink:'facebook.com/somepicturelink',
    platform: 'android',
    deviceToken: '123456',
    age: 25,
    gender: 'male',
    city: 'Barcelona',
    email: 'daniel.lohse@suinoapp.com'
};

UserTestData.testUserInDb = {
    fbId : '123456',
    fbName: 'Daniel Lohse',
    fbPictureLink:'facebook.com/somepicturelink',
    platform: 'apple',
    deviceToken: '123455',
    age:25,
    city: 'Barcelona',
    email: 'daniel.lohse@suinoapp.com'
};


UserTestData.userInDb = {
    uuid: '1111222233334444',
    fbName: 'Dani Lo',
    fbPictureLink:'facebook.com/somepicturelink',
    fbId: '123456',
    age: 25,
    city: 'Barcelona',
    gender: 'male',
    email: 'daniel.lohse@suinoapp.com',
    date: 123456,
    device: [{token:'123456', platform: 'android'}]
};

UserTestData.testUserInDbSameDevice = {
    fbId : '123456',
    fbName: 'Daniel Lohse',
    platform: 'android',
    deviceToken: '123456'
};

UserTestData.testUserInDbNewDevice = {
    fbId : '123456',
    fbName: 'Daniel Lohse',
    platform: 'apple',
    deviceToken: '123455'
};

module.exports = UserTestData;