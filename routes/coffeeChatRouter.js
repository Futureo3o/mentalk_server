const express = require("express");
const coffeeChatController = require("../controllers/coffeeChatController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: coffeeChat
 *  description: CoffeeChat API
 */

/**
 * @swagger
 * /coffeechat:
 *  post:
 *    summary: 새로운 커피챗을 생성합니다.
 *    description: 새로운 커피챗 요청을 생성합니다.
 *    tags:
 *      - coffeeChat
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              introduce_id:
 *                type: string
 *                description: 커피챗 소개 ID (필수)
 *              mentor_id:
 *                type: string
 *                description: 멘토의 고유 ID (필수)
 *              mentee_id:
 *                type: string
 *                description: 멘티의 고유 ID (필수)
 *              coffee_request:
 *                type: string
 *                description: 커피챗 요청 내용 (필수)
 *              coffee_wanted:
 *                type: array
 *                items:
 *                  type: string
 *                description: 멘토가 제공할 커피챗 원하는 내용들 (필수)
 *    responses:
 *      201:
 *        description: 커피챗 생성 성공
 *      400:
 *        description: 잘못된 요청입니다. 필수 정보를 확인하세요.
 *      500:
 *        description: 커피챗 생성 중 오류가 발생했습니다.
 */
router.post("/", coffeeChatController.createCoffeeChat);

/**
 * @swagger
 * /coffeechat:
 *  get:
 *    summary: 모든 커피챗을 조회합니다.
 *    description: 생성된 모든 커피챗 목록을 조회합니다.
 *    tags:
 *      - coffeeChat
 *    responses:
 *      200:
 *        description: 커피챗 목록 조회 성공
 *      500:
 *        description: 커피챗 조회 중 오류가 발생했습니다.
 */
router.get("/", coffeeChatController.getAllCoffeeChat);

/**
 * @swagger
 * /coffeechat/introduce/{introduce_id}:
 *  get:
 *    summary: 특정 커피챗을 조회합니다.
 *    description: 특정 `introduce_id`를 가진 커피챗을 조회합니다.
 *    tags:
 *      - coffeeChat
 *    parameters:
 *      - name: introduce_id
 *        in: path
 *        description: 조회할 커피챗의 소개 ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: 특정 커피챗 조회 성공
 *      404:
 *        description: 해당 커피챗이 존재하지 않습니다.
 *      500:
 *        description: 커피챗 조회 중 오류가 발생했습니다.
 */
router.get("/introduce/:introduce_id", coffeeChatController.getCoffeeChatById);

/**
 * @swagger
 * /coffeechat/mentor/{mentor_id}:
 *  get:
 *    summary: 멘토 id로 커피챗을 조회합니다.
 *    description: 특정 `mentor_id`를 가진 커피챗을 조회합니다.
 *    tags:
 *      - coffeeChat
 *    parameters:
 *      - name: mentor_id
 *        in: path
 *        description: 조회할 커피챗의 소개 ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: 특정 커피챗 조회 성공
 *      404:
 *        description: 해당 커피챗이 존재하지 않습니다.
 *      500:
 *        description: 커피챗 조회 중 오류가 발생했습니다.
 */
router.get("/mentor/:mentor_id", coffeeChatController.getAllCoffeeChatByMentorID);

/**
 * @swagger
 * /coffeechat/mentee/{mentee_id}:
 *  get:
 *    summary: 멘티 id로 커피챗을 조회합니다.
 *    description: 특정 `mentee_id`를 가진 커피챗을 조회합니다.
 *    tags:
 *      - coffeeChat
 *    parameters:
 *      - name: mentee_id
 *        in: path
 *        description: 조회할 커피챗의 멘티 ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: 특정 멘티의 커피챗 조회 성공
 *      404:
 *        description: 해당 커피챗이 존재하지 않습니다.
 *      500:
 *        description: 커피챗 조회 중 오류가 발생했습니다.
 */
router.get("/mentee/:mentee_id",coffeeChatController.getAllCoffeeChatByMenteeID);
/**
 * @swagger
 * /coffeechat/{introduce_id}:
 *  put:
 *    summary: 커피챗을 수정합니다.
 *    description: 특정 `introduce_id`를 가진 커피챗을 수정합니다.
 *    tags:
 *      - coffeeChat
 *    parameters:
 *      - name: introduce_id
 *        in: path
 *        description: 수정할 커피챗의 소개 ID
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              coffee_completed:
 *                type: string
 *                description: 커피챗 완료 시간
 *              coffee_status:
 *                type: string
 *                description: 커피챗 상태 (ex)'신청', '진행중', '완료', '취소소')
 *              coffee_cancle:
 *                type: string
 *                description: 커피챗 취소 사유 (선택)
 *    responses:
 *      200:
 *        description: 커피챗 수정 성공
 *      400:
 *        description: 잘못된 요청입니다. 필수 정보를 확인하세요.
 *      404:
 *        description: 해당 커피챗을 찾을 수 없습니다.
 *      500:
 *        description: 커피챗 수정 중 오류가 발생했습니다.
 */
router.put("/:_id", coffeeChatController.updateCoffeeChat);

module.exports = router;
