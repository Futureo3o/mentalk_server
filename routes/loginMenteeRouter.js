const express = require("express");
const menteeController = require("../controllers/menteeController");
const router = express.Router();

//멘티 로그인 관련 라우터 설정
router.post("/", menteeController.loginMenteeUser);
router.get("/accesstoken", menteeController.menteeAccessToken);
router.get("/refreshtoken", menteeController.menteeRefreshToken);
router.get("/success", menteeController.menteeLoginSuccess);

module.exports = router;
