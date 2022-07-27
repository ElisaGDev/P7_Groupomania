const express = require("express");
const router = express.Router();

const authCtrl = require("../middleware/auth.middleware");

router.get("/*", authCtrl.checkUser);
router.patch("/*", authCtrl.checkUser);
router.put("/*", authCtrl.checkUser);
router.post("/*", authCtrl.checkUser);
router.delete("/*", authCtrl.checkUser);

module.exports = router;
