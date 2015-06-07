var user = require('../app/controllers/user.js');


module.exports = function (app) {

    app.get('/login', user.login);

}