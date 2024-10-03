const express = require("express");
const { login, logout, myProfile, register } = require("../controller/user.controller")

const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/me", myProfile);
router.post("/register", register);

module.exports = router;