const express = require("express");
const menteeController = require("../controllers/menteeController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: mentee
 *  description: Mentee API
 */

/**
 * @swagger
 * /signup/mentee:
 *   post:
 *     summary: 새로운 멘티를 생성합니다.
 *     description: 새로운 멘티 사용자 정보를 생성합니다. 모든 필수 정보(멘티 ID, 비밀번호, 이메일, 전화번호, 성별 등)가 포함되어야 합니다.
 *     tags:
 *       - mentee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentee_id:
 *                 type: string
 *                 description: 멘티의 고유 ID (필수)
 *               mentee_pw:
 *                 type: string
 *                 description: 멘티의 비밀번호 (필수)
 *               mentee_email:
 *                 type: string
 *                 description: 멘티의 이메일 주소 (필수)
 *               mentee_phone:
 *                 type: number
 *                 description: 멘티의 전화번호 (필수)
 *               mentee_nickname:
 *                 type: string
 *                 description: 멘티의 닉네임 (필수)
 *               mentee_position:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 멘티의 직책 목록 (필수)
 *               mentee_img:
 *                 type: string
 *                 description: 멘티의 이미지 URL (선택 사항)
 *               mentee_social_login:
 *                 type: boolean
 *                 description: 소셜 로그인 여부
 *                 default: false
 *               mentee_gender:
 *                 type: string
 *                 description: 멘티의 성별 (필수)
 *               mentee_warnning_count:
 *                 type: number
 *                 description: 경고 횟수
 *                 default: 0
 *               mentee_favorite_count:
 *                 type: number
 *                 description: 즐겨찾기 횟수
 *                 default: 0
 *               mentee_suspension:
 *                 type: boolean
 *                 description: 정지 상태 여부
 *                 default: false
 *     responses:
 *       201:
 *         description: 멘티 생성 성공
 *       400:
 *         description: 잘못된 요청입니다. 필수 정보를 확인하세요.
 *       500:
 *         description: 멘티 생성 중 오류가 발생했습니다.
 */
router.post("/", menteeController.createMenteeUser);

module.exports = router;
