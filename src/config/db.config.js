
require('dotenv').config();

//IMPORTING THE mysql module into the app
const {DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const mysql = require('mysql');
const connection = mysql.createConnection({
host: DB_HOST,
user: DB_USER,
password: DB_PASS,
database: DB_NAME
});

connection.connect(function(err){
if(err) throw err;
console.log("Database connected!");
});
module.exports = connection;