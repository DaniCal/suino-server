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

describe ('Users POST', function (){

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
                .post('/register')
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
                    .post('/register')
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

    it('should return that user was created',
        function(done){
            request(app)
                .post('/register')
                .type('json')
                .send(UserTestData.testUserNotInDb)
                .expect(201)
                .end(function(err, res){
                    res.status.should.equal(201);
                    UserModel.findOne({fbId: UserTestData.testUserNotInDb.fbId}, function(err, user){

                        should.not.exist(err)
                        should.exist(user);
                        user.should.be.an.instanceOf(UserModel);

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

    it('should return that user is already in database',
        function(done){
            request(app)
                .post('/register')
                .type('json')
                .send(UserTestData.testUserInDb)
                .expect(409)
                .end(function(err, res){
                    res.status.should.equal(409);
                    UserModel.find({fbId: UserTestData.testUserNotInDb.fbId}, function(err, users){
                        should.not.exist(err)
                        should.exist(users);
                        users.length.should.be.equal(1);
                        done();

                    });

                });
        });
});




