var should = require('should');
var request = require('supertest');
var app = require('./helpers/app.js');
var mongoose = require("mongoose");
var UserModel = mongoose.model('User');

var createUser = function(user){
    UserModel.create(user, function (err, user) {
        if (err){
            throw 'Test user was not created';
        }
    });
};

var clearTestDatabase = function(){
    UserModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });
};


describe ('Users', function (){

    var incompleteUserData = [

        {
            fbId : '123456',
            fbName: 'Daniel Lohse',
            platform: 'android'
        },
        {
            fbId : '123456',
            fbName: 'Daniel Lohse',
            deviceToken: '123456'
        },
        {
            fbId : '123456',
            platform: 'android',
            deviceToken: '123456'
        },
        {
            fbName: 'Daniel Lohse',
            platform: 'android',
            deviceToken: '123456'
        }
    ];

    var userNotInDb = {
        fbId : '654321',
        fbName: 'Daniel Lohse',
        platform: 'android',
        deviceToken: '123456'
    };

    var userInDbSameDevice = {
        fbId : '123456',
        fbName: 'Daniel Lohse',
        platform: 'android',
        deviceToken: '123456'
    };

    var userInDbNewDevice = {
        fbId : '123456',
        fbName: 'Daniel Lohse',
        platform: 'apple',
        deviceToken: '123455'
    };


    var userInDb = {
        uuid: '1111222233334444',
        fbName: 'Dani Lo',
        fbId: '123456',
        email: 'daniel.lohse@suinoapp.com',
        date: 123456,
        device: [{token:'123456', platform: 'android'}]
    };

    before(function(done){
        createUser(userInDb);
        done();
    });

    after(function(done){
        clearTestDatabase();
        done();
    });

    it('should return that received data is undefined',
        function(done){
            request(app)
                .get('/login')
                .type('json')
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    res.text.should.equal('Received data is incomplete or undefined');
                    done();
                });
        });

    for(var i = 0; i < incompleteUserData.length ; i++){
        it('should return that received data is incomplete case ' + i,
            function(done){
                request(app)
                    .get('/login')
                    .type('json')
                    .send(incompleteUserData[i])
                    .expect(400)
                    .end(function(err, res){
                        res.status.should.equal(400);
                        res.text.should.equal('Received data is incomplete or undefined');
                        done();
                    })
            });
    }

    it('should return that received data was processed but user not found',
        function(done){

            request(app)
                .get('/login')
                .type('json')
                .send(userNotInDb)
                .expect(204)
                .end(function(err, res){
                    res.status.should.equal(204);
                    done();
                });
        });


    it('should return that received data was processed and user was found, no device update',
        function(done){

            var previousLength;
            UserModel.findOne({fbId: userInDbSameDevice.fbId},function(err, user) {
                previousLength = user.device.length;
            });

            request(app)
                .get('/login')
                .type('json')
                .send(userInDbSameDevice)
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    UserModel.findOne({fbId: userInDbSameDevice.fbId},function(err, user) {
                        should.not.exist(err)
                        user.should.be.an.instanceOf(UserModel);
                        var length = user.device.length;
                        length.should.be.equal(previousLength);
                        done();
                    });

                });
        });

    it('should return that received data was processed, user was found and device was updated',
        function(done){

            request(app)
                .get('/login')
                .type('json')
                .send(userInDbNewDevice)
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    UserModel.findOne({fbId: userInDbNewDevice.fbId},function(err, user) {
                        should.not.exist(err)
                        should.exist(user);
                        should.exist(user.device);
                        user.should.be.an.instanceOf(UserModel);
                        var length = user.device.length;
                        length.should.be.equal(2);
                        var newDevice = user.device[length - 1];
                        should.exist(newDevice);
                        var newDeviceToken = newDevice.token;
                        var newDevicePlatform = newDevice.platform;
                        should.exist(newDevicePlatform);
                        should.exist(newDeviceToken);
                        var deviceToken = userInDbNewDevice.deviceToken;
                        newDeviceToken.should.equal(deviceToken);
                        done();
                    });
                });
        });
});




