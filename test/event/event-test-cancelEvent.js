var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var EventModel = mongoose.model('Event');
var EventTestData = require('./event-test-data.js');



var createEvent = function(event){
    EventModel.create(event, function (err, event) {
        if (err){
            throw err;
        }
    });
};

var clearTestDatabase = function(){
    EventModel.remove({}, function(err){
        if(err) throw err;
    });
};


describe ('Event CANCEL COURSE', function () {

    before(function (done) {
        createEvent(EventTestData.set1Empty);
        createEvent(EventTestData.set2PlacesLeft);
        createEvent(EventTestData.set3Full);
        createEvent(EventTestData.set4Canceled);
        done();
    });

    after(function (done) {
        clearTestDatabase();
        done();
    });


    it('should return that event was canceled (empty)',
        function (done) {
            request(app)
                .put('/event/cancel')
                .type('json')
                .send({
                    _id: EventTestData.set1Empty._id
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    EventModel.findOne(
                        {_id: EventTestData.set1Empty._id},
                        function(err, event){
                            event.state.should.equal(3, 'state not changed to canceled');
                            res.text.should.equal('event canceled');
                            done();
                        });

                });
        });

    it('should return that event can not be canceled',
        function (done) {
            request(app)
                .put('/event/cancel')
                .type('json')
                .send({
                    _id: EventTestData.set2PlacesLeft._id
                })
                .expect(400)
                .end(function (err, res) {
                    res.status.should.equal(400);
                    EventModel.findOne(
                        {_id: EventTestData.set2PlacesLeft._id},
                        function(err, event){
                            event.state.should.equal(1, 'state should not change to canceled');
                            res.text.should.equal('event can not be canceled');
                            done();
                        });
                });
        });

    it('should return that event was not found',
        function (done) {
            request(app)
                .put('/event/cancel')
                .type('json')
                .send({
                    _id: EventTestData.set5Canceled
                })
                .expect(404)
                .end(function (err, res) {
                    res.status.should.equal(404);
                    res.text.should.equal('Not found');
                    done();
                });
        });

});