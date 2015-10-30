var Event = require('../models/event.js');
var async = require('async');


exports.create = function(req, res){
    var data = req.body;
    Event.createEvent(data, function(msg,statusCode){
        res.status(statusCode).send(msg);
    });
};

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

exports.queryEventsByCourseIds = function(courseIds, callback){
    var eventsList = [];
    var asyncTasks = [];

    courseIds.forEach(function(item){
        asyncTasks.push(function(callback){

            Event.query({courseId: item.id, state: 1}, function (err, events) {
                if (err) {
                    callback();
                } else {
                    eventsList.push.apply(eventsList, events);
                    callback();
                }
            });
        });
    });

    asyncTasks.push(function(callback){
        setTimeout(function(){
            callback();
        }, 0);
    });


    async.parallel(asyncTasks, function(){

        eventsList.sort(function(a, b)
        {
            return a.start - b.start;
        });
        callback(false, eventsList);
    });
    
};