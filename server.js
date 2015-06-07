
var express = require('express');
var mongoose = require('mongoose');
var config = require('config');

var app = express();
var port = 3000;

var dbConfig = config.get('Server.dbConfig');

// Connect to mongodb
var connect = function () {
    var connectUri = 'mongodb://' + dbConfig.host+ ':' +  dbConfig.port + '/' + dbConfig.dbName;
    mongoose.connect(connectUri);
};

connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);



// Bootstrap application settings
require('./config/express')(app);


app.listen(port);
