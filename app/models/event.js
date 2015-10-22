var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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
        this._spotsLeft = data.groupSize;
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

Event.prototype.createEvent = function(callback){
    var newEvent = new EventModel({
        eventId: uuid.v4(),
        courseId: this._courseId,
        participants: [],
        spotsLeft: this._spotsLeft,
        start: this._start,
        end: this._end,
        state: EventStates.active
    });

    newEvent.save(callback);
};

Event.prototype.addParticipant = function(data, callback){
    if(data.participantId == undefined || data.eventId == undefined){
        callback('bad request (participantId or eventId missing)', 400);
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

Event.prototype.removeParticipant = function(data, callback){

};

Event.prototype.cancelEvent = function(data, callback){

};

Event.prototype.updateDate = function(callback){

};

Event.query = function(callback){

};

module.exports = Event;