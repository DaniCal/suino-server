var user = require('../app/controllers/user.js');


module.exports = function (app) {

    app.post('/login', user.login)

}