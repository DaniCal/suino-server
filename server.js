
var express = require('express');
var mongoose = require('mongoose');
var config = require('config');

var app = express();
var port = 3000;

var dbConfig = config.get('Server.dbConfigTest');

// Connect to mongodb
var connect = function () {
    var connectUri = 'mongodb://' + dbConfig.host+ ':' +  dbConfig.port + '/' + dbConfig.dbName;
    mongoose.connect(connectUri);
};

//exports.connectToTestDb = function(){
//    mongoose.disconnect();
//    dbConfig = config.get('Server.dbConfigTestData');
//    connect();
//};

connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);



// Bootstrap application settings
require('./config/express.js')(app);

require('./config/routes.js')(app);



app.listen(port);



console.log("Suino server started on port: " + port);


module.exports = app;
