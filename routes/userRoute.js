

const express = require('express');
const router = express.Router();
const {getAlluser, signup, login} = require("../controllers/userController");

router.post("/userSignup",signup)
router.get("/allUser",getAlluser);
router.post("/userLogin",login)

module.exports = router;