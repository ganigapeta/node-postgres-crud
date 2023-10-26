var pool = require('../../config/db.config');
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
    const { username, password, email } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
        res.send('User registered');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            res.status(401).send('Invalid username or password');
            return;
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
       
        if (passwordMatch) {
            req.session.userId = user.id;
            delete user.password;
            res.status(200).send({ ...user, sessionId: req.sessionID });
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
}

exports.checkUserSession = async (req, res) => {
    const { sid } = req.body;
    try {
        const result = await pool.query('SELECT * FROM session WHERE sid = $1', [sid]);
        if (result.rows.length === 0) {
            res.status(401).send('Session expired');
            return;
        }
        
        res.status(200).send(result.rows[0]);
    } catch (error) {

    }
}

exports.logout = async (req, res) => {
    req.session.destroy(() => {
        res.status(200).send({ message: 'logged out', sessionId: req.sessionID });
    });
}