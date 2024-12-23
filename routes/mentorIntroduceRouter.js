const express = require("express");
const mentorIntroduceController = require("../controllers/mentorIntroduceController");
const router = express.Router();

// 멘토 자기소개 정보 관련 라우터 설정

/**
 * @swagger
 * tags:
 *   name: mentorIntroduce
 *   description: Mentor API
 */


/**
 * @swagger
 * /introduce:
 *   get:
 *     summary: "모든 멘토 자기 소개 페이지 리스트 조회"
 *     description: "모든 멘토의 자기 소개 페이지 목록을 조회합니다. 각 자기 소개 페이지에는 해당 멘토의 정보와 함께 멘토의 리뷰 수, 커피챗 수, 자기소개 평점도 포함됩니다."
 *     tags:
 *       - mentorIntroduce
 *     responses:
 *       200:
 *         description: "멘토 자기 소개 페이지 목록 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   mentor_id:
 *                     type: string
 *                     description: "멘토 아이디"
 *                   introduce_title:
 *                     type: string
 *                     description: "자기 소개 제목"
 *                   introduce_content:
 *                     type: string
 *                     description: "자기 소개 내용"
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: "멘토의 자기소개에 관련된 태그들"
 *                   review_count:
 *                     type: number
 *                     description: "멘토의 리뷰 수 (기본값: 0)"
 *                   coffeechat_count:
 *                     type: number
 *                     description: "멘토의 커피챗 수 (기본값: 0)"
 *                   introduce_rating:
 *                     type: number
 *                     description: "멘토 자기소개 평점 (기본값: 0)"
 *                   mentor:
 *                     type: object
 *                     description: "멘토 정보"
 *                     properties:
 *                       mentor_id:
 *                         type: string
 *                         description: "멘토 아이디"
 *                       mentor_nickname:
 *                         type: string
 *                         description: "멘토 닉네임"
 *             example:
 *               - mentor_id: "mentor123"
 *                 introduce_title: "안녕하세요, 저는 개발자 멘토입니다."
 *                 introduce_content: "저는 10년 경력의 풀스택 개발자로, 다양한 프로젝트 경험이 있습니다."
 *                 tags: ["개발", "풀스택", "멘토링"]
 *                 review_count: 5
 *                 coffeechat_count: 2
 *                 introduce_rating: 4.5
 *                 mentor:
 *                   mentor_id: "mentor123"
 *                   mentor_nickname: "개발자멘토"
 *               - mentor_id: "mentor456"
 *                 introduce_title: "경영 멘토 소개"
 *                 introduce_content: "경영 전략 및 리더십을 돕는 멘토입니다."
 *                 tags: ["경영", "리더십", "멘토링"]
 *                 review_count: 3
 *                 coffeechat_count: 1
 *                 introduce_rating: 4.0
 *                 mentor:
 *                   mentor_id: "mentor456"
 *                   mentor_nickname: "경영멘토"
 *       404:
 *         description: "자기 소개 페이지가 존재하지 않습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "자기 소개페이지가 존재하지 않습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 에러"
 */

router.get("/", mentorIntroduceController.getMentorIntroduceList);
/**
 * @swagger
 * /introduce/{mentor_id}:
 *   get:
 *     summary: "멘토 자기 소개 페이지 조회"
 *     description: "주어진 멘토 아이디로 멘토의 자기 소개 정보를 조회합니다. 만약 멘토의 자기 소개 정보가 없다면, 글 작성을 진행해달라는 메시지를 반환합니다."
 *     tags:
 *       - mentorIntroduce
 *     parameters:
 *       - name: mentor_id
 *         in: path
 *         required: true
 *         description: "조회할 멘토의 고유 ID"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "멘토 자기 소개 페이지 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mentor_introduce:
 *                   type: object
 *                   description: "멘토 자기 소개 정보"
 *                   properties:
 *                     mentor_id:
 *                       type: string
 *                       description: "멘토 아이디"
 *                     introduce_title:
 *                       type: string
 *                       description: "자기 소개 제목"
 *                     introduce_content:
 *                       type: string
 *                       description: "자기 소개 내용"
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: "멘토의 자기소개에 관련된 태그"
 *                     review_count:
 *                       type: number
 *                       description: "리뷰 수"
 *                     coffeechat_count:
 *                       type: number
 *                       description: "커피챗 횟수"
 *                     introduce_rating:
 *                       type: number
 *                       description: "멘토 소개 평점"
 *             example:
 *               mentor_introduce:
 *                 mentor_id: "mentor123"
 *                 introduce_title: "안녕하세요, 저는 개발자 멘토입니다."
 *                 introduce_content: "저는 10년 경력의 풀스택 개발자로, 다양한 프로젝트 경험이 있습니다."
 *                 tags: ["개발", "풀스택", "멘토링"]
 *                 review_count: 0
 *                 coffeechat_count: 0
 *                 introduce_rating: 0
 *       404:
 *         description: "멘토 정보가 없습니다. 글 작성을 진행해주세요."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: "에러 메시지"
 *                 message:
 *                   type: string
 *                   description: "자세한 오류 메시지"
 *             example:
 *               error: "멘토 아이디 조회 실패"
 *               message: "멘토 정보가 없습니다. 글 작성을 진행해주세요."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: "에러 메시지"
 *                 message:
 *                   type: string
 *                   description: "서버 오류 메시지"
 *             example:
 *               error: "Internal Server Error"
 *               message: "멘토포스팅 조회 중 오류가 발생했습니다."
 */


