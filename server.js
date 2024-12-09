// npm init
// npm i express
// npm i nodemon --save-dev
// npm i mongodb  --save
// npm i mongoose
// npm i dotenv

//test

const express = require("express");
const connectDB = require("./config/db.js");
require("dotenv").config();
const userRouter = require("./routes/userRouter.js");
const mentorRouter = require("./routes/mentorRouter.js");

const app = express();

// JSON 바디 파서 미들웨어
app.use(express.json());

// 라우터 연결
app.use("/users", userRouter);
app.use("/mentor", mentorRouter);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}번 포트에서 서버가 실행 중...`);
  connectDB();
});

app.get("/", (req, res) => {
  res.send("서버 접속 성공");
});
