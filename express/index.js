const express = require("express");
const CONFIG = require("./config");
const cors = require("cors");
const PORT = CONFIG.PORT || 5000;
const { exceptionHandling } = require("./middleware/errors/exceptionHandling");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let db = require("./models/index.js");

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Mysql Database Connected Successfully");
  })
  .catch((error) => {
    console.log("Error to connect mysql database", error);
  });
  app.get('/', cors(corsOptions), function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for only example.com.'})
  })
require("./routes/user-route")(app);

//error handling
app.use(exceptionHandling);

app.listen(PORT, () => {
  console.log(`APP LISTENING ON PORT ${PORT}`);
});
