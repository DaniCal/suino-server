var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');


var CourseSchema = new Schema({
        id: {type: String},
        title: {type: String},
        date : {type: Number},
        description: {type: String},
        teacherFbId: {type: String},
        teacherFirstName: {type: String},
        teacherFbPictureLink: {type:String},
        level: {type: Number},
        location: {type: {longitude: {type: Number}, altitude: {type: Number}}},
        address: {type: {
            country: {type: String},
            city: {type: String},
            zip: {type: String},
            street: {type: String},
            number: {type: String}
        }},
        category: {type: String},
        tags: {type: [String]},
        material: {type: [String]},
        price: {type: Number},
        availability: {
            days: [{
                date: {type: Number},
                segments: [{
                    start: {type: Number},
                    end: {type: Number},
                    places: {type: Number},
                    students: {type: [String]}
                }]
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

    this._title = data.title;
    this._description = data.description;
    this._teacherFbId = data.teacherFbId;
    this._teacherFirstName = data.teacherFirstName;
    this._teacherFbPictureLink = data.teacherFbPictureLink;
    this._level = data.level;
    this._location = data.location;
    this._address = data.address;
    this._category = data.category;
    this._tags = data.tags;
    this._material = data.material;
    this._price = data.price;
    this._availability = data.availability;
};

Course.prototype.createCourse = function(callback){
    var newCourse = new CourseModel({
        id: uuid.v4(),
        title: this._title,
        date: getDate(),
        description: this._description,
        teacherFbId: this._teacherFbId,
        teacherFirstName: this._teacherFirstName,
        teacherFbPictureLink: this._teacherFbPictureLink,
        level: this._level,
        location: this._location,
        address: this._address,
        category: this._category,
        tags: this._tags,
        material: this._material,
        price: this._price,
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

Course.isCourseDataValid = function(data, callback){
    if(data == null || data == undefined){
        callback('data null or undefined');
    }else if(!isDataComplete(data)){
        callback('data is incomplete');
    }else if(!isDataTypeValid(data)){
        callback('data type is not valid');
    }else if(!isAvailabilityValid(data.availability)){
        callback("data 'availability' is not valid");
    }else if(!isAddressValid(data.address)){
        callback("data 'address' is not valid");
    }else{
        callback();
    }
};



var isAvailabilityValid = function(availability) {
    return !(availability.days == undefined ||
        availability.days.length <= 0 ||
        availability.days[0].date == undefined ||
        availability.days[0].segments == undefined ||
        availability.days[0].segments.length <= 0
        );
};

var isAddressValid = function(address){
    return !(address.country == undefined ||
        address.city == undefined ||
        address.zip == undefined ||
        address.street == undefined ||
        address.number == undefined);
};

var isDataComplete = function(data){

    return !(data.title == undefined||
        data.description == undefined ||
        data.teacherFbId == undefined ||
        data.teacherFirstName == undefined ||
        data.teacherFbPictureLink == undefined ||
        data.level == undefined ||
        data.location == undefined ||
        data.address == undefined ||
        data.category == undefined ||
        data.tags == undefined ||
        data.material == undefined ||
        data.tags == undefined ||
        data.price == undefined ||
        data.availability == undefined);
};

var isDataTypeValid = function(data){
    if(isNaN(data.price)){
        return false;
    }else if(isNaN(data.level)){
        return false;
    }else if(isNaN(data.location.longitude) || isNaN(data.location.altitude)){
        return false;
    }
    return true;

};


var getDate = function(){
    return Math.floor((new Date().getTime()/1000));
};

module.exports = Course;