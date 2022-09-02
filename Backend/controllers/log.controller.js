const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });
const { registerErrors, loginErrors } = require("../utils/user.errors");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.USER_TOKEN_PASS, {
    expiresIn: maxAge,
  });
};

//Création d'un nouvel utilisateur
exports.register = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await User.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = registerErrors(err);
    res.status(200).send({ errors });
  }
};

//Connexion d'un utilisateur
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = loginErrors(err);
    res.status(200).json({ errors });
  }
};

exports.logout = (req, res, next) => {
  res.clearCookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
};
