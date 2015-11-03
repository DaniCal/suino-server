var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var CourseModel = mongoose.model('Course');
var EventModel = mongoose.model('Event');
var APITestData = require('./api-test-data.js');
var UserModel = mongoose.model('User');


var createUser = function(user){
    UserModel.create(user, function (err, user) {
        if (err){
            throw 'Test user was not created';
        }
    });
};


var createCourse = function(course){
    CourseModel.create(course, function (err, course) {
        if (err){
            throw err;
        }
    });
};


var createEvent = function(event){
    EventModel.create(event, function (err, event) {
        if (err){
            throw 'Test course was not created';
        }
    });
};


var clearTestDatabase = function(){
    CourseModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });

    EventModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });
    UserModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });
};


describe ('SEARCH', function () {
    before(function(done){

        done();
    });

    after(function(done){
        clearTestDatabase();
        done();
    });


    it('should return the related information of the users classes',
        function(done){
            request(app)
                .get('/myclasses')
                .type('json')
                .query({
                    fbId: '123123'
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    done();
                });
        });

});