router.get("/:mentor_id", mentorIntroduceController.getMentorIntroduce);

/**
 * @swagger
 * /introduce/{mentor_id}:
 *   post:
 *     summary: "멘토 자기 소개 페이지 작성"
 *     description: "멘토의 자기 소개 페이지를 새로 작성합니다. 멘토 아이디와 함께 제목, 내용 등의 필수 정보가 포함되어야 하며, 만약 멘토 아이디가 존재하지 않으면 404 오류가 발생합니다."
 *     tags:
 *       - mentorIntroduce
 *     parameters:
 *       - name: mentor_id
 *         in: path
 *         required: true
 *         description: "멘토의 고유 ID"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               introduce_title:
 *                 type: string
 *                 description: "자기 소개 제목 (필수)"
 *               introduce_content:
 *                 type: string
 *                 description: "자기 소개 내용 (필수)"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "멘토 자기소개에 사용할 태그 (예: 기술 스택, 경력 등)"
 *             required:
 *               - introduce_title
 *               - introduce_content
 *     responses:
 *       201:
 *         description: "멘토 자기 소개 페이지 작성 완료"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "멘토 자기소개 페이지가 성공적으로 작성되었습니다."
 *                 mentor_id:
 *                   type: string
 *                   example: "mentor123"
 *                 introduce_title:
 *                   type: string
 *                   example: "안녕하세요, 저는 개발자 멘토입니다."
 *                 introduce_content:
 *                   type: string
 *                   example: "저는 10년 경력의 풀스택 개발자로, 다양한 프로젝트 경험이 있습니다."
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["개발", "풀스택", "멘토링"]
 *                 review_count:
 *                   type: number
 *                   example: 0
 *                 coffeechat_count:
 *                   type: number
 *                   example: 0
 *                 introduce_rating:
 *                   type: number
 *                   example: 0
 *       400:
 *         description: "모든 내용을 채워주세요 (제목과 내용 필수)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "모든 내용을 채워주세요"
 *                 message:
 *                   type: string
 *                   example: "멘토 소개 제목과 내용을 모두 입력해야 합니다."
 *       404:
 *         description: "멘토를 찾을 수 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "멘토 아이디 조회 실패"
 *                 message:
 *                   type: string
 *                   example: "해당 멘토 아이디에 해당하는 멘토가 존재하지 않습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 message:
 *                   type: string
 *                   example: "멘토 자기소개 페이지 작성 중 문제가 발생했습니다."
 */


router.post("/:mentor_id", mentorIntroduceController.postMentorIntroduce);

/**
 * @swagger
 * /introduce/{mentor_id}:
 *   put:
 *     summary: "멘토 자기소개 페이지 수정"
 *     description: "주어진 멘토 ID를 기반으로 멘토의 자기소개 제목, 내용 및 태그를 수정합니다."
 *     tags:
 *       - mentorIntroduce
 *     parameters:
 *       - name: mentor_id
 *         in: path
 *         required: true
 *         description: "수정할 멘토의 고유 ID"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               introduce_title:
 *                 type: string
 *                 description: "멘토 소개 제목 (필수)"
 *               introduce_content:
 *                 type: string
 *                 description: "멘토 소개 내용 (필수)"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "멘토 소개에 관련된 태그들 (선택적)"
 *             required:
 *               - introduce_title
 *               - introduce_content
 *     responses:
 *       200:
 *         description: "멘토 자기소개 수정 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "멘토 자기소개가 성공적으로 수정되었습니다."
 *                 mentor_id:
 *                   type: string
 *                   example: "mentor123"
 *                 introduce_title:
 *                   type: string
 *                   example: "안녕하세요, 저는 개발자 멘토입니다."
 *                 introduce_content:
 *                   type: string
 *                   example: "저는 10년 경력의 풀스택 개발자로, 다양한 프로젝트 경험이 있습니다."
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["개발", "멘토링", "풀스택"]
 *                 review_count:
 *                   type: number
 *                   example: 0
 *                 coffeechat_count:
 *                   type: number
 *                   example: 0
 *                 mentor_rating:
 *                   type: number
 *                   example: 0
 *       400:
 *         description: "잘못된 요청 (제목, 내용, 또는 태그가 잘못됨)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "자기소개 페이지 내용과 태그가 없습니다."
 *                 message:
 *                   type: string
 *                   example: "멘토 소개 제목과 내용을 모두 입력하고, 태그는 배열 형식이어야 합니다."
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
 *                   example: "해당 멘토 아이디에 해당하는 멘토가 존재하지 않습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 message:
 *                   type: string
 *                   example: "멘토 자기소개 수정 중 문제가 발생했습니다."
 */


router.put("/:mentor_id", mentorIntroduceController.updateMentorIntroduce);

module.exports = router;
