const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const app = express();
const cors = require('cors')
const pool = require('./config/db.config');
const corsOptions = {
  origin: 'http://localhost:4200', // Replace with your actual allowed origin(s)
  methods: 'GET,POST', // Replace with your allowed HTTP methods
  allowedHeaders: 'Content-Type', // Replace with your allowed headers
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    store: new pgSession({
      pool,
      tableName: 'session',
    }),
    secret: 'node_crud',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

app.use(cors(corsOptions))

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

require('./app/routes/auth.routes.js')(app);
require('./app/routes/task.routes.js')(app);

