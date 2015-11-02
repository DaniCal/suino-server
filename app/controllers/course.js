var Course = require('../models/course.js');


//______________________________HTTP CALLS

exports.load = function(req, res){
    var data = req.query;
    Course.load(data, function(err, statusCode, course){
        if (err){
            res.status(500).send(err);
        }else{
            res.status(200).send(course);
        }
    });
};

exports.search = function(req, res){
    var data = req.query;
    Course.search(data, function(err, courseIds){
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send(courseIds);
        }
    })
};

exports.create = function(req, res){
    var data = req.body;
    Course.createCourse(data, function(msg, statusCode){
        res.status(statusCode).send(msg);
    });
};

exports.update = function(req, res){
    var data = req.body;
    Course.update(data, function(msg, statusCode){
        res.status(statusCode).send(msg);
    });
};

//______________________________INTERNAL FUNCTIONS

exports.queryInternal = function (data, callback){
    Course.search(data, function(err, courses){
        if(err){
            callback(err)
        }else{
            callback(false, courses);
        }
    });
};