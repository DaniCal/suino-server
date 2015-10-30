var Course = require('./controllers/course.js');
var Event = require('./controllers/event.js');


exports.exec = function(req, res){
    Course.queryInternal(req, function(err, courseIds){
        if(err){
            res.status(400).send(err);
        }else{
            Event.queryEventsByCourseIds(courseIds, function(err, events){
               if(err){
                   res.status(400).send(err);
               } else{
                   res.status(200).send(events);
               }
            });
        }
    });
};