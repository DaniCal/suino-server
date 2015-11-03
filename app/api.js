var Course = require('./controllers/course.js');
var Event = require('./controllers/event.js');
var User = require('./controllers/user.js');
var async = require('async');

exports.search = function(req, res){
    Course.queryInternal(req.query, function(err, courses){
        if(err){
            res.status(400).send(err);
        }else{
            var result = [];
            var asyncTasks = [];

            courses.forEach(function(courseItem){
                asyncTasks.push(
                    function(callback){
                        generateResultObjectTask(courseItem, result, callback);
                    });
            });


            async.parallel(asyncTasks, function(){

                result.sort(function(a, b)
                {
                    return a.event.start - b.event.start;
                });
                res.status(200).send(result);
            });
        }
    });
};

var generateResultObjectTask = function(courseItem, result, callback){
    User.get({fbId: courseItem.teacherFbId}, function(err, userItem){
        if(!err){
            Event.queryInternal({courseId: courseItem.id, state: 1}, function (err, events) {

                if (err) {
                    callback();
                } else {
                    async.each(events,
                        function(eventItem, callback){
                            result.push({course: courseItem, event: eventItem, user: userItem});
                            callback();
                        },
                        function(err){
                            callback();
                        });
                }
            });
        }
    });
};

