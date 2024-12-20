const express = require("express");
const mentorIntroduceController = require("../controllers/mentorIntroduceController");
const router = express.Router();

// 멘토 자기소개 정보 관련 라우터 설정

router.get("/:mentor_id", mentorIntroduceController.getMentorIntroduce)
router.get("/",mentorIntroduceController.getMentorIntroduceList)
router.post("/:mentor_id",mentorIntroduceController.postMentorIntroduce)
router.put("/:mentor_id",mentorIntroduceController.updateMentorIntroduce)
module.exports = router;
