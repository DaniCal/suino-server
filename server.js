
var express = require('express');

var app = express();
var port = 3000;

// Bootstrap application settings
require('./config/express')(app);


app.listen(port);
