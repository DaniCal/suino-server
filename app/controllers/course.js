var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var CourseSchema = new Schema({
        title: {type: String},
        date : {type: Number},
        description: {type: String},
        teacherFbId: {type: String},
        teacherFirstName: {type: String},
        teacherFbPictureLink: {type:String},
        participants: {type: {min: {type: Number}, max: {type: Number}}},
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
                segments: [{start: {type: Number}, end: {type: Number}}]
            }]
        }
    }
);

var Course = function(data){
    this._title = data.title;
    this._description = data.description;
    this._teacherFbId = data.teacherFbId;
    this._teacherFirstName = data.teacherFirstName;
    this._teacherFbPictureLink = data.teacherFbPictureLink;
    this._participants = data.participants;
    this._level = data.level;
    this._location = data.location;
    this._address = data.address;
    this._category = data.category;
    this._tags = data.tags;
    this._material = data.material;
    this._price = data.price;
    this._availability = data.availability;
};

Cource.prototype.createCourse = function(callback){
    var newCourse = new CourseModel({

    })
};

module.exports = Course;