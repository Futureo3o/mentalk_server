const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    mentor_id: { type: String, required: true },
    mentor_pw: { type: String, required: true },
    mentor_email: { type: String, required: true },
    mentor_phone: { type: Number, required: true },
    mentor_nickname: { type: String, required: true },
    mentor_company: { type: String, required: true },
    mentor_category: { type: String, required: true },
    mentor_position: { type: String, required: true },
    mentor_img: { type: String, default: null },
    mentor_paper_img: { type: String, default: null },
    mentor_career: { type: String, required: true },
    mentor_is_checked: { type: Boolean, required: false, default: false },
    mentor_social_login: { type: Boolean, default: false },
    mentor_gender: { type: String, required: true },
    mentor_warnning_count: { type: Number, default: 0 },
    mentor_favorite_count: { type: Number, default: 0 },
    mentor_suspension: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
