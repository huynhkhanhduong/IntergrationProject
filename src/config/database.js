// Create the connection to database
require('dotenv').config();
const mysql = require('mysql2/promise');
const sql = require('mssql')


// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   });

  const MySQLConnection = mysql.createPool({
    host: process.env.HOST_MYSQL,
    port: process.env.PORT_MYSQL,
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DATABASE_MYSQL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

const MssqlConnection = {
  user: 'sa',
  password: '123456',
  database: 'HRM',
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}


  module.exports = {MySQLConnection,MssqlConnection};