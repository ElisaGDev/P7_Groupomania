const express = require("express");
const router = express.Router();

const authCtrl = require("../middleware/auth.middleware");
const logCtrl = require("../controllers/auth.controller");

router.post("/signup", logCtrl.signUp);
router.post("/signin", logCtrl.signIn);

module.exports = router;
