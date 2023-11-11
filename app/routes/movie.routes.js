module.exports = function(app) {

    const movies = require('../controllers/movie.controller.js');

    app.post('/movie', movies.create);
    app.get('/movies', movies.findAll);
    app.get('/movie/:movieId', movies.findOne);
    app.put('/movie/:movieId', movies.update);
    app.delete('/movie/:movieId', movies.delete);
}