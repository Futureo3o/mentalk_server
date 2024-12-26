const express = require("express");
const menteeController = require("../controllers/menteeController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: mentee
 *  description : Mentee API
 */

/**
 * @swagger
 * /mentee:
 *  get:
 *    summary: 모든 멘티 목록을 조회합니다.
 *    description: 데이터베이스에 저장된 모든 멘티 유저 정보를 반환합니다.
 *    tags:
 *      - mentee
 *    responses:
 *      200:
 *        description: 멘티 목록 조회 성공
 *      500:
 *        description: 멘티 목록 조회 중 오류가 발생했습니다.
 */
router.get("/", menteeController.getAllMenteeUser);

/**
 * @swagger
 * /mentee/{mentee_id}:
 *   get:
 *     summary: 특정 멘티를 조회합니다.
 *     description: 주어진 mentee_id에 해당하는 멘티 정보를 조회합니다.
 *     tags:
 *       - mentee
 *     parameters:
 *       - in: path
 *         name: mentee_id
 *         required: true
 *         description: 조회할 멘티의 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 멘티 조회 성공
 *       404:
 *         description: 해당 멘티를 찾을 수 없습니다.
 *       500:
 *         description: 멘티 조회 중 오류가 발생했습니다.
 */
router.get("/:mentee_id", menteeController.getMenteeUserById);

/**
 * @swagger
 * /mentee/{mentee_id}:
 *   put:
 *     summary: 특정 멘티의 정보를 수정합니다.
 *     description: 주어진 mentee_id를 기준으로 멘티의 정보를 업데이트합니다.
 *     tags:
 *       - mentee
 *     parameters:
 *       - in: path
 *         name: mentee_id
 *         required: true
 *         description: 수정할 멘티의 ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentee_img:
 *                 type: string
 *               mentee_nickname:
 *                 type: string
 *               mentee_position:
 *                 type: string
 *     responses:
 *       200:
 *         description: 멘티 수정 성공
 *       404:
 *         description: 해당 멘티를 찾을 수 없습니다.
 *       500:
 *         description: 멘티 수정 중 오류가 발생했습니다.
 */
router.put("/:mentee_id", menteeController.upload, menteeController.updateMenteeUserById);

/**
 * @swagger
 * /mentee/{mentee_id}:
 *   delete:
 *     summary: 특정 멘티를 삭제합니다.
 *     description: 주어진 mentee_id에 해당하는 멘티를 데이터베이스에서 삭제합니다.
 *     tags:
 *       - mentee
 *     parameters:
 *       - in: path
 *         name: mentee_id
 *         required: true
 *         description: 삭제할 멘티의 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 멘티 삭제 성공
 *       404:
 *         description: 해당 멘티를 찾을 수 없습니다.
 *       500:
 *         description: 멘티 삭제 중 오류가 발생했습니다.
 */
router.delete("/:mentee_id", menteeController.deleteMenteeUserById);

module.exports = router;
