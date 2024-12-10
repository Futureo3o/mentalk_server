const express = require("express");
const mentorIntroduceController = require("../controllers/mentorIntroduceController");
const router = express.Router();

// 멘토 자기소개 정보 관련 라우터 설정

router.get("/:mentor_id", mentorIntroduceController.getMentorIntroduce)

router.post("/", mentorIntroduceController.createUser)

module.exports = router;
