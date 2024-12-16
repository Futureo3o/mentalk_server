const express = require("express");
const mentorController = require("../controllers/mentorController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: mentor
 *  description : Mentor API
 */

/**
 * @swagger
 * /signup/mentor:
 *  post:
 *    summary: 새로운 멘토를 생성합니다.
 *    description : 새로운 멘토 사용자 정보를 생성합니다.
 *    tags:
 *      - mentor
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              mentor_id:
 *                type: string
 *                description: 멘토의 고유 ID (필수)
 *              mentor_pw:
 *                type: string
 *                description:  멘토의 비밀번호 (필수)
 *              mentor_email:
 *                type: string
 *                description: 멘토의 이메일 주소 (필수)
 *              mentor_phone:
 *                type: number
 *                description: 멘토의 전화번호 (필수)
 *              mentor_nickname:
 *                type: string
 *                description: 멘토의 닉네임 (필수)
 *              mentor_company:
 *                type: string
 *                description: 멘토가 소속된 회사명
 *              mentor_category:
 *                type: string
 *                description: 멘토 IT 분야
 *              mentor_position:
 *                type: string
 *                description: 멘토 직무 (ex:프론트 개발자, 백엔드 개발자)
 *              mentor_career:
 *                type: string
 *                description: 멘토 경력 (ex:1년차, 2년차, 3년차차)
 *              mentor_gender:
 *                type: string
 *                description: 멘토 성별
 *    responses:
 *      201:
 *        description: 멘토 생성 성공
 *      400:
 *        description: 잘못된 요청입니다. 필수 정보를 확인하세요.
 *      500:
 *        description: 멘티 생성 중 오류가 발생했습니다.
 */
router.post("/", mentorController.createMentorUser);

module.exports = router;
