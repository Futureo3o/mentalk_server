const express = require("express");
const mentorController = require("../controllers/mentorController");
const router = express.Router();

//멘토 정보 관련 라우터 설정
router.get("/", mentorController.getAllMentorUser);
router.get("/:mentor_id", mentorController.getMentorUserById);
router.put("/:mentor_id", mentorController.upload, mentorController.updateMentorUser);
router.delete("/:mentor_id", mentorController.deleteMentorUser);

module.exports = router;
