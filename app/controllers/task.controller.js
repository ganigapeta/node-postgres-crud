var pool = require('../../config/db.config');

exports.create = async (req, res) => {
    const { description } = req.body;
    try {
        const newTask = await pool.query('INSERT INTO tasks (description) VALUES ($1) RETURNING *', [description]);
        res.json(newTask.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.findAll = async (req, res) => {
    try {
        const tasks = await pool.query('SELECT * FROM tasks');
        res.json(tasks.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.findOne = function (req, res) {
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