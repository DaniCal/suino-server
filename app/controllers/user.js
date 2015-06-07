var mongoose = require('mongoose');
var user = require('../models/user.js');

var User = mongoose.model('User');

exports.load = function (req, res, next, id) {

};


exports.create = function (req, res) {

};

exports.login = function (req, res) {
    var userData = req.body;
};