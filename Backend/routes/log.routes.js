const express = require("express");
const router = express.Router();

const checkPassword = require("../middleware/password-validator");
const logCtrl = require("../controllers/log.controller");

//Log
router.post("/register", checkPassword, logCtrl.register);
router.post("/login", logCtrl.login);
router.get("/logout", logCtrl.logOut);

module.exports = router;
