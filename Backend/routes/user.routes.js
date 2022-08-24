const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");

//Users
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);

//Follow, unfollow
router.patch("/follow/:id", userCtrl.follow);
router.patch("/unfollow/:id", userCtrl.unfollow);

// upload

module.exports = router;
