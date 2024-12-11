const express = require("express");
const coffeeChatController = require("../controllers/coffeeChatController");
const router = express.Router();

router.post("/", coffeeChatController.createCoffeeChat);
router.get("/", coffeeChatController.getAllCoffeeChat);

module.exports = router;
