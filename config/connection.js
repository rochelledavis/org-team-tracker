const mysql = require('mysql2');
require('dotenv').config();

// create connection to our database, pass in your MySQL information for username and password
const db = mysql.createConnection({
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PW
},
    console.log("Connected to the org_team_tracker_db database")
);

module.exports = db;