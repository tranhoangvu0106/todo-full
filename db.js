const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = () => {
  const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });
};

module.exports = connectDB;