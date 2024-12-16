const mongoose = require("mongoose");

const warningSchema = new mongoose.Schema(
  {
    mentor_id: { type: String, required: true, ref: "Mentor" },
    mentee_id: { type: String, required: true, ref: "Mentee" },
    warnning_reason: { type: String, required: true },
  },
  { timestamps: true }
);

const Warning = mongoose.model("Warning", warningSchema);

module.exports = Warning;
