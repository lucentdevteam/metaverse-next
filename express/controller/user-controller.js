const { cryptoDecryption, cryptoEncryption } = require("../helper/app-helper")
const CustomError = require("../middleware/errors/CustomError")
const db = require("../models")

exports.loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body
    let userData = await db.UserDetails.findOne({ where: { email } })
    if (!userData) throw new CustomError(404, "User not registered with this email address")
    if (cryptoDecryption(userData.password) != password) throw new CustomError(404, "Password is incorrect")
    res.status(200).send({ message: "Success" })
  } catch (error) {
    console.log("error", error);
    next(error)
  }
}

exports.registerUser = async (req, res, next) => {
  let { email, password, first_name, last_name, country, user_type, talent_type, virtual_worlds, experience, familiar_with } = req.body
  try {
    let userObject = {
      email,
      first_name,
      password: cryptoEncryption(password),
      last_name,
      country,
      user_type
    }

    var userCreatedData = await db.UserDetails.findOne({ where: { email: email } })
    if (userCreatedData) throw new CustomError(403, "User already registered")
    userCreatedData = await db.UserDetails.create(userObject)
    if (user_type == 'talent') {
      if ((virtual_worlds == 'yes' && !experience) || (virtual_worlds == 'no' && !familiar_with)) throw new CustomError(403, "Please provide talent full details")
      let user_id = userCreatedData.id
      let talentObject = {
        user_id,
        talent_type,
        virtual_worlds,
        experience,
        familiar_with
      }
      await db.TalentDetails.create(talentObject)
    }
    res.status(200).send({ message: "User registered" })
  } catch (error) {
    console.log("error=>>>", error);
    await db.UserDetails.destroy({ where: { email } })
    next(error)
  }
}