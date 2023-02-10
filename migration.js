var mysql2 = require('mysql2');
var migration = require('mysql-migrations');

require('dotenv').config();

var connection = mysql2.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

migration.init(connection, __dirname + '/migrations');