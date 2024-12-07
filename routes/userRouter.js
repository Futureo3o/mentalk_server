const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//유저 목록 가져오기
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
