const { cryptoDecryption, cryptoEncryption } = require("../helper/app-helper");
const CustomError = require("../middleware/errors/CustomError");
const db = require("../models");

exports.loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let userData = await db.UserDetails.findOne({
      where: { email },
      include: {
        model: db.TalentDetails,
      },
    });
    if (!userData)
      throw new CustomError(404, "User not registered with this email address");
    userData = JSON.parse(JSON.stringify(userData));
    if (cryptoDecryption(userData.password) != password)
      throw new CustomError(404, "Password is incorrect");
    if (userData.talent_detail) {
      userData.talent_detail.talent_type = userData.talent_detail.talent_type
        ? JSON.parse(userData.talent_detail.talent_type)
        : null;
      userData.talent_detail.familiar_with = userData.talent_detail
        .familiar_with
        ? JSON.parse(userData.talent_detail.familiar_with)
        : null;
    }
    delete userData.password;
    res.status(200).send({ message: "Success", data: userData });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

exports.registerUser = async (req, res, next) => {
  let {
    email,
    password,
    first_name,
    last_name,
    country,
    user_type,
    talent_type,
    virtual_worlds,
    experience,
    familiar_with,
  } = req.body;
  try {
    let userObject = {
      email,
      first_name,
      password: cryptoEncryption(password),
      last_name,
      country,
      user_type,
    };

    var userCreatedData = await db.UserDetails.findOne({
      where: { email: email },
    });
    if (userCreatedData) throw new CustomError(400, "User already registered");
    userCreatedData = await db.UserDetails.create(userObject);
    if (user_type == "talent") {
      if (
        (virtual_worlds == "yes" && !experience) ||
        (virtual_worlds == "no" && !familiar_with?.length)
      )
        throw new CustomError(403, "Please provide full detail of talent");
      let user_id = userCreatedData.id;
      let talentObject = {
        user_id,
        talent_type: talent_type ? JSON.stringify(talent_type) : null,
        virtual_worlds,
        experience,
        familiar_with: familiar_with ? JSON.stringify(familiar_with) : null,
      };
      await db.TalentDetails.create(talentObject);
    }
    res.status(200).send({ status: 200, message: "User registered" });
  } catch (error) {
    console.log("error=>>>", error);
    if (error?.code != 400) await db.UserDetails.destroy({ where: { email } });
    next(error);
  }
};
