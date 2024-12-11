const express = require("express");
const menteeController = require("../controllers/menteeController");
const router = express.Router();

router.post("/mentee", menteeController.createMenteeUser);

module.exports = router;
