var Course = require('./controllers/course.js');
var Event = require('./controllers/event.js');
var async = require('async');

exports.exec = function(req, res){
    Course.queryInternal(req, function(err, courseIds){
        if(err){
            res.status(400).send(err);
        }else{
            var eventsList = [];
            var asyncTasks = [];

            courseIds.forEach(function(item){
                asyncTasks.push(function(callback){

                    Event.queryInternal({courseId: item.id, state: 1}, function (err, events) {
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
                res.status(200).send(eventsList);
            });
        }
    });
};