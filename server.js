// npm init
// npm i express
// npm i nodemon --save-dev
// npm i mongodb  --save
// npm i mongoose
// npm i dotenv
// npm i bcrypt
// npm i cookie-parser
// npm i jsonwebtoken
// npm i multer
// npm i path
// npm install swagger-jsdoc swagger-ui-express
// npm i socket.io
// npm i http

const express = require("express");
const connectDB = require("./config/db.js");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig.js");
const userRouter = require("./routes/userRouter.js");
const mentorRouter = require("./routes/mentorRouter.js");
const menteeRouter = require("./routes/menteeRouter.js");
const signupMentorRouter = require("./routes/signupMentorRouter.js");
const signupMenteeRouter = require("./routes/signupMenteeRouter.js");
const loginMentorRouter = require("./routes/loginMentorRouter.js");
const loginMenteeRouter = require("./routes/loginMenteeRouter.js");
const logoutMentorRouter = require("./routes/logoutMentorRouter.js");
const logoutMenteeRouter = require("./routes/logoutMenteeRouter.js");
const coffeeChatRouter = require("./routes/coffeeChatRouter.js");
const reviewRouter = require("./routes/reviewRouter.js");
const mentorIntroduceRouter = require("./routes/mentorIntroduceRouter.js");
const warningRouter = require("./routes/warningRouter.js");
const adminRouter = require("./routes/adminRouter.js");
const signupAdminRouter = require("./routes/signupAdminRouter.js");
const chatRouter = require("./routes/chatRouter.js");

const favoriteRouter = require("./routes/favoriteRouter.js");
const cookieParser = require("cookie-parser");

const { Server, Socket } = require("socket.io");
const http = require("http");
const Chat = require("./models/chat.js");

const app = express();

const server = http.createServer(app);

//챗 통신 서버 코드
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  //특정 채팅방에 메시지 처리
  socket.on("joinRoom", (coffeechatId) => {
    socket.join(coffeechatId);
    console.log(`유저가 접속했습니다 : ${coffeechatId}`);
  });

  socket.on("message", async (data) => {
    const { coffeechatId, message, userId } = data;

    console.log(`userId : ${userId}`);

    try {
      const newChat = new Chat({
        coffeechat_id: coffeechatId,
        user_id: userId,
        message: message,
      });
      const savedChat = await newChat.save();
      io.to(coffeechatId).emit("message", savedChat);
      console.log(savedChat);
    } catch (error) {
      console.error("error");
    }
  });
});

server.listen(8081, () => {
  console.log("socket running on 8081");
});

// CORS 설정.
app.use(
  cors({
    origin: "http://localhost:3000", // 허용할 도메인
    methods: "GET,HEAD,PUT,POST,DELETE", // 허용할 HTTP 메소드
    allowedHeaders: ["Authorization", "Content-Type"], // 허용할 헤더
    credentials: true, // 쿠키 전송 허용
  })
);

// 미들웨어
app.use("/chat", chatRouter);
app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

//swagger ui 미들웨어 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 라우터 연결
app.use("/users", userRouter);

//멘토 관련 라우터
app.use("/signup/mentor", signupMentorRouter);
app.use("/mentor", mentorRouter);
app.use("/introduce", mentorIntroduceRouter);

//멘티 관련 라우터.
app.use("/signup/mentee", signupMenteeRouter);
app.use("/mentee", menteeRouter);

//로그인 관련 라우터
app.use("/login/mentor", loginMentorRouter);
app.use("/login/mentee", loginMenteeRouter);

//로그아웃 관련 라우터
app.use("/logout/mentor", logoutMentorRouter);
app.use("/logout/mentee", logoutMenteeRouter);

//리뷰 관련 라우터
app.use("/review", reviewRouter);

//멘토 북마크 관련 라우터
app.use("/intro", mentorIntroduceRouter);
app.use("/favorite", favoriteRouter);
//커피챗 관련 라우터
app.use("/coffeechat", coffeeChatRouter);

//경고 관련 라우터
app.use("/warning", warningRouter);

//관리자 관련 라우터
app.use("/signup/admin", signupAdminRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}번 포트에서 서버가 실행 중...`);
  connectDB();
});

app.get("/", (req, res) => {
  res.send("서버 접속 성공");
});
