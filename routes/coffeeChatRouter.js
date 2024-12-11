const express = require("express");
const coffeeChatController = require("../controllers/coffeeChatController");
const router = express.Router();

router.post("/", coffeeChatController.createCoffeeChat);

module.exports = router;
