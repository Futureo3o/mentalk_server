const mongoose = require("mongoose");

const menteeSchema = new mongoose.Schema(
  {
    mentee_id: { type: String, required: true },
    mentee_pw: { type: String, required: true },
    mentee_email: { type: String, required: true },
    mentee_phone: { type: Number, required: true },
    mentee_nickname: { type: String, required: true },
    mentee_position: { type: [String], required: true },
    mentee_img: { type: String, default: null },
    mentee_social_login: { type: Boolean, default: false },
    mentee_gender: { type: String, required: true },
    mentee_warnning_count: { type: Number, default: 0 },
    mentee_favorite_count: { type: Number, default: 0 },
    mentee_suspension: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Mentee = mongoose.model("Mentee", menteeSchema);

module.exports = Mentee;
