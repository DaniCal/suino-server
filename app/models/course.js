var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');


var CourseSchema = new Schema({
        id: {type: String},
        date : {type: Number},
        description: {type: String},
        teacherFbId: {type: String},
        teacherFirstName: {type: String},
        teacherFbPictureLink: {type:String},
        level: {type: Number},
        location: {
                type: [Number],
                index: '2d'
        },
        category: {type: String},
        tags: {type: [String]},
        price: {type: Number},
        groupSize: {type: Number},
        availability: {
            days: [{
                dayOfTheWeek: {type: Number},
                start: {type: Number},
                end: {type: Number}
            }],
            dates: [{
                start: {type: Number},
                end: {type: Number},
                participants: [
                    {type: String}
                ]
            }]
        }
    }
);

var CourseModel = mongoose.model('Course', CourseSchema);

var Course = function(data){
    if(data.id != undefined){
        this._id = data.id;
        return;
    }

    this._description = data.description;
    this._teacherFbId = data.teacherFbId;
    this._teacherFirstName = data.teacherFirstName;
    this._teacherFbPictureLink = data.teacherFbPictureLink;
    this._level = data.level;
    this._location = data.location;
    this._category = data.category;
    this._tags = data.tags;
    this._price = data.price;
    this._groupSize = data.groupSize;
    this._availability = data.availability;
};

Course.prototype.createCourse = function(callback){
    var newCourse = new CourseModel({
        id: uuid.v4(),
        date: getDate(),
        description: this._description,
        teacherFbId: this._teacherFbId,
        teacherFirstName: this._teacherFirstName,
        teacherFbPictureLink: this._teacherFbPictureLink,
        level: this._level,
        location: this._location,
        category: this._category,
        tags: this._tags,
        price: this._price,
        groupSize: this._groupSize,
        availability: this._availability
    });

    newCourse.save(function(err){
        if(err){
            console.log(err);
        }
    });
    callback();
};


Course.prototype.load = function(callback){
    CourseModel.findOne({id: this._id}, function(err, course){
        if(err || course == undefined){
            callback(err, false);
            return;
        }
        callback(err, course)
    });
};

Course.prototype.update = function(id, data, callback){

};

Course.prototype.addParticipant = function(){

};

Course.prototype.addCourseDay = function(){

};

Course.prototype.addCourseDate = function(){

};

Course.search = function(data, callback){

    var maxDistance = data.maxDistance;

    maxDistance /= 6371;


    var keywords = [];

    if(!(data.keywords instanceof Array)){
        keywords[0] = data.keywords;
    }else{
        keywords = data.keywords;
    }

    var coordinates = [];
    coordinates[0] = data.longitude;
    coordinates[1] = data.latitude;

    CourseModel.find({
        location: {
            $near: coordinates
        },
        tags: {$in: keywords}
    }, function(err, courses){
        if(err){
            callback(err);
        }else{
            callback(false, courses)
        }

    });


};

Course.isCourseDataValid = function(data, callback){
    if(data == null || data == undefined){
        callback('data null or undefined');
    }else if(!isDataComplete(data)){
        callback('data is incomplete');
    }else if(!isDataTypeValid(data)){
        callback('data type is not valid');
    }else if(!isAvailabilityValid(data.availability)){
        callback("data 'availability' is not valid");
    }else{
        callback();
    }
};

var isAvailabilityValid = function(availability) {
    return (
        (availability.days != undefined || availability.dates != undefined) &&
        (isDaysDataValid(availability) && isDateDataValid(availability)))
};

var isDaysDataValid = function(availability){
    if(!(availability.days == undefined || availability.days.length <= 0)) {
        for (var i = 0; i < availability.days.length; i++) {
            if (!isDaysItemDataValid(availability.days[i])) {
                return false;
            }
        }
        return true;
    }else{
        return true;
    }
};

var isDateDataValid = function(availability){
    if(!(availability.dates == undefined || availability.dates.length <= 0)) {
        for (var j = 0; j < availability.dates.length; j++) {
            if (!isDateItemDataValid(availability.dates[j])) {
                return false;
            }
        }
        return true;
    }else{
        return true;
    }
};

var isDaysItemDataValid = function(days){
    return !(days.dayOfTheWeek == undefined ||
        days.start == undefined ||
        days.end == undefined ||
        isNaN(days.dayOfTheWeek) ||
        isNaN(days.start) ||
        isNaN(days.end));
};

var isDateItemDataValid = function(date){
    return !(
        date.start == undefined ||
        date.end == undefined ||
        isNaN(date.start) ||
        isNaN(date.end));
};

var isDataComplete = function(data){

    return !(
        data.description == undefined ||
        data.teacherFbId == undefined ||
        data.teacherFirstName == undefined ||
        data.teacherFbPictureLink == undefined ||
        data.level == undefined ||
        data.location == undefined ||
        data.category == undefined ||
        data.tags == undefined ||
        data.tags == undefined ||
        data.price == undefined ||
        data.groupSize == undefined ||
        data.availability == undefined);
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