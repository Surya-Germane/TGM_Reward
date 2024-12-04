const express = require("express");
const { register, login } = require("../controllers/badgeController");

const router = express.Router();


router.get("/", login);

module.exports = router;
