const { Pool } = require('pg');

const pool = new Pool({
  user: 'kishore',
  host: 'localhost',
  database: 'mycrudapp',
  password: '12345',
  port: 5432,
});

module.exports = pool;
