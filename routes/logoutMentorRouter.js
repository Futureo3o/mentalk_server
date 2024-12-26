const express = require("express");
const mentorController = require("../controllers/mentorController");
const router = express.Router();

//멘토 로그아웃 관련 라우터 설정
router.post("/", mentorController.mentorLogout);

module.exports = router;
