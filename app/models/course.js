var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../controllers/user.js');


var CourseSchema = new Schema({
        id: {type: String},
        date : {type: Number},
        description: {type: String},
        teacherFbId: { type: Schema.Types.ObjectId, ref: 'User' },
        level: {type: Number},
        location: {
                type: [Number],
                index: '2d'
        },
        category: {type: String},
        tags: {type: [String]},
        price: {type: Number},
        groupSize: {type: Number},
        events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
    }
);

var CourseModel = mongoose.model('Course', CourseSchema);

var Course = function(){
};

Course.createCourse = function(data, callback){
    if(!isCourseDataValid(data)){
        callback('data not valid', 400);
        return;
    }

    User.loadById({_id: data.teacherFbId}, function(err, user){
        if(err){
            callback(400);
        }else{
            var newCourse = new CourseModel({
                //id: uuid.v4(),
                date: getDate(),
                description: data.description,
                teacherFbId: user._id,
                level: data.level,
                location: data.location,
                category: data.category,
                tags: data.tags,
                price: data.price,
                groupSize: data.groupSize
            });

            newCourse.save(function(err){
                if(err){
                    callback('internal error', 500)
                }else{
                    callback('course created', 201);
                }
            });
        }
    });
};

Course.load = function(data, callback){
    CourseModel.findById(data._id, function(err, course){
        if(err){
            callback(err, 500, false);
        }else if(!course){
            callback('Not found', 204, false);
        }else{
            callback(false, 200, course)
        }
    });
};

Course.update = function(data, callback){
    if(data == null || data == undefined || data._id == undefined){
        callback('data incomplete', 400);
        return;
    }
    CourseModel.findOne({_id: data._id}, function(err, course){
        if(err || !course){
            callback('Not found', 404);
        }else{
            if(data.description != undefined){
                course.description = data.description;
            }
            if(isLevelValid(data)){
                course.level = data.level;
            }
            if(isLocationValid(data)){
                course.location = data.location;
            }

            if(isGroupSizeValid(data)){
                course.groupSize = data.groupSize;
            }

            if(data.category != undefined){
                course.category = data.category;
            }

            if(isTagsValid(data)){
                course.tags = data.tags;
            }

            if(isPriceValid(data)){
                course.price = data.price;
            }

            course.save(function(err){
                if(err){
                    callback('Internal Error', 500);
                }else{
                    callback('Course updated', 200);
                }
            });

        }

    });
};

var isLevelValid = function(data){
    if(data.level == undefined){
        return false;
    }else if(isNaN(data.level)){
        return false;
    }else if(data.level < 0 || data.level > 3){
        return false;
    }else{
        return true;
    }
};

var isLocationValid = function(data){
  if(data.location == undefined){
      return false;
  }else if(!(data.location instanceof Array)){
      return false;
  }else if(isNaN(data.location[0]) || isNaN(data.location[1])){
      return false;
  }else{
        return true;
    }

};

var isGroupSizeValid = function(data){
    if(data.groupSize == undefined){
        return false;
    }else if(isNaN(data.groupSize)){
        return false;
    }else{
        return true;
    }
};

var isTagsValid = function(data){
  if(data.tags == undefined){
      return false;
  }else if(!(data.tags instanceof Array)){
      return false;
  }else{
      return true;
  }
};

var isPriceValid = function(data){
  if(data.price == undefined){
      return false;
  }else if(isNaN(data.price)){
      return false;
  }else{
      return true;
  }
};

Course.search = function(data, callback){

    var query = buildCourseQuery(data);
    query.exec(callback);

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
    if(data.fbId != undefined){
        query.where('teacherFbId').equals(data.fbId);
    }

    return query;

};

Course.isCourseDataValid = function(data, callback){
    if(data == null || data == undefined){
        callback('data null or undefined');
    }else if(!isDataComplete(data)){
        callback('data is incomplete');
    }else if(!isDataTypeValid(data)){
        callback('data type is not valid');
    }else{
        callback();
    }
};

var isCourseDataValid = function(data, callback){
    if(data == null || data == undefined){
        return false;
    }else if(!isDataComplete(data)){
        return false;
    }else if(!isDataTypeValid(data)){
        return false;
    }else{
        return true;
    }
};

var isDataComplete = function(data){

    return !(
        data.description == undefined ||
        data.teacherFbId == undefined ||
        data.level == undefined ||
        data.location == undefined ||
        data.category == undefined ||
        data.tags == undefined ||
        data.tags == undefined ||
        data.price == undefined ||
        data.groupSize == undefined);
};

var isDataTypeValid = function(data){
    if(isNaN(data.price)){
        return false;
    }else if(isNaN(data.level) || isNaN(data.groupSize)){
        return false;
    }else if(!(data.location instanceof Array)){
        return false;
    }
    return true;

};

var getDate = function(){
    return Math.floor((new Date().getTime()/1000));
};

module.exports = Course;