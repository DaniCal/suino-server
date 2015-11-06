var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Course = require('../controllers/course.js');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var val = {
    states: [
        1,2,3
    ]
};

var EventSchema = new Schema({
    _course: {type: Schema.Types.ObjectId, ref: 'Course', required: true},
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

var EventStates = {
    active: 1,
    inactive: 2,
    canceled: 3
};

Event.createEvent = function(data, callback){
    Course.loadById({_id: data._course}, function(err, course){
        if(err){
            callback(400);
        }else{
            var newEvent = new EventModel({
                _course: data._course,
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