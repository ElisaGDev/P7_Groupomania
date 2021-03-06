const User = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

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

exports.updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnu" + req.params.id);
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => {
        return res.send(docs);
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

exports.deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID inconnu: " + req.params.id);

  try {
    await User.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Suppression confirmée. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.follow = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID inconnu: " + req.params.id);
  try {
    // add to the follower list
    await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
    // add to following list
    await User.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    ).catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.unfollow = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID inconnu: " + req.params.id);
  try {
    // add to the follower list
    await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
    // add to following list
    await User.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    ).catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
