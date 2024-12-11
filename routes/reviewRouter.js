const express = require("express");
const reviewController = require("../controllers/reviewController");
const router = express.Router();

// 리뷰 관련 라우터 설정

router.post("/", reviewController.createReview)
router.get("/:coffeechat_id/:mentee_id", reviewController.getReview)
router.put("/:coffeechat_id/:mentee_id",reviewController.updateReview)
router.delete("/:coffeechat_id/:mentee_id",reviewController.deleteReview)
module.exports = router;
