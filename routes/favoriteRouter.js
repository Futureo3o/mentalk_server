const express = require("express");
const favoriteController = require("../controllers/favoriteController");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Favorite
 *     description: "멘토 즐겨찾기(북마크) API"
 */
/**
 * @swagger
 * /favorite/{mentor_id}:
 *   post:
 *     summary: "멘토 즐겨찾기 추가"
 *     description: "주어진 멘토 ID로 해당 멘토를 즐겨찾기에 추가하고, 멘토의 즐겨찾기 카운트를 증가시킵니다."
 *     tags:
 *       - Favorite
 *     parameters:
 *       - name: mentor_id
 *         in: path
 *         required: true
 *         description: "즐겨찾기 할 멘토의 고유 ID"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentee_id:
 *                 type: string
 *                 description: "멘티의 고유 ID (즐겨찾기하는 멘티)"
 *                 example: "String"
 *     responses:
 *       200:
 *         description: "멘토 자기소개 페이지가 즐겨찾기에 추가되었으며, 멘토의 즐겨찾기 카운트가 증가했습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "멘토 자기소개 페이지가 즐겨찾기에 추가되었습니다."
 *                 mentor_id:
 *                   type: string
 *                   example: "mentor123"
 *                 mentee_id:
 *                   type: string
 *                   example: "mentee456"
 *                 favorite_count:
 *                   type: integer
 *                   example: 101  # 멘토의 즐겨찾기 카운트 (예시)
 *       400:
 *         description: "잘못된 요청 (이미 즐겨찾기 추가된 멘토)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "이미 즐겨찾기에 추가된 멘토입니다."
 *                 message:
 *                   type: string
 *                   example: "해당 멘토는 이미 즐겨찾기 리스트에 있습니다."
 *       404:
 *         description: "멘토를 찾을 수 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "멘토를 찾을 수 없습니다."
 *                 message:
 *                   type: string
 *                   example: "해당 멘토는 존재하지 않습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "서버 오류"
 *                 message:
 *                   type: string
 *                   example: "즐겨찾기 추가 중 오류가 발생했습니다."
 */


router.post('/:mentor_id', favoriteController.addFavorite);

/**
 * @swagger
 * /favorite/{mentee_id}:
 *   get:
 *     summary: "멘티의 즐겨찾기 목록 조회"
 *     description: "주어진 멘티 ID로 해당 멘티의 즐겨찾기한 멘토 목록을 조회합니다."
 *     tags:
 *       - Favorite
 *     parameters:
 *       - name: mentee_id
 *         in: path
 *         required: true
 *         description: "멘티의 고유 ID"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "멘티의 즐겨찾기 목록 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "멘토의 즐겨찾기 목록을 조회했습니다."
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       mentor_id:
 *                         type: string
 *                         description: "멘토의 고유 ID"
 *                       mentor_name:
 *                         type: string
 *                         description: "멘토의 이름"
 *                       mentor_title:
 *                         type: string
 *                         description: "멘토의 직책 또는 타이틀"
 *                       mentor_content:
 *                         type: string
 *                         description: "멘토의 자기소개"
 *                       mentor_rating:
 *                         type: number
 *                         description: "멘토의 평점"
 *                         format: float
 *                       mentor_email:
 *                         type: string
 *                         description: "멘토의 이메일"
 *                       mentor_phone:
 *                         type: string
 *                         description: "멘토의 전화번호"
 *                       mentor_nickname:
 *                         type: string
 *                         description: "멘토의 닉네임"
 *                       mentor_company:
 *                         type: string
 *                         description: "멘토의 회사명"
 *                       mentor_category:
 *                         type: string
 *                         description: "멘토의 전문 분야"
 *                       mentor_position:
 *                         type: string
 *                         description: "멘토의 직위"
 *                       mentor_img:
 *                         type: string
 *                         description: "멘토의 이미지 URL"
 *                       mentor_paper_img:
 *                         type: string
 *                         description: "멘토의 논문 이미지 URL"
 *                       mentor_career:
 *                         type: string
 *                         description: "멘토의 경력"
 *                       mentor_is_checked:
 *                         type: boolean
 *                         description: "멘토의 체크 상태"
 *                       mentor_warnning_count:
 *                         type: integer
 *                         description: "멘토의 경고 횟수"
 *                       mentor_favorite_count:
 *                         type: integer
 *                         description: "멘토의 즐겨찾기 횟수"
 *                       mentor_suspension:
 *                         type: boolean
 *                         description: "멘토의 정지 여부"
 *                 example:
 *                   message: "멘토의 즐겨찾기 목록을 조회했습니다."
 *                   favorites:
 *                     - mentor_id: "mentor123"
 *                       mentor_name: "김철수"
 *                       mentor_title: "데이터 분석 전문가"
 *                       mentor_content: "저는 데이터 분석과 머신러닝 분야에서 10년 이상의 경험을 가지고 있습니다."
 *                       mentor_rating: 4.5
 *                       mentor_email: "kim@example.com"
 *                       mentor_phone: "010-1234-5678"
 *                       mentor_nickname: "철수"
 *                       mentor_company: "XYZ 데이터"
 *                       mentor_category: "데이터 분석"
 *                       mentor_position: "시니어 데이터 분석가"
 *                       mentor_img: "http://example.com/kim.jpg"
 *                       mentor_paper_img: "http://example.com/kim_paper.jpg"
 *                       mentor_career: "10년 이상의 경력"
 *                       mentor_is_checked: true
 *                       mentor_warnning_count: 0
 *                       mentor_favorite_count: 150
 *                       mentor_suspension: false
 *                     - mentor_id: "mentor456"
 *                       mentor_name: "이영희"
 *                       mentor_title: "소프트웨어 개발자"
 *                       mentor_content: "프로그래밍과 시스템 디자인에 강점을 가지고 있습니다."
 *                       mentor_rating: 4.7
 *                       mentor_email: "lee@example.com"
 *                       mentor_phone: "010-9876-5432"
 *                       mentor_nickname: "영희"
 *                       mentor_company: "ABC 소프트"
 *                       mentor_category: "소프트웨어 개발"
 *                       mentor_position: "시니어 개발자"
 *                       mentor_img: "http://example.com/lee.jpg"
 *                       mentor_paper_img: "http://example.com/lee_paper.jpg"
 *                       mentor_career: "8년 이상의 경력"
 *                       mentor_is_checked: true
 *                       mentor_warnning_count: 0
 *                       mentor_favorite_count: 120
 *                       mentor_suspension: false
 *       404:
 *         description: "멘티를 찾을 수 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이 멘티는 아직 즐겨찾기를 하지 않았습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "즐겨찾기 목록 조회 중 오류가 발생했습니다."
 */


