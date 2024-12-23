const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    coffeechat_id: { type: String, required: true, ref: "CoffeeChat" },
    user_id: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
