const express = require("express");
const CONFIG = require("./config")
const cors = require("cors");
const PORT = CONFIG.PORT || 5000
const { exceptionHandling } = require("./middleware/errors/exceptionHandling");
const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let db = require("./models/index.js");

db.sequelize.sync({ alter: true }).then(() => {
  console.log("Mysql Database Connected Successfully");
}).catch(error => {
  console.log("Error to connect mysql database", error);
})

require("./routes/user-route")(app);

//error handling
app.use(exceptionHandling)

app.listen(PORT, () => {
  console.log(`APP LISTENING ON PORT ${PORT}`);
})
