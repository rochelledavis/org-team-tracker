const mysql = require('mysql2');
require('dotenv').config();

// create connection to our database, pass in your MySQL information for username and password
const db = mysql.createConnection(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
},
    console.log("Connected to the org_team_tracker_db database")
);

module.exports = db;