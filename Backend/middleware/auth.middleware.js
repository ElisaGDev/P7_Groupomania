const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.USER_TOKEN_PASS,
      async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.status(401).send("Absence de token!");
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.USER_TOKEN_PASS,
      async (err, decodedToken) => {
        if (err) {
          res.status(200).json("Token invalide!");
          console.log(err);
        } else {
          console.log(decodedToken.id);
          next();
        }
      }
    );
  } else {
    console.log("Absence de token!");
  }
};
