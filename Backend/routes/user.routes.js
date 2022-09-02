const router = require("express").Router();
const authController = require("../controllers/log.controller");
const userController = require("../controllers/user.controller");
const { checkUser } = require("../middleware/auth.middleware");
const multer = require("../middleware/multer");

// auth
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// user
router.get("/", checkUser, userController.getAllUsers);
router.get("/:id", checkUser, userController.getOneUser);
router.put("/:id", checkUser, userController.updateUser);
router.delete("/:id", checkUser, userController.deleteUser);

// upload
router.post("/upload", checkUser, multer, userController.uploadProfil);

module.exports = router;
