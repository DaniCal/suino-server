var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../controllers/user.js');
var _ = require('underscore');

var val = {
    categories : [
        'sport',
        'language',
        'music',
        'cuisine'
    ],
    minLevel : 1,
    maxLevel : 3,
    maxPrice : 50,
    minPrice : 0,
    minGroupSize : 1

};

var CourseSchema = new Schema({
        date : {type: Number},
        description: {type: String, required: true},
        _teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true},
        level: {type: Number, required: true, min: val.minLevel, max: val.maxLevel},
        location: {
                type: [Number],
                index: '2d',
                required: true
        },
        category: {type: String, required: true, enum: val.categories},
        tags: {type: [String], required: true},
        price: {type: Number, required: true, min: val.minPrice, max: val.maxPrice},
        groupSize: {type: Number, required: true, min: val.minGroupSize},
        events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
    }
);



var CourseModel = mongoose.model('Course', CourseSchema);

var Course = function(){
};

Course.createCourse = function(data, callback){
    User.loadById({_id: data.teacherId}, function(err, user){
        if(err){
            callback(400);
        }else{
            var newCourse = new CourseModel({
                date: _.now(),
                description: data.description,
                _teacher: user._id,
                level: data.level,
                location: data.location,
                category: data.category,
                tags: data.tags,
                price: data.price,
                groupSize: data.groupSize
            });

            newCourse.save(function(err){
                if(err){
                    callback(err, 400)
                }else{
                    callback('course created', 201);
                }
            });
        }
    });
};

Course.loadById = function(data, callback){
    if(data == null || data == undefined || data._id == undefined){
        callback('data not valid', 400);
        return;
    }
    CourseModel
        .findById(data._id)
        .populate('_teacher')
        .exec(function(err, course){
            if(err){
                callback('server error', 500);
            }else if(!course){
                callback('course not found', 204);
            }else{
                callback(false, 200, course);
            }
        });
};

Course.update = function(data, callback){
    if(data == null || data._id == undefined){
        callback('data not valid', 400);
        return;
    }
    CourseModel.findOne({_id: data._id}, function(err, course){
        if(err){
            callback(err, 400);
        }else if(!course) {
            callback('Not found', 400);
        }
        else{
            if(data.description != undefined){
                course.description = data.description;
            }

            if(data.level != undefined){
                course.level = data.level;
            }
            if(data.location != undefined){
                course.location = data.location;
            }

            if(data.groupSize != undefined){
                course.groupSize = data.groupSize;
            }

            if(data.category != undefined){
                course.category = data.category;
            }

            if(data.tags != undefined){
                course.tags = data.tags;
            }

            if(data.price != undefined){
                course.price = data.price;
            }

            if(course.validateSync() == undefined){
                course.save(function(err){
                    if(err){
                        callback(err, 400);
                    }else{
                        callback('Course updated', 200);
                    }
                });
            }else{
                callback('data not valid', 400);
            }
        }

    });
};

Course.search = function(data, callback){
    var query = buildCourseQuery(data);
    query.exec(callback);
};

Course.addEvent = function(data, callback){
    CourseModel.findById(data._course, function(err, course){
        if(err){
            callback(err, 400);
        }else if(!course) {
            callback('Not found', 400);
        }else{

            course.events.push(data._id);
            course.save(function(err){
                if(err){
                    callback(err, 400);
                }else{
                    callback('Course updated', 200);
                }
            });
        }
    })
};

Course.removeEvent = function(data, callback){

};


var buildCourseQuery = function(data){

    if(data.maxDistance != undefined){
        var maxDistance = data.maxDistance | 100;
        maxDistance /= 6371;
        //TODO add to query
    }

    var query;
    //PROXIMITY
    if(data.longitude != undefined && data.latitude != undefined){
        var coordinates = [];
        coordinates[0] = data.longitude;
        coordinates[1] = data.latitude;

        query = CourseModel.find({location: {
            $near: coordinates
        }});
    }else{
        query = CourseModel.find();
    }


    //KEYWORDS
    if(data.keywords != undefined){
        var keywords = [];
        if(!(data.keywords instanceof Array)){
            keywords[0] = data.keywords;
        }else{
            keywords = data.keywords;
        }
        query.where('tags').in(keywords);
    }

    //LEVEL
    if(data.level != undefined){
        if(data.level instanceof Array){
            query.where('level').in(data.level);
        }else{
            query.where('level').equals(data.level);
        }

    }

    //CATEGORY
    if(data.category != undefined){
        query.where('category').equals(data.category);
    }

    //SIZE
    if(data.groupSize != undefined){
        if(data.groupSize == 1){
            query.where('groupSize').equals(data.groupSize);
        }else{
            query.where('groupSize').ne(1);
        }
    }

    //TeacherFbId
    if(data.teacherId != undefined){
        query.where('_teacher').equals(data.teacherId);
    }

    return query;

};


module.exports = Course;