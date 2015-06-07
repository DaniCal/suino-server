var should = require('should');
var request = require('supertest');
var app = require('./helpers/app.js');

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
        fbId : '123456',
        fbName: 'Daniel Lohse',
        platform: 'android',
        deviceToken: '123456'
    }

    it('should return that received data is undefined',
        function(done){
            request(app)
                .get('/login')
                .type('json')
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    res.text.should.equal('Received data undefined or incomplete');
                    done();
                })
        });

    it('should return that received data was processed',
        function(done){

            request(app)
                .get('/login')
                .type('json')
                .send(completeUserData)
                .expect(200)
                .end(function(err, res){
                    res.status.should.equal(200);
//                    res.text.should.equal('Received data undefined or incomplete');
                    done();
                })
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
                        res.text.should.equal('Received data undefined or incomplete');
                        done();
                    })
            });

    }
});




