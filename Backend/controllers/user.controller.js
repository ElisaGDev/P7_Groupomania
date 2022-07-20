const User = require("../models/user.model");

// Consultation des utilisateurs
exports.getAllUsers = (req, res, next) => {
  User.find()
    .select("-password")
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      res.status(400).json({ err });
    });
};
