const express = require("express");
const reviewController = require("../controllers/reviewController");
const router = express.Router();

// 리뷰 관련 라우터 설정

// /review/*
//멘티 관련
//생성
router.post("/:coffeechat_id/:mentee_id", reviewController.createReview); // 리뷰 생성
//멘토아이디 조회
router.get('/mentor/:mentor_id', reviewController.getReviewByMentor);
//멘티아이디 조회
router.get("/mentee/:mentee_id",reviewController.getReviewByMentee);
//멘토소개페이지아이디 조회
router.get("/introduce/:introduce_id",reviewController.getReviewByIntroduce);
//리뷰 수정
router.put("/:review_id",reviewController.updateReview);
//리뷰삭제
router.delete("/:review_id",reviewController.deleteReview);
module.exports = router;
