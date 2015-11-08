var Event = require('../models/event.js');

//______________________________HTTP CALLS

exports.load = function(req, res){
    var data = req.query;
    Event.load(data, function(err, statusCode,  event){
        if(err){
            res.status(statusCode).send(err);
        }else{
            res.status(statusCode).send(event);
        }
    })
};

exports.create = function(req, res){
    var data = req.body;
    Event.createEvent(data, function(msg,statusCode){
        res.status(statusCode).send(msg);
    });
};

exports.query = function(req, res){
    var data = req.query;
    Event.query(data, function(err, events){
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send(events);
        }
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

exports.cancel = function(req, res){
    var data = req.body;
    Event.cancel(data, function(msg, statusCode){
        res.status(statusCode).send(msg);

    });
};

//______________________________INTERNAL CALLS

exports.queryInternal = function(data, callback){
    Event.query(data, callback);
};

exports.search = function(data, callback){
    Event.search(data, callback);
};