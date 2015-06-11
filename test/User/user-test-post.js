var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
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


describe ('Users POST', function (){

    var testUserNotInDb = {
        fbId : '654321',
        fbName: 'Daniel Lohse',
        platform: 'android',
        deviceToken: '123456'
    };

    var testUserInDb = {
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

    it('should return that user was created',
        function(done){
            request(app)
                .post('/register')
                .type('json')
                .send(testUserNotInDb)
                .expect(201)
                .end(function(err, res){
                    res.status.should.equal(201);
                    UserModel.findOne({fbId: testUserNotInDb.fbId}, function(err, user){
                        should.not.exist(err)
                        should.exist(user);
                        user.should.be.an.instanceOf(UserModel);

                        should.exist(user.uuid);
                        should.exist(user.fbId);
                        should.exist(user.fbName);
                        should.exist(user.email);
                        should.exist(user.date);
                        should.exist(user.device);
                        should.exist(user.device[0]);
                        should.exist(user.device[0].token);
                        should.exist(user.device[0].platform);
                        done();

                    });

                });
        });
});




