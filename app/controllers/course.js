var Course = require('../models/course.js');

var statusMessage = {
    'dataIncomplete': 'Received data is incomplete or undefined',
    "dbError": 'Error while loading model from database',
    'dataCreated': 'New item created',
    'dataExist': 'Item already exists',
    'dataNotFound': 'Item not found',
    'dataFound': 'Item found'
};


exports.load = function(req, res){
    var data = req.query;

    Course.load(data, function(err, course){
        if (err){
            res.status(500).send(statusMessage.dbError);
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

exports.queryInternal = function (req, callback){
    var data = req.query;
    Course.search(data, function(err, courseIds){
        if(err){
            callback(err)
        }else{
            callback(false, courseIds);
        }
    });
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