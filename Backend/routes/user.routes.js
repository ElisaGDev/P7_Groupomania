const router = require("express").Router();
const authController = require("../controllers/auth.controller");

//Authentification
router.post("/register", authController.signUp);

module.exports = router;
