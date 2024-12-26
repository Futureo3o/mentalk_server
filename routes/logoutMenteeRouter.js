const express = require("express");
const menteeController = require("../controllers/menteeController");
const router = express.Router();

//멘티 로그아웃 관련 라우팅 설정
router.post("/", menteeController.menteeLogout);

module.exports = router;
