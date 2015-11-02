var Notification = require('../models/notification.js');

exports.query = function(req, res){
    var data = req.query;
    Notification.query(data, function(err, notifications){
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send(notifications);
        }
    });
};