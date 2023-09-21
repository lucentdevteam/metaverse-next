module.exports = (app) => {
  const { registerUser, loginUser } = require("../controller/user-controller");
  let router = require("express").Router();

  router.post("/register", registerUser);
  router.post("/login", loginUser);
  app.use("/user", router);
};
