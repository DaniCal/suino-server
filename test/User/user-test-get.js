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


describe ('Users GET', function () {

    before(function (done) {
        createUser(UserTestData.userInDb);
        done();
    });

    after(function (done) {
        clearTestDatabase();
        done();
    });

    it('should return user data',
        function(done){
            request(app)
                .get('/user')
                .type('json')
                .query({fbId: UserTestData.userInDb.fbId})
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    var user = res.body;
                    should.exist(user.fbId);
                    should.exist(user.fbName);
                    should.exist(user.age);
                    should.exist(user.age);
                    should.exist(user.gender);
                    done();
                });

        });

    it('should return user not found',
        function(done){
            request(app)
                .get('/user')
                .type('json')
                .query({fbId: UserTestData.testUserNotInDb.fbId})
                .expect(204)
                .end(function(err, res){
                    res.status.should.equal(204);
                    var user = res.body;
                    should.not.exist(user.fbId);

                    done();
                });

        });

    it('should return data not valid (case data = null)',
        function(done){
            request(app)
                .get('/user')
                .type('json')
                .query()
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    var user = res.body;
                    should.not.exist(user.fbId);
                    done();
                });
        });

    it('should return data not valid (case data.fbId = undefined)',
        function(done){
            request(app)
                .get('/user')
                .type('json')
                .query({fbName: 'Dani Lo'})
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    var user = res.body;
                    should.not.exist(user.fbId);
                    done();
                });
        });
});