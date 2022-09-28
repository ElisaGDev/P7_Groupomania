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
          res.cookie("jwt", "", { maxAge: 1 });
          res.status(401).json({ message: "non connecté" });
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.status(401).json({ message: "non connecté" });
    res.locals.user = null;
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    // Vérification du token
    jwt.verify(
      token,
      process.env.USER_TOKEN_PASS,
      async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.send(200).json("no token");
        } else {
          console.log(decodedToken.id);
          next();
        }
      }
    );
  } else {
    console.log("No token");
  }
};
