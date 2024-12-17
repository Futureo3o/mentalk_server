const express = require("express");
const favoriteController = require("../controllers/favoriteController");
const router = express.Router();

// 즐겨찾기 추가
router.post('/:mentor_id', favoriteController.addFavorite);

// 즐겨찾기 조회
router.get('/:mentee_id', favoriteController.getFavorites);

// 즐겨찾기 삭제
router.delete('/:mentor_id', favoriteController.removeFavorite);
module.exports = router;
