const express = require("express");
const reviewController = require("../controllers/reviewController");
const router = express.Router();

// 리뷰 관련 라우터 설정

// /review/*
//멘티 관련
router.post("/:coffeechat_id/:mentee_id", reviewController.createReview);

//멘토 관련
router.get("/introducereview/:introduce_id", reviewController.getReview_mentor_All);
router.get("/:mentee_id",reviewController.getReview_mentee_All);

router.get("/:coffeechat_id/:mentee_id", reviewController.getReview);
router.put("/:coffeechat_id/:mentee_id",reviewController.updateReview);
router.delete("/:coffeechat_id/:mentee_id",reviewController.deleteReview);
// delete("/:review_id")

module.exports = router;
