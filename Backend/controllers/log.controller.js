const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });
const { registerErrors } = require("../utils/user.errors");

//Création d'un nouvel utilisateur
exports.register = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => {
          res.status(201).json({ user: user._id });
        })
        .catch((err) => {
          const errors = registerErrors(err);
          res.status(400).json({ errors });
        });
    })
    .catch((err) => res.status(500).json({ errors }));
};

//Connexion d'un utilisateur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ errorEmail: "Email incorrect !", errorPassword: "" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              errorPassword: "Mot de passe incorrect !",
              errorEmail: "",
            });
          }
          const token = jwt.sign(
            { userId: user._id, role: user.role, pseudo: user.pseudo },
            process.env.USER_TOKEN_PASS,
            { expiresIn: "24h" }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.status(200).json({
            user: user._id,
          });
        })
        .catch((err) =>
          res.status(500).json({ message: "Connexion impossible au service !" })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Connexion impossible au service !" })
    );
};

exports.logOut = (req, res, next) => {
  res.clearCookie("jwt" /* , "", { expiresIn: 1 } */);
  res.redirect("/login");
};