router.get('/:mentee_id', favoriteController.getFavorites);

/**
 * @swagger
 * /favorite/{mentor_id}/{mentee_id}:
 *   get:
 *     summary: "멘토와 멘티의 즐겨찾기 여부 확인"
 *     description: "주어진 멘토 ID와 멘티 ID에 대해 해당 멘토가 멘티의 즐겨찾기 목록에 있는지 확인합니다."
 *     tags:
 *       - Favorite
 *     parameters:
 *       - name: mentor_id
 *         in: path
 *         required: true
 *         description: "즐겨찾기를 확인할 멘토의 고유 ID"
 *         schema:
 *           type: string
 *       - name: mentee_id
 *         in: path
 *         required: true
 *         description: "즐겨찾기 여부를 확인할 멘티의 고유 ID"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "즐겨찾기 여부 확인 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 check:
 *                   type: boolean
 *                   description: "즐겨찾기 여부 (true: 즐겨찾기 있음, false: 즐겨찾기 없음)"
 *                   example: true
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "즐겨찾기 조회 중 오류 발생"
 *                 error:
 *                   type: string
 *                   example: "error details here"
 */

router.get('/:mentor_id/:mentee_id',favoriteController.getFavoritescheck);
/**
 * @swagger
 * /favorite/{mentor_id}:
 *   delete:
 *     summary: "멘토 즐겨찾기 삭제"
 *     description: "주어진 멘토 ID와 멘티 ID로 해당 멘토를 즐겨찾기에서 삭제합니다."
 *     tags:
 *       - Favorite
 *     parameters:
 *       - name: mentor_id
 *         in: path
 *         required: true
 *         description: "즐겨찾기에서 삭제할 멘토의 고유 ID"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentee_id:
 *                 type: string
 *                 description: "멘티의 고유 ID"
 *                 example: "String"
 *     responses:
 *       200:
 *         description: "즐겨찾기 삭제 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "멘토가 즐겨찾기에서 제거되었습니다."
 *                 mentor_id:
 *                   type: string
 *                   example: "mentor123"
 *                 mentee_id:
 *                   type: string
 *                   example: "mentee123"
 *                 favorite_count:
 *                   type: integer
 *                   example: 149
 *       404:
 *         description: "즐겨찾기 항목을 찾을 수 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이 멘티는 해당 멘토를 즐겨찾기에 추가한 적이 없습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "즐겨찾기 삭제 중 오류가 발생했습니다."
 */


router.delete('/:mentor_id', favoriteController.removeFavorite);
module.exports = router;
