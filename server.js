
var express = require('express');

var app = express();
var port = 3000;

// Bootstrap application settings
require('./config/express')(app);
require('./config/routes')(app);



app.listen(port);


console.log("Suino server started on port + " + port);