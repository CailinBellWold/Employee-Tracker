const mysql = require('mysql');

// Enable access to .env variables
require('dotenv').config();

// Use environment variables to connect to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
});

module.exports = connection;
