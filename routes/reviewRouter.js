const express = require("express");
const reviewController = require("../controllers/reviewController");
const router = express.Router();

// 리뷰 관련 라우터 설정

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Review API
 */

/**
 * @swagger
 * /review/{coffeechat_id}/{mentee_id}:
 *   post:
 *     summary: "리뷰 생성"
 *     description: "멘토와 멘티 사이의 커피챗에 대한 리뷰를 생성합니다."
 *     tags:
 *       - Review
 *     parameters:
 *       - name: coffeechat_id
 *         in: path
 *         required: true
 *         description: "커피챗의 고유 ID (MongoDB ObjectId 형식)"
 *         schema:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"  
 *       - name: mentee_id
 *         in: path
 *         required: true
 *         description: "멘티의 고유 ID"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               review_content:
 *                 type: string
 *                 description: "리뷰 내용"
 *               review_rating:
 *                 type: number
 *                 description: "리뷰 평점 (1~5)"
 *             required:
 *               - review_content
 *               - review_rating
 *     responses:
 *       200:
 *         description: "리뷰 생성 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "리뷰가 성공적으로 작성되었습니다."
 *                 review_content:
 *                   type: string
 *                   example: "매우 유익한 커피챗이었습니다!"
 *                 review_rating:
 *                   type: number
 *                   example: 5
 *                 mentee_id:
 *                   type: string
 *                   example: "mentee123"
 *                 coffeechat_id:
 *                   type: string
 *                   example: "60c72b2f9c6d2400172a91d4"  
 *       400:
 *         description: "잘못된 요청 (리뷰 내용과 평점 필수)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "리뷰 콘텐츠와 평점은 반드시 입력해야 합니다."
 *       404:
 *         description: "커피챗 또는 멘티를 찾을 수 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "커피챗을 찾을 수 없습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 오류가 발생했습니다."
 */
router.post("/:coffeechat_id/:mentee_id", reviewController.createReview); // 리뷰 생성

/**
 * @swagger
 * /review/mentor/{mentor_id}:
 *   get:
 *     summary: "멘토에 대한 리뷰 조회"
 *     description: "주어진 멘토 ID로 해당 멘토의 리뷰 목록을 조회합니다."
 *     tags:
 *       - Review
 *     parameters:
 *       - name: mentor_id
 *         in: path
 *         required: true
 *         description: "멘토의 고유 ID (string 타입)"
 *         schema:
 *           type: string
 *           description: "멘토 아이디는 문자열로 입력됩니다."
 *     responses:
 *       200:
 *         description: "멘토에 대한 리뷰 목록 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "멘토에 대한 모든 리뷰를 조회했습니다."
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       review_id:
 *                         type: string
 *                         description: "리뷰 고유 ID"
 *                       review_content:
 *                         type: string
 *                         description: "리뷰 내용"
 *                       review_rating:
 *                         type: number
 *                         description: "리뷰 평점 (1~5)"
 *         example:
 *           message: "멘토에 대한 모든 리뷰를 조회했습니다."
 *           reviews:
 *             - review_id: "60c72b2f9c6d2400172a91d4"
 *               review_content: "매우 유익한 커피챗이었습니다!"
 *               review_rating: 5
 *             - review_id: "60c72b2f9c6d2400172a91d5"
 *               review_content: "조금 더 많은 예시가 필요했어요."
 *               review_rating: 3
 *       404:
 *         description: "이 멘토에 대한 리뷰가 없습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이 멘토에 대한 리뷰가 없습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 오류가 발생했습니다."
 */

router.get('/mentor/:mentor_id', reviewController.getReviewByMentor);
/**
 * @swagger
 * /review/mentee/{mentee_id}:
 *   get:
 *     summary: "멘티에 대한 리뷰 조회"
 *     description: "주어진 멘티 ID로 해당 멘티의 리뷰 목록을 조회합니다."
 *     tags:
 *       - Review
 *     parameters:
 *       - name: mentee_id
 *         in: path
 *         required: true
 *         description: "멘티의 고유 ID (string 타입)"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "멘티에 대한 리뷰 목록 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "멘티에 대한 모든 리뷰를 조회했습니다."
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       review_id:
 *                         type: string
 *                         description: "리뷰 고유 ID"
 *                       review_content:
 *                         type: string
 *                         description: "리뷰 내용"
 *                       review_rating:
 *                         type: number
 *                         description: "리뷰 평점 (1~5)"
 *         example:
 *           message: "멘티에 대한 모든 리뷰를 조회했습니다."
 *           reviews:
 *             - review_id: "60c72b2f9c6d2400172a91d4"
 *               review_content: "정말 훌륭한 멘티였습니다!"
 *               review_rating: 5
 *             - review_id: "60c72b2f9c6d2400172a91d5"
 *               review_content: "멘티가 성실했으나 조금 더 참여가 필요했습니다."
 *               review_rating: 3
 *       404:
 *         description: "이 멘티에 대한 리뷰가 없습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이 멘티에 대한 리뷰가 없습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 오류가 발생했습니다."
 */

