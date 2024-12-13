const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   - name: users
//  *     description: 유저 관련 API
//  */

// /**
//  * @swagger
//  * /users:
//  *   get:
//  *     summary: 모든 유저 목록을 조회합니다.
//  *     description: 모든 유저 데이터를 반환합니다.
//  *     tags:
//  *       - users
//  *     responses:
//  *       200:
//  *         description: 유저 목록 조회 성공
//  *       500:
//  *         description: 서버 오류
//  */
router.get("/", userController.getAllUsers);

// /**
//  * @swagger
//  * /users/{id}:
//  *   get:
//  *     summary: 특정 유저를 조회합니다.
//  *     description: 특정 ID를 가진 유저 데이터를 반환합니다.
//  *     tags:
//  *       - users
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: 유저의 ID
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: 유저 조회 성공
//  *       404:
//  *         description: 유저를 찾을 수 없음
//  *       500:
//  *         description: 서버 오류
//  */
router.get("/:id", userController.getUserById);

// /**
//  * @swagger
//  * /users:
//  *   post:
//  *     summary: 유저를 생성합니다.
//  *     description: 새로운 유저를 생성하고 그 정보를 반환합니다.
//  *     tags:
//  *       - users
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               age:
//  *                 type: integer
//  *     responses:
//  *       201:
//  *         description: 유저 생성 성공
//  *       500:
//  *         description: 서버 오류
//  */
router.post("/", userController.createUser);

// /**
//  * @swagger
//  * /users/{id}:
//  *   put:
//  *     summary: 유저 정보를 수정합니다.
//  *     description: 특정 ID의 유저 정보를 수정하고 업데이트된 데이터를 반환합니다.
//  *     tags:
//  *       - users
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: 유저의 ID
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               age:
//  *                 type: integer
//  *     responses:
//  *       200:
//  *         description: 유저 수정 성공
//  *       404:
//  *         description: 유저를 찾을 수 없음
//  *       500:
//  *         description: 서버 오류
//  */
router.put("/:id", userController.updateUser);

// /**
//  * @swagger
//  * /users/{id}:
//  *   delete:
//  *     summary: 유저를 삭제합니다.
//  *     description: 특정 ID를 가진 유저를 삭제합니다.
//  *     tags:
//  *       - users
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: 유저의 ID
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: 유저 삭제 성공
//  *       404:
//  *         description: 유저를 찾을 수 없음
//  *       500:
//  *         description: 서버 오류
//  */
router.delete("/:id", userController.deleteUser);

module.exports = router;
