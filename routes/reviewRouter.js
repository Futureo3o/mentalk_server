const express = require("express");
const reviewController = require("../controllers/reviewController");
const router = express.Router();

// 리뷰 관련 라우터 설정

router.post("/:mentee_id", reviewController.createReview)
router.get("/:mentee_id", reviewController.getReview)
module.exports = router;
