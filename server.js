// npm init
// npm i express
// npm i nodemon --save-dev
// npm i mongodb  --save
// npm i mongoose
// npm i dotenv

const express = require("express");
const connectDB = require("./config/db.js");
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes/userRouter.js");
const mentorRouter = require("./routes/mentorRouter.js");
const mentorIntroduceRouter=require("./routes/mentorIntroduceRouter.js");
const app = express();

// JSON 바디 파서 미들웨어
app.use(express.json());

// cors 설정
// CORS 설정
app.use(
  cors({
    origin: "http://localhost:3000", // 허용할 도메인
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // 허용할 HTTP 메소드
    allowedHeaders: ["Authorization", "Content-Type"], // 허용할 헤더
    credentials: true, // 쿠키 전송 허용
  })
);

// 라우터 연결
app.use("/users", userRouter);
app.use("/mentor", mentorRouter);
app.use("/intro",mentorIntroduceRouter);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}번 포트에서 서버가 실행 중...`);
  connectDB();
});

app.get("/", (req, res) => {
  res.send("서버 접속 성공");
});
