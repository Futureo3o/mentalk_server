const express = require("express");
const menteeController = require("../controllers/menteeController");
const router = express.Router();

router.post("/", menteeController.createMenteeUser);

module.exports = router;
