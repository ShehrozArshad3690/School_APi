const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "AccessCode123";
const _ = require("lodash");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (_.isEmpty(token)) {
      return res.json({
        message: "Token not provided",
      });
    }
    const verify = jwt.verify(token, SECRET_KEY);
    if (verify) {
      return next();
    }
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "Invalid Token",
    });
  }
};

module.exports = authenticate;
