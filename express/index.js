const express = require("express");
const CONFIG = require("./config")

const PORT = CONFIG.PORT || 5000

const app = express();

let { connection } = require("./mysql/index")

connection.query(`SELECT * FROM user_details`, (err,data)=>{
  console.log("data=>>>", data);
});
// console.log("Data=>>>", connection.);

app.use(express.json())

app.listen(PORT, ()=>{
  console.log(`APP LISTENING ON PORT ${PORT}`);
})
