var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');
var Course = require('./course.js');


var EventSchema = new Schema({
    //eventId: {type: String},
    courseId: {type: String},
    participants: {type: [String]},
    start: {type: Number},
    end: {type: Number},
    state: {type: Number}
});

var EventModel = mongoose.model('Event', EventSchema);

var Event = function(){
    //if(data.eventId == undefined){
    //    this._courseId = data.courseId;
    //    this._start = data.start;
    //    this._end = data.end;
    //}else{
    //    this._eventId = data.eventId;
    //}
};

var EventStates = {
    active: 1,
    inactive: 2,
    canceled: 3
};

Event.createEvent = function(data, callback){

    if(!isCreateDataValid(data)){
        callback('data not valid', 400);
        return;
    }

    var newEvent = new EventModel({
        //eventId: uuid.v4(),
        courseId: this._courseId,
        participants: [],
        start: this._start,
        end: this._end,
        state: EventStates.active
    });

    newEvent.save(function(err){
        if(err){
            callback('server error', 500);
        }else{
            callback('event created', 200);
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

var isCreateDataValid = function(data){
    if(data == null || data == undefined){
        return false;
    }else if(
        data.courseId == undefined ||
        data.start == undefined ||
        data.end == undefined
    ){
        return false;
    }else if(isNaN(data.start) || isNaN(data.end)){
        return false;
    }else{
        return true;
    }
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

Event.addParticipant = function(data, callback){

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

                Course.load(event, function(err, course){
                    if(course.groupSize <= event.participants.length){
                        callback('No spots left', 400);
                    } else if(event.participants.indexOf(data.participantId) > -1){
                        callback('Already participating', 400);
                    }else if(event.state == EventStates.canceled){
                        callback('Event canceled', 400);

                    }else{

                        EventModel.findByIdAndUpdate(
                            event._id,
                            {
                                $push: {participants: data.participantId}
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
                if(!(event.participants.indexOf(data.participantId) > -1)){
                    callback('User not participating', 400);
                }else{

                    EventModel.findByIdAndUpdate(
                        event._id,
                        {
                            $pull: {participants: data.participantId}
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
                if(event.participants.length > 0){
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
        query.where('participants').equals(data.participantId);
    }

    if(data.start != undefined){
        query.where('start').gt(data.start);
    }

    if(data.state != undefined){
        query.where('state').equals(data.state);
    }

    if(data.courseId != undefined){
        query.where('courseId').equals(data.courseId);
    }

    if(data.id != undefined){
        var id = data.id;
        query.where('courseId').equals('1');
    }

    query.sort({start: 1}).exec(callback);
};

module.exports = Event;