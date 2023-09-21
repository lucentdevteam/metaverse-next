const cors = require("cors");

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = (app) => {
  const { registerUser, loginUser } = require("../controller/user-controller");
  let router = require("express").Router();

  router.post("/register",cors(corsOptions), registerUser);
  router.post("/login",cors(corsOptions), loginUser);
  app.use("/user", router);
};
