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
const menteeRouter = require("./routes/menteeRouter.js");
const signupMentorRouter = require("./routes/signupMentorRouter.js");
const signupMenteeRouter = require("./routes/signupMenteeRouter.js");

const app = express();

// JSON 바디 파서 미들웨어
app.use(express.json());

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

//멘토 관련 라우터
app.use("/signup/mentor", signupMentorRouter);
app.use("/mentor", mentorRouter);

//멘티 관련 라우터
app.use("/signup/mentee", signupMenteeRouter);
app.use("/mentee", menteeRouter);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}번 포트에서 서버가 실행 중...`);
  connectDB();
});

app.get("/", (req, res) => {
  res.send("서버 접속 성공");
});
