const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'org_team_tracker',
    user: process.env.DB_USER,
    password: process.env.DB_PW
},
    console.log("Connected to the org_team_tracker database")
);

module.exports = db;