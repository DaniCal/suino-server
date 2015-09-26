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
    var course = new Course(data);
    course.load(function(err, course){
        if (err){
            res.status(500).send(statusMessage.dbError);
        }
//        else if (!course){
//            res.status(204).send(statusMessage.dataNotFound);
        else{
            res.status(200).send(course);
        }
    });
};


exports.create = function(req, res){
    var data = req.body;
    Course.isCourseDataValid(data, function(err){
        if(err){
            res.status(400).send(err);
        }else{

            var course  = new Course(data);
            course.createCourse(function(){
                res.status(201).send();
            });
        }
    });
};