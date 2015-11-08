var Course = require('./controllers/course.js');
var Event = require('./controllers/event.js');
var User = require('./controllers/user.js');
var async = require('async');




exports.search = function (req, res){
    var options = {
        teacher : true,
        events : true
    };
    var data = req.query;

    Event.search(data, function(err, events){
       if(err){
           res.status(400).send(err);
       }else{
           res.status(200).send(events)
       }
    });

    //Course.queryInternal(data, function(err, courses){
    //    if(err){
    //
    //    }else{
    //        res.status(200).send(courses);
    //    }
    //});
};




//
//exports.search = function(req, res){
//    Course.queryInternal(req.query, function(err, courses){
//        if(err){
//            res.status(400).send(err);
//        }else{
//            var result = [];
//            var asyncTasks = [];
//
//            courses.forEach(function(courseItem){
//                asyncTasks.push(
//                    function(callback){
//                        generateSearchResultObjectTask(courseItem, result, callback);
//                    });
//            });
//
//
//            async.parallel(asyncTasks, function(){
//
//                result.sort(function(a, b)
//                {
//                    return a.event.start - b.event.start;
//                });
//                res.status(200).send(result);
//            });
//        }
//    });
//};
//
//exports.myClasses = function(req, res){
//    var data = req.query;
//    if(data.fbId == undefined){
//        res.status(400).send('Data not valid');
//        return;
//    }
//    Course.queryInternal(data, function(err, courses){
//        if(err){
//            res.status(500).send(err);
//        }else{
//            var result = [];
//            var asyncTasks = [];
//            courses.forEach(function(courseItem){
//                asyncTasks.push(
//                    function(callback){
//                        generateMyClassesResultObjectTask(courseItem, result, callback);
//                    });
//            });
//
//
//            async.parallel(asyncTasks, function(){
//                result.sort(function(a, b)
//                {
//                    return a.events[0].start - b.events[0].start;
//                });
//                res.status(200).send(result);
//            });
//        }
//
//    });
//
//};
//
//var generateMyClassesResultObjectTask = function(course, result, callback){
//    Event.queryInternal({courseId: course._id, state: 1}, function(err, events){
//       if(err) {
//           callback();
//       }else{
//           events.sort(function(a, b)
//           {
//               return a.start - b.start;
//           });
//           result.push({course: course, events: events});
//           callback();
//       }
//    });
//
//};
//
//var generateSearchResultObjectTask = function(courseItem, result, callback){
//    User.get({fbId: courseItem.teacherFbId}, function(err, userItem){
//        if(!err){
//            Event.queryInternal({courseId: courseItem._id, state: 1}, function (err, events) {
//
//                if (err) {
//                    callback();
//                } else {
//                    async.each(events,
//                        function(eventItem, callback){
//                            result.push({course: courseItem, event: eventItem, user: userItem});
//                            callback();
//                        },
//                        function(err){
//                            callback();
//                        });
//                }
//            });
//        }
//    });
//};

