var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var UserModel = mongoose.model('User');
var UserTestData = require('./user-test-data.js');
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


describe ('Users POST LOGIN', function (){

    before(function(done){
        createUser(UserTestData.userInDb);
        done();
    });

    after(function(done){
        clearTestDatabase();
        done();
    });

    it('should return that received data is undefined',
        function(done){
            request(app)
                .post('/login')
                .type('json')
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    res.text.should.equal('data not valid');
                    done();
                });

        });

    for(var i = 0; i < UserTestData.incompleteUserData.length ; i++){
        it('should return that received data is incomplete case ' + i,
            function(done){
                request(app)
                    .post('/login')
                    .type('json')
                    .send(UserTestData.incompleteUserData[i])
                    .expect(400)
                    .end(function(err, res){
                        res.status.should.equal(400);
                        res.text.should.equal('data not valid');
                        done();
                    })
            });
    }

    it('should return that received data was processed but user not found',
        function(done){

            request(app)
                .post('/login')
                .send(UserTestData.testUserNotInDb)
                .expect(204)
                .end(function(err, res){
                    res.status.should.equal(204);
                    done();
                });
        });


    it('should return that received data was processed and user was found, no device update',
        function(done){

            var previousLength;
            UserModel.findOne({fbId: UserTestData.testUserInDbSameDevice.fbId},function(err, user) {
                previousLength = user.device.length;
            });

            request(app)
                .post('/login')
                .type('json')
                .send(UserTestData.testUserInDbSameDevice)
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    UserModel.findOne({fbId: UserTestData.testUserInDbSameDevice.fbId},function(err, user) {
                        should.not.exist(err);
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
                .post('/login')
                .type('json')
                .send(UserTestData.testUserInDbNewDevice)
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    UserModel.findOne({fbId: UserTestData.testUserInDbNewDevice.fbId},function(err, user) {
                        should.not.exist(err);
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
                        var deviceToken = UserTestData.testUserInDbNewDevice.deviceToken;
                        newDeviceToken.should.equal(deviceToken);
                        done();
                    });
                });
        });
});




