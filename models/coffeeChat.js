const mongoose = require("mongoose");

const coffeeChatSchema = new mongoose.Schema(
  {
    introduce_id: {
      type: mongoose.Schema.Types.ObjectId, // ObjectId로 설정
      ref: "mentorIntroduce", // mentorIntroduce 컬렉션을 참조
      required: true,
    },
    mentee_id: { type: String, required: true, ref: "Mentee" },
    coffee_completed: { type: Date, default: null },
    coffee_status: { type: String, default: "신청" },
    coffee_cancle: { type: String, default: null },
    coffee_request: { type: String, required: true },
    coffee_wanted: { type: [String], required: true },
  },
  { timestamps: true }
);

const CoffeeChat = mongoose.model("CoffeeChat", coffeeChatSchema);

module.exports = CoffeeChat;
