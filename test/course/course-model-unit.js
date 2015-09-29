var Course = require('../../app/models/course.js');
var should = require('should');

describe ('Course Unit', function () {

    var courseInDb = {
        title: 'some title',
        description: 'some description',
        teacherFbId: '123123123123',
        teacherFirstName: 'Dani',
        teacherFbPictureLink: 'somelink.com/link',
        level: 1,
        location: {longitude: 20, latitude: 20},
        category: 'fitness',
        tags: ['yoga'],
        material: ['matt', 'drink'],
        price: 5,
        groupSize: 3,
        availability: {
            days: [
                {
                    dayOfTheWeek: 2,
                    start: 3,
                    end: 4
                }
            ],
            dates: [
                {
                    date: 2134,
                    start: 123,
                    end: 123
                }
            ]
        }
    };

    it("should return that data 'availability' is valid (full data)",
        function(done){
            Course.isCourseDataValid(courseInDb, function(err){
                if(err == undefined){
                    done();
                }
                throw err;
            });
        });

    it("should return that data 'availability' is valid (dates undefined)",
        function(done){
            var tmp = courseInDb.availability.dates;
            courseInDb.availability.dates = undefined;
            Course.isCourseDataValid(courseInDb, function(err){
                if(err == undefined){
                    courseInDb.availability.dates = tmp;
                    done();
                }
                throw err;
            });
        });

    it("should return that data 'availability' is valid (days undefined)",
        function(done){
            var tmp = courseInDb.availability.days;
            courseInDb.availability.days = undefined;
            Course.isCourseDataValid(courseInDb, function(err){
                if(err == undefined){
                    courseInDb.availability.days = tmp;
                    done();
                }
                throw err;
            });
        });

    it("should return that data 'availability' is not valid (date start NaN)",
        function(done){
            var tmp = courseInDb.availability.days;
            courseInDb.availability.days[0].start = '2x';
            Course.isCourseDataValid(courseInDb, function(err){
                if(err == undefined){
                    throw 'Error message expected';
                }
                err.should.be.equal("data 'availability' is not valid", 'wrong error message');
                courseInDb.availability.days = tmp;
                done();
            });
        });

    it("should return that data 'availability' is not valid (dates & days undefined)",
        function(done){
            tmp = courseInDb.availability;
            courseInDb.availability.dates = undefined;
            courseInDb.availability.days = undefined;
            Course.isCourseDataValid(courseInDb, function(err){
                if(err == undefined){
                    throw 'Error message expected';
                }
                err.should.be.equal("data 'availability' is not valid", 'wrong error message');
                courseInDb.availability = tmp;
                done();
            });
        });
});