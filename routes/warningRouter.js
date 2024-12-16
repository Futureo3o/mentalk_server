const express = require("express");
const router = express.Router();
const warningController = require("../controllers/warningController");

/**
 * @swagger
 * tags:
 *  name: warning
 *  description : Mentor && Mentee Warning API
 */

/**
 * @swagger
 * /warning:
 *   post:
 *     summary: 경고 업데이트
 *     description: 멘토 또는 멘티에게 경고를 추가하는 API입니다.
 *     tags:
 *       - warning
 *     requestBody:
 *       description: 경고 사유를 포함한 요청 본문
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               warning_reason:
 *                 type: string
 *                 description: 경고의 사유
 *                 example: "비매너적인 행동"
 *     responses:
 *       200:
 *         description: 경고가 성공적으로 업데이트되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "경고 업데이트 성공"
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "mentor_123"
 *                     updatedCount:
 *                       type: number
 *                       example: 2
 *                     userData:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "홍길동"
 *                         email:
 *                           type: string
 *                           example: "hong@domain.com"
 *                         warningCount:
 *                           type: number
 *                           example: 2
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 멘토 또는 멘티를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.post("/", warningController.updateWarning);

module.exports = router;
