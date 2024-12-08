const express = require("express");
const mentorController = require("../controllers/mentorController");
const router = express.Router();

//멘토 정보 관련 라우터 설정
router.get("/", mentorController.getAllMentorUser);
router.get("/:id", mentorController.getMentorUserById);
router.post("/", mentorController.createMentorUser);
router.put("/:id", mentorController.updateMentorUser);
router.delete("/:id", mentorController.deleteMentorUser);

module.exports = router;