router.get("/mentee/:mentee_id",reviewController.getReviewByMentee);
/**
 * @swagger
 * /review/introduce/{introduce_id}:
 *   get:
 *     summary: "멘토 소개 페이지에 대한 리뷰 조회"
 *     description: "주어진 멘토 소개 페이지 ID로 해당 페이지에 대한 리뷰 목록을 조회합니다."
 *     tags:
 *       - Review
 *     parameters:
 *       - name: introduce_id
 *         in: path
 *         required: true
 *         description: "멘토 소개 페이지의 고유 ID (ObjectId 타입)"
 *         schema:
 *           type: string
 *           format: objectid
 *     responses:
 *       200:
 *         description: "멘토 소개 페이지에 대한 리뷰 목록 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "자기소개 페이지에 대한 모든 리뷰를 조회했습니다."
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       review_id:
 *                         type: string
 *                         description: "리뷰 고유 ID"
 *                       review_content:
 *                         type: string
 *                         description: "리뷰 내용"
 *                       review_rating:
 *                         type: number
 *                         description: "리뷰 평점 (1~5)"
 *         example:
 *           message: "자기소개 페이지에 대한 모든 리뷰를 조회했습니다."
 *           reviews:
 *             - review_id: "60c72b2f9c6d2400172a91d4"
 *               review_content: "멘토의 소개가 매우 유익했습니다."
 *               review_rating: 5
 *             - review_id: "60c72b2f9c6d2400172a91d5"
 *               review_content: "자기소개가 조금 더 구체적이면 좋겠어요."
 *               review_rating: 3
 *       404:
 *         description: "이 자기소개 페이지에 대한 리뷰가 없습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이 자기소개 페이지에 대한 리뷰가 없습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 오류가 발생했습니다."
 */

router.get("/introduce/:introduce_id",reviewController.getReviewByIntroduce);
/**
 * @swagger
 * /review/{review_id}:
 *   put:
 *     summary: "리뷰 수정"
 *     description: "기존에 작성된 리뷰를 수정합니다."
 *     tags:
 *       - Review
 *     parameters:
 *       - name: review_id
 *         in: path
 *         required: true
 *         description: "수정할 리뷰의 고유 ID (ObjectId)"
 *         schema:
 *           type: string
 *           format: objectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               review_content:
 *                 type: string
 *                 description: "수정된 리뷰 내용"
 *               review_rating:
 *                 type: number
 *                 description: "수정된 리뷰 평점 (1~5)"
 *             required:
 *               - review_content
 *               - review_rating
 *     responses:
 *       200:
 *         description: "리뷰 수정 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "리뷰가 성공적으로 수정되었습니다."
 *                 review_id:
 *                   type: string
 *                   format: objectId
 *                   example: "60b8f5f16c8b9c001c8f10d4"
 *                 review_content:
 *                   type: string
 *                   example: "매우 유익한 커피챗이었습니다!"
 *                 review_rating:
 *                   type: number
 *                   example: 5
 *       400:
 *         description: "잘못된 요청 (리뷰 내용 및 평점 필수)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "리뷰 콘텐츠와 평점은 반드시 입력해야 합니다."
 *       404:
 *         description: "리뷰를 찾을 수 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "리뷰를 찾을 수 없습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 오류가 발생했습니다."
 */


router.put("/:review_id",reviewController.updateReview);
/**
 * @swagger
 * /review/{review_id}:
 *   delete:
 *     summary: "리뷰 삭제"
 *     description: "주어진 리뷰 ID에 해당하는 리뷰를 삭제합니다."
 *     tags:
 *       - Review
 *     parameters:
 *       - name: review_id
 *         in: path
 *         required: true
 *         description: "삭제할 리뷰의 고유 ID (ObjectId)"
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       200:
 *         description: "리뷰 삭제 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "리뷰가 성공적으로 삭제되었습니다."
 *       404:
 *         description: "리뷰를 찾을 수 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "리뷰를 찾을 수 없습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 오류가 발생했습니다."
 */

router.delete("/:review_id",reviewController.deleteReview);
module.exports = router;
