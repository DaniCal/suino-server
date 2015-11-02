var user = require('../app/controllers/user.js');
var course = require('../app/controllers/course.js');
var booking = require('../app/controllers/booking.js');
var event = require('../app/controllers/event.js');
var api = require('../app/api.js');
var notification = require('../app/controllers/notification.js');


module.exports = function (app) {

    //______________________________USER CALLS

    app.get('/user', user.load);
    app.post('/login', user.login);
    app.post('/register', user.create);

    //______________________________COURSE CALLS

    app.post('/course', course.create);
    app.put('/course', course.update);
    app.get('/course', course.load);
    app.get('/course/search', course.query);

    //______________________________BOOKING CALLS

    app.post('/booking', booking.create);
    app.get('/booking', booking.load);
    app.get('/booking/all', booking.loadAll);
    app.get('/booking/next', booking.loadNext);

    //______________________________EVENT CALLS

    app.post('/event', event.create);
    app.get('/event', event.load);
    app.get('/event/query', event.query);
    app.put('/event/addParticipant', event.addParticipant);
    app.put('/event/removeParticipant', event.removeParticipant);
    app.put('/event/cancel', event.cancel);

    app.get('/notification', notification.query);
    app.post('/notification/read', notification.read);


    //______________________________API CALLS

    app.get('/search', api.search);

};