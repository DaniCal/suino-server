var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Course = require('../controllers/course.js');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var _ = require('underscore');

var EventStates = {
    active: 1,
    inactive: 2,
    canceled: 3
};

var val = {
    states: [
        EventStates.active,
        EventStates.inactive,
        EventStates.canceled
    ],
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

var EventSchema = new Schema({
    _course:{type: Schema.Types.ObjectId, ref: 'Course', required: true},
    courseInfo: {
        level: {type: Number, required: true, min: val.minLevel, max: val.maxLevel},
        location: {
            type: [Number],
            index: '2d',
            required: true
        },
        category: {type: String, required: true, enum: val.categories},
        tags: {type: [String], required: true},
        price: {type: Number, required: true, min: val.minPrice, max: val.maxPrice},
        groupSize: {type: Number, required: true, min: val.minGroupSize}
    },
    _participants: {type: [ {type: Schema.Types.ObjectId, ref: 'User'}]},
    start: {type: Number, required: true},
    end: {type: Number, required: true},
    state: {type: Number, enum: val.states, required: true}
});

EventSchema.plugin(deepPopulate);

var EventModel = mongoose.model('Event', EventSchema);
var CourseModel = mongoose.model('Course');

var Event = function(){
};



Event.createEvent = function(data, callback){
    Course.loadById({_id: data._course}, function(err, course){
        if(err){
            callback(400);
        }else{
            var newEvent = new EventModel({
                _course: course._id,
                courseInfo: {
                    level: course.level,
                    location: course.location,
                    category: course.category,
                    tags: course.tags,
                    price: course.price,
                    groupSize: course.groupSize
                },
                participants: [],
                start: data.start,
                end: data.end,
                state: EventStates.active
            });
            newEvent.save(function(err,event){
                if(err){
                    callback(err, 400);
                }else{
                    Course.addEvent(event, function(){
                        callback('event created', 200);
                    });
                }
            });
        }
    });
};

Event.load = function(data, callback){
    if(data == null || data == undefined || data._id == undefined){
        callback('data invalid', 400);
    }

    EventModel.findOne({_id: data._id}, function(err, event){
        if(err){
            callback(err, 500);
        }else if(!event){
            callback('Not found', 204);
        }else{
            callback(false, 200, event);
        }
    });
};

Event.addParticipant = function(data, callback){

    if(!isAddParticipantDataValid(data)){
        callback('data not valid', 400);
        return;
    }

    EventModel.findOne(
        {_id: data._id},
        function(err, event){
            if(err){
                callback(err, 400);
            }else if(!event){
                callback('Not found', 404);
            }else{

                Course.loadById({_id: event._course.toString()}, function(err, course){
                    if(err){
                        callback('Course not found', 400);
                    }
                    else if(course.groupSize <= event._participants.length){
                        callback('No spots left', 400);
                    } else if(event._participants.indexOf(data.participantId) > -1){
                        callback('Already participating', 400);
                    }else if(event.state == EventStates.canceled){
                        callback('Event canceled', 400);

                    }else{

                        EventModel.findByIdAndUpdate(
                            event._id,
                            {
                                $push: {_participants: data.participantId}
                            },
                            function(err, event){
                                if(err){
                                    callback(err, 400);
                                }else{
                                    callback(false, 200);
                                }
                            }
                        );
                    }
                });
            }
        }
    );
};

Event.removeParticipant = function(data, callback){
    if(!isAddParticipantDataValid(data)){
        callback('data not valid', 400);
        return;
    }

    EventModel.findOne(
        {_id: data._id},
        function(err, event){
            if(err){
                callback(err, 500);
            }else if(!event || event == undefined){
                callback('Not found', 404);
            }else{
                if(!(event._participants.indexOf(data.participantId) > -1)){
                    callback('User not participating', 400);
                }else{

                    EventModel.findByIdAndUpdate(
                        event._id,
                        {
                            $pull: {_participants: data.participantId}
                        },
                        function(err, event){
                            if(err){
                                callback(err, 500);
                            }else{
                                callback(false, 200);
                            }
                        }
                    );
                }
            }
        }
    );
};

Event.cancel = function(data, callback){
    if(data == null || data == undefined || data._id == undefined){
        callback(400, 'data not valid');
        return;
    }

    EventModel.findOne(
        {_id: data._id},
        function(err, event){
            if(err){
                callback(err, 500);
            }else if(!event || event == undefined){
                callback('Not found', 404);
            }else{
                if(event._participants.length > 0){
                    callback('event can not be canceled', 400);
                }else{

                    EventModel.findByIdAndUpdate(
                        event._id,
                        {
                            state: EventStates.canceled
                        },
                        function(err, event){
                            if(err){
                                callback(err, 500);
                            }else{
                                callback('event canceled', 200);
                            }
                        }
                    );
                }
            }
        }
    );
};

Event.query = function(data, callback){
    var query = EventModel.find();

    if(data.participantId != undefined){
        query.where('_participants').equals(data.participantId);
    }

    if(data.start != undefined){
        query.where('start').gt(data.start);
    }

    if(data.state != undefined){
        query.where('state').equals(data.state);
    }

    if(data._course != undefined){
        query.where('_course').equals(data._course);
    }

    query.deepPopulate(['_course','_course._teacher']);
    //query.deepPopulate('_course._teacher');


    query.sort({start: 1}).exec(callback);
};

Event.search = function(data, callback){
  var query = buildSearchQuery(data);

    query.exec(callback);
};

var buildSearchQuery = function(data){
    var query = EventModel.find();
    query.populate('_course');
    query.where('state').equals(EventStates.active);
    query.where('start').gt(_.now()/1000);

    if(data.keywords != undefined){
        query.where('_course.tags').in(data.keywords);
    }

    //if(data.longitude != undefined && data.latitude != undefined){
    //    var coordinates = [];
    //    coordinates[0] = data.longitude;
    //    coordinates[1] = data.latitude;
    //    query.where('_course.location').near(coordinates);
    //}
    return query;

};


var isAddParticipantDataValid = function(data){
    if(data == null || data == undefined){
        return false;
    }else if(
        data._id == undefined ||
        data.participantId == undefined
    ){
        return false;
    }else{
        return true;
    }
};


module.exports = Event;