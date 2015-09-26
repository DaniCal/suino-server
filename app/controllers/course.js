var Course = require('../models/course.js');

exports.create = function(req, res){
    var data = req.body;
    Course.isCourseDataValid(data, function(err, message){
        if(err){
            res.status(400).send(message);
        }
        res.status(201).send();
    });
};