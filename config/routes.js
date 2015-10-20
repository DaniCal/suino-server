var user = require('../app/controllers/user.js');
var course = require('../app/controllers/course.js');
var booking = require('../app/controllers/booking.js');

var card = require('../app/controllers/card.js');


module.exports = function (app) {

    app.get('/login', user.login);
    app.post('/register', user.create);
    app.post('/course', course.create);
    app.get('/course', course.load);
    app.post('/booking', booking.create);


};