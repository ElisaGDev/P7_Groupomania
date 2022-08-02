const express = require("express");
const router = express.Router();

const logCtrl = require("../controllers/log.controller");

//Log
router.post("/register", logCtrl.register);
router.post("/login", logCtrl.login);
router.get("/logout", logCtrl.logOut);

module.exports = router;
