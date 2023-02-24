let mysql = require('mysql')

let db = mysql.createPool({
  host: "43.139.189.22",
  user: "admin",
  password: "Jlc2211!",
  database: "study",
});

module.exports = db