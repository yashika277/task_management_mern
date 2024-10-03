const express = require("express");
const { login, logout, myProfile, register } = require("../controller/user.controller")
const {isAuthenticated} =require("../middlewares/auth")

const router = express.Router();

router.post("/login", login);
router.get("/logout",isAuthenticated, logout);
router.get("/me",isAuthenticated, myProfile);
router.post("/register", register);

module.exports = router;