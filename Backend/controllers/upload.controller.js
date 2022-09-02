const User = require("../models/user.model");
const fs = require("fs");
const sharp = require("sharp");
const { uploadErrors } = require("../utils/user.errors");

module.exports.uploadProfil = async (req, res) => {
  console.log(req.file);
  try {
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 100000000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }
  const fileName = req.body.name + ".jpg";

  sharp(req.file.buffer)
    .resize({ width: 150, height: 150 })
    .toFile(`${__dirname}/../client/public/uploads/profil/${fileName}`);

  try {
    await User.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: "./uploads/profil/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
