const express = require("express");
const mentorIntroController = require("../controllers/mentorIntroController");
const router = express.Router();

router.get("/", mentorIntroController.getMentorIntro)
router.post("/",mentorIntroController.createMentorIntro);

module.exports = router;
