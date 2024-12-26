const express = require("express");
const mentorController = require("../controllers/mentorController");
const router = express.Router();

//멘토 로그인 관련 라우터 설정
router.post("/", mentorController.loginMentorUser);
router.get("/accesstoken", mentorController.mentorAccessToken);
router.get("/refreshtoken", mentorController.mentorRefreshToken);
router.get("/success", mentorController.mentorLoginSuccess);

module.exports = router;
