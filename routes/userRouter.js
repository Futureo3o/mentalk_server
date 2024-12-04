const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//유저 목록 가져오기
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

module.exports = router;
