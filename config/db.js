const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    console.log("MongoDB 연결 성공");
  } catch (error) {
    console.error("몽고디비 연결 에러 : ", err);
    throw new Error("MongoDB 연결 실패");
  }
}

module.exports = connectDB;
