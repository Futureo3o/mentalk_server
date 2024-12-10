const express = require("express");
const menteeController = require("../controllers/menteeController");
const router = express.Router();

//멘티 로그인 관련 라우터 설정
router.post("/", menteeController.loginMenteeUser);
router.get("/", menteeController.menteeAccessToken);
router.get("/", menteeController.menteeRefreshToken);
router.get("/", menteeController.menteeLoginSuccess);
router.post("/", menteeController.menteeLogout);

module.exports = router;
