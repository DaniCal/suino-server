var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');


var EventSchema = new Schema({
    eventId: {type: String},
    courseId: {type: String},
    participants: {type: [String]},
    spotsLeft: {type: Number},
    start: {type: Number},
    end: {type: Number},
    state: {type: Number}
});

var EventModel = mongoose.model('Event', EventSchema);

var Event = function(data){
    if(data.eventId == undefined){
        this._courseId = data.courseId;
        this._spotsLeft = data.spotsLeft;
        this._start = data.start;
        this._end = data.end;
    }else{
        this._eventId = data.eventId;
    }
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
        eventId: uuid.v4(),
        courseId: this._courseId,
        participants: [],
        spotsLeft: this._spotsLeft,
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

var isCreateDataValid = function(data){
    if(data == null || data == undefined){
        return false;
    }else if(
        data.courseId == undefined ||
        data.spotsLeft == undefined ||
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
        data.eventId == undefined ||
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
        {eventId: data.eventId},
        function(err, event){
            if(err){
                callback(err, 500);
            }else if(!event || event == undefined){
                callback('Not found', 404);
            }else{
                if(event.spotsLeft == 0){
                    callback('No spots left', 400);
                }else if(event.participants.indexOf(data.participantId) > -1){
                    callback('Already participating', 400);
                }else if(event.state == EventStates.canceled){
                    callback('Event canceled', 400);

                }else{

                    EventModel.findByIdAndUpdate(
                      event._id,
                        {
                            $push: {participants: data.participantId},
                            spotsLeft: event.spotsLeft - 1
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

Event.removeParticipant = function(data, callback){
    if(!isAddParticipantDataValid(data)){
        callback('data not valid', 400);
        return;
    }

    EventModel.findOne(
        {eventId: data.eventId},
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
                            $pull: {participants: data.participantId},
                            spotsLeft: event.spotsLeft + 1
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

Event.queryEventsByCourseId = function(data,callback){
    if(data == null || data == undefined || data.courseId == undefined){
        callback(400, 'data not valid');
        return;
    }

    EventModel.find({courseId: data.courseId}, function(err, events){
        if(err){
            callback(err, 500);
        }else{
            callback(200, events);
        }
    });

};

Event.queryEventsByParticipantId = function(data,callback){
    if(data == null || data == undefined || data.participantId == undefined){
        callback(400, 'data not valid');
        return;
    }

    EventModel.find({participants:  data.participantId}, function(err, events){
        callback(err, events);
    });

};


Event.cancel = function(data, callback){
    if(data == null || data == undefined || data.eventId == undefined){
        callback(400, 'data not valid');
        return;
    }

    EventModel.findOne(
        {eventId: data.eventId},
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

Event.updateDate = function(callback){

};

Event.query = function(callback){

};

module.exports = Event;