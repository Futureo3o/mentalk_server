// npm init
// npm i express
// npm i nodemon --save-dev
// npm i mongodb  --save

const express = require("express");
const { connectDB } = require("./config/db.js");
const userRouter = require("./routes/userRouter.js");

const app = express();
const PORT = 8080;

// JSON 바디 파서 미들웨어
app.use(express.json());

// 라우터 연결
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버가 실행 중...`);
  connectDB();
});

app.get("/", (req, res) => {
  res.send("서버 접속");
});
