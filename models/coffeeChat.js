const mongoose = require("mongoose");

const coffeeChatSchema = new mongoose.Schema({
  mentor_id: { type: String, required: true },
  mentee_id: { type: String, required: true },
  coffee_status: { type: String, default: "신청" },
  coffee_cancle: { type: String, default: null },
  coffe_request: { type: String, required: true },
  coffee_wanted: { type: String, required: true },
});

const CoffeeChat = mongoose.model("CoffeeChat", coffeeChatSchema);

module.exports = CoffeeChat;
