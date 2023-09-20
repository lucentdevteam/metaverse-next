const mysql = require("mysql")
const CONFIG = require("../config")

exports.connection = mysql.createConnection({
  host: CONFIG.database.host,
  password:CONFIG.database.password,
  user:CONFIG.database.user,
  database:CONFIG.database.db
})
