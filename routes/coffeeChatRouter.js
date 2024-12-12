const express = require("express");
const coffeeChatController = require("../controllers/coffeeChatController");
const router = express.Router();

router.post("/", coffeeChatController.createCoffeeChat);
router.get("/", coffeeChatController.getAllCoffeeChat);
router.get("/:introduce_id", coffeeChatController.getCoffeeChatById);
router.put("/:introduce_id", coffeeChatController.updateCoffeeChat);

module.exports = router;
