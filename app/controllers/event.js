var Event = require('../models/event.js');


exports.create = function(req, res){
    var data = req.body;
    Event.createEvent(data, function(msg,statusCode){
        res.status(statusCode).send(msg);
    });
};

exports.addParticipant = function(req, res){
    var data = req.body;
    Event.addParticipant(data, function(msg, statusCode){
        res.status(statusCode).send(msg);
    });
};

exports.removeParticipant = function(req, res){
    var data = req.body;
    Event.removeParticipant(data, function(msg, statusCode){
        res.status(statusCode).send(msg);
    });
};

exports.getEventsByCourseId = function(req, res){
    var data = req.query;
    Event.queryEventsByCourseId(data, function (statusCode, data){
        res.status(statusCode).send(data);
    });
};

exports.getEventsByParticipantId = function(req, res){
    var data = req.query;
    Event.queryEventsByParticipantId(data, function(err, events){
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send(events);
        }
    });
};

exports.cancel = function(req, res){
    var data = req.body;
    Event.cancel(data, function(msg, statusCode){
        res.status(statusCode).send(msg);

    });


};