var Course = require('../models/course.js');

//______________________________HTTP CALLS

exports.load = function(req, res){
    var data = req.query;
    Course.loadById(data, function(err, statusCode, course){
        if (err){
            res.status(statusCode).send(err);
        }else{
            res.status(statusCode).send(course);
        }
    });
};

exports.create = function(req, res){
    var data = req.body;
    Course.createCourse(data, function(msg, statusCode){
        res.status(statusCode).send(msg);
    });
};

exports.query = function(req, res){
    var data = req.query;
    Course.query(data, function(err, courseIds){
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send(courseIds);
        }
    })
};

exports.update = function(req, res){
    var data = req.body;
    Course.update(data, function(msg, statusCode){
        res.status(statusCode).send(msg);
    });
};

//______________________________INTERNAL FUNCTIONS

exports.queryInternal = function (data, callback){
    Course.query(data, function(err, courses){
        if(err){
            callback(err)
        }else{
            callback(false, courses);
        }
    });
};

exports.loadById = function(data, callback){
    Course.loadById(data, function(err, statusCode, course){
       if(err){
           callback(err);
       }else{
           callback(false, course);
       }
    });
};

exports.addEvent = function(data, callback){
    Course.addEvent(data, callback);
};

exports.removeEvent = function(data, callback){

};

