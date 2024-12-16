const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  admin_nickname: { type: String, required: true },
  admin_id: { type: String, required: true },
  admin_pw: { type: String, required: true },
  admin_phone: { type: Number, required: true },
  admin_email: { type: String, required: true },
  admin_access: { type: [String], requird: true },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
