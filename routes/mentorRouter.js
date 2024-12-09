const express = require("express");
const mentorController = require("../controllers/mentorController");
const router = express.Router();

//멘토 회원가입 정보 관련 라우터 설정
router.post("/signup", mentorController.createMentorUser);
router.get("/", mentorController.getAllMentorUser);
router.get("/:id", mentorController.getMentorUserById);
router.put("/:id", mentorController.updateMentorUser);
router.delete("/:id", mentorController.deleteMentorUser);

module.exports = router;
