var Course = require('../models/course.js');

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