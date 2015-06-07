var should = require('should');
var request = require('supertest');
var app = require('./helpers/app.js');

describe ('Users', function (){

    it('should return that received data is undefined',
        function(done){

            request(app)
                .post('/login')
                .type('json')
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    res.text.should.equal('Received data undefined or incomplete');
                    done();
                })
        })
});