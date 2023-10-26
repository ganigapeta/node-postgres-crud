module.exports = function(app) {

    var auth = require('../controllers/auth.controller.js');

    app.post('/user/create', auth.create);
    app.post('/user/session', auth.checkUserSession);
    app.post('/user/login', auth.login);
    app.get('/user/logout', auth.logout);
}