var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var CourseModel = mongoose.model('Course');
var CourseTestData = require('./course-test-data.js');


var createCourse = function(course){
    CourseModel.create(course, function (err, courseItem) {
        if (err){
            throw err;
        }
    });
};

var clearTestDatabase = function(){
    CourseModel.remove({}, function(err){
        if(err) throw err;
    });
};

describe ('Course PUT', function (){
    before(function(done){
        createCourse(CourseTestData.mySpecificSet1);
        done();
    });

    after(function(done){
        clearTestDatabase();
        done();
    });



    it('should return that data is null or undefined',
        function(done){
            request(app)
                .put('/course')
                .type('json')
                .send()
                .expect(400)
                .end(function(err, res){
                    res.status.should.equal(400);
                    done();
                });
        });

    it('should return that course does not exist',
        function (done) {
            request(app)
                .put('/course')
                .type('json')
                .send({
                    _id: CourseTestData.mySet2._id
                })
                .expect(400)
                .end(function (err, res) {
                    res.status.should.equal(400);
                    res.text.should.equal('Not found');
                    done();

                });
        });



    it('should return that course was updated (case description)',
        function (done) {
            request(app)
                .put('/course')
                .type('json')
                .send({
                    _id: CourseTestData.mySpecificSet1._id.toString(),
                    description: 'some other description'
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {_id: CourseTestData.mySpecificSet1._id},
                        function(err, course){
                            course.description.should.equal('some other description', 'description was not updated');
                            done();
                        });

                });
        });


    it('should return that course was updated (case level)',
        function (done) {
            request(app)
                .put('/course')
                .type('json')
                .send({
                    _id: CourseTestData.mySpecificSet1._id.toString(),
                    level: 3
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {_id: CourseTestData.mySpecificSet1._id},
                        function(err, course){
                            course.level.should.equal(3, 'description was not updated');
                            done();
                        });

                });
        });

    it('should return that course was updated (case location)',
        function (done) {
            request(app)
                .put('/course')
                .type('json')
                .send({
                    _id: CourseTestData.mySpecificSet1._id.toString(),
                    location: [13,13]
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {_id: CourseTestData.mySpecificSet1._id},
                        function(err, course){
                            course.location[0].should.equal(13, 'longitude was not updated');
                            course.location[1].should.equal(13, 'latitude was not updated');
                            done();
                        });

                });
        });

    it('should return that course was updated (case groupSize)',
        function (done) {
            request(app)
                .put('/course')
                .type('json')
                .send({
                    _id: CourseTestData.mySpecificSet1._id.toString(),
                    groupSize: 6
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {_id: CourseTestData.mySpecificSet1._id},
                        function(err, course){
                            course.groupSize.should.equal(6, 'groupSize was not updated');
                            done();
                        });

                });
        });

    it('should return that course was updated (case category)',
        function (done) {
            request(app)
                .put('/course')
                .type('json')
                .send({
                    _id: CourseTestData.mySpecificSet1._id.toString(),
                    category: 'cuisine'
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {_id: CourseTestData.mySpecificSet1._id},
                        function(err, course){
                            course.category.should.equal('cuisine', 'category was not updated');
                            done();
                        });

                });
        });

    it('should return that course was updated (case tags)',
        function (done) {
            request(app)
                .put('/course')
                .type('json')
                .send({
                    _id: CourseTestData.mySpecificSet1._id.toString(),
                    tags: ['beach', 'volleyball']
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {_id: CourseTestData.mySpecificSet1._id},
                        function(err, course){
                            course.tags[0].should.equal('beach', 'tags was not updated');
                            course.tags[1].should.equal('volleyball', 'tags was not updated');

                            done();
                        });

                });
        });

    it('should return that course was updated (case price)',
        function (done) {
            request(app)
                .put('/course')
                .type('json')
                .send({
                    _id: CourseTestData.mySpecificSet1._id.toString(),
                    price: 25
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {_id: CourseTestData.mySpecificSet1._id},
                        function(err, course){
                            course.price.should.equal(25, 'price was not updated');

                            done();
                        });

                });
        });

    it('should return that course was updated (case price, description, tags & location)',
        function (done) {
            request(app)
                .put('/course')
                .type('json')
                .send({
                    _id: CourseTestData.mySpecificSet1._id.toString(),
                    price: 25,
                    tags: ['beach', 'volleyball'],
                    description: 'some other description',
                    location: [3,4]



                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {_id: CourseTestData.mySpecificSet1._id},
                        function(err, course){
                            course.price.should.equal(25, 'price was not updated');
                            course.description.should.equal('some other description', 'description was not updated');
                            course.tags[0].should.equal('beach', 'tags was not updated');
                            course.tags[1].should.equal('volleyball', 'tags was not updated');
                            course.location[0].should.equal(3, 'longitude was not updated');
                            course.location[1].should.equal(4, 'latitude was not updated');

                            done();
                        });

                });
        });


});