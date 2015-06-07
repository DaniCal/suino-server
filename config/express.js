
var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');

module.exports = function (app) {

    app.use(express.static(__dirname + '/..' + '/public'));

    app.use(bodyParser.json());

}