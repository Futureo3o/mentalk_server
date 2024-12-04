// npm init
// npm i express
// npm i nodemon --save-dev
// npm i mongodb  --save

const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const UserModel = require("./models/user.js");

const PORT = 8080;

// JSON 바디 파서 미들웨어
app.use(express.json());

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버가 실행 중...`);
});

app.get("/", (req, res) => {
  res.send("서버 접속");
});

app.get("/users", async (req, res) => {
  try {
    connectDB();
  } catch (err) {
    console.error("사용자 추가 중 오류:", err);
  }
});
