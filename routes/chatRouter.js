const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/:coffeechat_id", chatController.getChat);

module.exports = router;
