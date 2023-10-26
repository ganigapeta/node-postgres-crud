module.exports = function(app) {

    var tasks = require('../controllers/task.controller.js');

    app.post('/tasks', tasks.create);
    app.get('/tasks', tasks.findAll);
    app.get('/tasks/:taskID', tasks.findOne);
    app.put('/tasks/:taskID', tasks.update);
    app.delete('/tasks/:taskID', tasks.delete);
}