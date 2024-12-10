const mongoose = require("mongoose");

//User 컬렉션 정의
const userSchma = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
});

//User 모델 컬렉션 생성
const User = mongoose.model("User", userSchma);

module.exports = User;

