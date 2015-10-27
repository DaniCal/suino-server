var should = require('should');
var request = require('supertest');
var app = require('./../helpers/app.js');
var mongoose = require("mongoose");
var CourseModel = mongoose.model('Course');
var CourseTestData = require('./course-test-data.js');


var createCourse = function(course){
    CourseModel.create(course, function (err, course) {
        if (err){
            throw 'Test course was not created';
        }
    });
};

var clearTestDatabase = function(){
    CourseModel.remove({}, function(err){
        if(err) throw 'Database was not cleared';
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
                    courseId: '999999'
                })
                .expect(404)
                .end(function (err, res) {
                    res.status.should.equal(404);
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
                    courseId: CourseTestData.mySpecificSet1.id,
                    description: 'some other description'
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {id: CourseTestData.mySpecificSet1.id},
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
                    courseId: CourseTestData.mySpecificSet1.id,
                    level: 3
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {id: CourseTestData.mySpecificSet1.id},
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
                    courseId: CourseTestData.mySpecificSet1.id,
                    location: [13,13]
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {id: CourseTestData.mySpecificSet1.id},
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
                    courseId: CourseTestData.mySpecificSet1.id,
                    groupSize: 6
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {id: CourseTestData.mySpecificSet1.id},
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
                    courseId: CourseTestData.mySpecificSet1.id,
                    category: 'sports'
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {id: CourseTestData.mySpecificSet1.id},
                        function(err, course){
                            course.category.should.equal('sports', 'category was not updated');
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
                    courseId: CourseTestData.mySpecificSet1.id,
                    tags: ['beach', 'volleyball']
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {id: CourseTestData.mySpecificSet1.id},
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
                    courseId: CourseTestData.mySpecificSet1.id,
                    price: 25
                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {id: CourseTestData.mySpecificSet1.id},
                        function(err, course){
                            course.price.should.equal(25, 'price was not updated');

                            done();
                        });

                });
        });

    it('should return that course was updated (case price, description, tags & wrong location)',
        function (done) {
            request(app)
                .put('/course')
                .type('json')
                .send({
                    courseId: CourseTestData.mySpecificSet1.id,
                    price: 25,
                    tags: ['beach', 'volleyball'],
                    description: 'some other description',
                    location: {
                        longitude: 4,
                        latitude: 3
                    }


                })
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.equal('Course updated');

                    CourseModel.findOne(
                        {id: CourseTestData.mySpecificSet1.id},
                        function(err, course){
                            course.price.should.equal(25, 'price was not updated');
                            course.description.should.equal('some other description', 'description was not updated');
                            course.tags[0].should.equal('beach', 'tags was not updated');
                            course.tags[1].should.equal('volleyball', 'tags was not updated');
                            course.location[0].should.equal(13, 'longitude was not updated');
                            course.location[1].should.equal(13, 'latitude was not updated');

                            done();
                        });

                });
        });


});