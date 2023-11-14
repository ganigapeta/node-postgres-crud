const pool = require('../../config/db.config');

exports.simpleFileUpload = async (req, res) => {
    try {
        var response = '<a href="/">Home</a><br>';
        response += "Files uploaded successfully.<br>";
        response += `<img src="${req.file.path}" /><br>`;
        // return res.send(response)
        // Insert the image into the PostgreSQL database
        const result = await pool.query('INSERT INTO movie_images (src) VALUES($1) RETURNING id', [req.file.path]);

        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getImageById = async (req, res) => {
    const imageId = req.params.Id;
    try {
        // Retrieve the image from the database
        const result = await pool.query('SELECT src FROM movie_images WHERE id = $1', [imageId]);

        if (result.rows.length === 0) {
            res.status(404).send('Image not found');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}