const express = require("express");
const mentorController = require("../controllers/mentorController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: mentor
 *   description: Mentors API
 */

/**
 * @swagger
 * /mentor:
 *   get:
 *     summary: 모든 멘토 목록을 조회합니다.
 *     description: 모든 멘토 데이터를 반환합니다.
 *     tags:
 *      - mentor
 *     responses:
 *       200:
 *         description: 멘토 목록 조회 성공
 *       500:
 *         description: 서버 오류
 */
router.get("/", mentorController.getAllMentorUser);

/**
 * @swagger
 * /mentor/{mentor_id}:
 *   get:
 *     summary: 특정 멘토를 조회합니다.
 *     description: 특정 ID를 가진 멘토 데이터를 반환합니다.
 *     tags:
 *      - mentor
 *     parameters:
 *       - name: mentor_id
 *         in: path
 *         required: true
 *         description: 멘토의 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 멘토 조회 성공
 *       404:
 *         description: 멘토를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.get("/:mentor_id", mentorController.getMentorUserById);

/**
 * @swagger
 * /mentor/{mentor_id}:
 *   put:
 *     summary: 멘토 정보를 수정합니다.
 *     description: 특정 ID의 멘토 정보를 수정하고 업데이트된 데이터를 반환합니다.
 *     tags:
 *      - mentor
 *     parameters:
 *       - name: mentor_id
 *         in: path
 *         required: true
 *         description: 멘토의 ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentor_nickname:
 *                 type: string
 *               mentor_company:
 *                 type: string
 *               mentor_category:
 *                 type: string
 *               mentor_position:
 *                 type: string
 *               mentor_img:
 *                 type: string
 *                 format: binary
 *               mentor_paper_img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: 멘토 수정 성공
 *       404:
 *         description: 멘토를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.put("/:mentor_id", mentorController.upload, mentorController.updateMentorUser);

/**
 * @swagger
 * /mentor/{mentor_id}:
 *   delete:
 *     summary: 멘토를 삭제합니다.
 *     description: 특정 ID를 가진 멘토를 삭제합니다.
 *     tags:
 *      - mentor
 *     parameters:
 *       - name: mentor_id
 *         in: path
 *         required: true
 *         description: 멘토의 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 멘토 삭제 성공
 *       404:
 *         description: 멘토를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.delete("/:mentor_id", mentorController.deleteMentorUser);

module.exports = router;
