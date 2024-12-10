const express = require("express");
const mentorController = require("../controllers/mentorController");
const router = express.Router();

//멘토 로그인 관련 라우터 설정
router.post("/", mentorController.loginMentorUser);
router.get("/", mentorController.mentorAccessToken);
router.get("/", mentorController.mentorRefreshToken);
router.get("/", mentorController.mentorLoginSuccess);
router.post("/", mentorController.mentorLogout);

module.exports = router;
