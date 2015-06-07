var should = require('should');
var request = require('supertest');
var app = require('./helpers/app.js');
var mongoose = require("mongoose");
var User = mongoose.model('User');

var createTestUser = function(user){
    User.create(user, function (err, user) {
        if (err){
            throw 'Test user was not created';
        }
    });
}

var clearTestDatabase = function(){
    User.remove({}, function(err){
        if(err) throw 'Database was not cleared';
    });


}


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

    var completeUserData = {
        fbId : '654321',
        fbName: 'Daniel Lohse',
        platform: 'android',
        deviceToken: '123456'
    }

    var completeUserData2 = {
        fbId : '123456',
        fbName: 'Daniel Lohse',
        platform: 'android',
        deviceToken: '123456'
    }

    var completeUserData3 = {
        fbId : '123456',
        fbName: 'Daniel Lohse',
        platform: 'apple',
        deviceToken: '123455'
    }


    var testUser = {
        uuid: '1111222233334444',
        fbName: 'Dani Lo',
        fbId: '123456',
        email: 'daniel.lohse@suinoapp.com',
        date: 123456,
        device: [{token:'123456', platform: 'android'}]
    };




    before(function(done){
        createTestUser(testUser);
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
                    res.text.should.equal('Received data is undefined or incomplete');
                    done();
                });
        });


    it('should return that received data was processed but user not found',
        function(done){

            request(app)
                .get('/login')
                .type('json')
                .send(completeUserData)
                .expect(204)
                .end(function(err, res){
                    res.status.should.equal(204);
                    done();
                });
        });


    it('should return that received data was processed and user was found',
        function(done){

            request(app)
                .get('/login')
                .type('json')
                .send(completeUserData2)
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
                    done();
                });
        });

    it('should return that received data was processed, user was found and device was updated',
        function(done){
            request(app)
                .get('/login')
                .type('json')
                .send(completeUserData3)
                .expect(200)
                .end(function(err, res){

                    res.status.should.equal(200);

                    User.findOne({fbId: completeUserData3.fbId},function(err, user) {
                        should.not.exist(err)
                        user.should.be.an.instanceOf(User);
                        var newDevice = user.device[user.device.length - 1].token;
                        newDevice.should.equal(completeUserData3.deviceToken);
                        done();
                    });
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
                        res.text.should.equal('Received data is undefined or incomplete');
                        done();
                    })
            });

    }
});




