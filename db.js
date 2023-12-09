const mysql = require("mysql");
require("dotenv").config();

const con = mysql.createConnection({
  host: process.env.hostname,
  database: process.env.databasename,
  user: process.env.user,
  password: process.env.password,
});

console.log(process.env.user);
con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connect");
  }
});

module.exports = con;
