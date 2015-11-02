var Course = require('./controllers/course.js');
var Event = require('./controllers/event.js');
var async = require('async');

exports.search = function(req, res){
    Course.queryInternal(req.query, function(err, courseIds){
        if(err){
            res.status(400).send(err);
        }else{
            var result = [];
            var asyncTasks = [];

            courseIds.forEach(function(item){
                asyncTasks.push(function(callback){

                    Event.queryInternal({courseId: item.id, state: 1}, function (err, events) {
                        if (err) {
                            callback();
                        } else {
                            async.each(events,
                                function(eventItem, callback){
                                result.push({course: item, event: eventItem});
                                    callback();
                            },
                            function(err){
                                callback();
                            });
                            //result.push.apply(result, events);
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

                result.sort(function(a, b)
                {
                    return a.event.start - b.event.start;
                });
                res.status(200).send(result);
            });
        }
    });
};