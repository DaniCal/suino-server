var user = require('../app/controllers/user.js');
var course = require('../app/controllers/course.js');
var booking = require('../app/controllers/booking.js');
var event = require('../app/controllers/event.js');

module.exports = function (app) {

    app.get('/login', user.login);
    app.post('/register', user.create);

    app.post('/course', course.create);
    app.get('/course', course.load);
    app.get('/course/search', course.search);
    app.get('/course/all', course.loadAll);

    app.post('/booking', booking.create);
    app.get('/booking', booking.load);
    app.get('/booking/all', booking.loadAll);
    app.get('/booking/next', booking.loadNext);

    app.post('/event', event.create);
    app.put('/event/addParticipant', event.addParticipant);
    app.put('/event/removeParticipant', event.removeParticipant);

};