var pool = require('../../config/db.config');

exports.create = async (req, res) => {
    const { movie_title, description, release_year, rating, image_id, created_by } = req.body;
    try {
        const newMovie = await pool.query('INSERT INTO movies (movie_title, description, release_year, rating, image_id, created_by, created_date) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
             [
                movie_title,
                description,
                release_year,
                rating,
                image_id,
                created_by
            ]);
        res.json(newMovie.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.findAll = async (req, res) => {
    try {
        const tasks = await pool.query('SELECT * FROM movies');
        res.json(tasks.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.findOne = async function (req, res) {
    const { id } = req.params;
    try {
        const tasks = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
        res.json(tasks.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    try {
        const updatedTask = await pool.query('UPDATE tasks SET description = $1 WHERE id = $2 RETURNING *', [description, id]);
        res.json(updatedTask.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};