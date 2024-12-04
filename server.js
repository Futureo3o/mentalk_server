// npm init
// npm i express
// npm i nodemon --save-dev
// npm i mongodb  --save

//테스트
const express = require("express");
const app = express();
const mongodb = require("mongodb").MongoClient;
const url = "mongodb+srv://june:june1274@cluster0.1lwcd.mongodb.net/";
const dbName = "mentalking";

const PORT = 8080;

let db;

//mongoDB 연결
mongodb
  .connect(url)
  .then((client) => {
    console.log("몽고디비에 연결 성공");
    db = client.db(dbName);
    app.listen(PORT, () => {
      console.log(`${PORT}번 포트에서 서버가 실행 중...`);
    });
  })
  .catch((err) => {
    console.error("몽고디비 에러 : ", err);
  });

// JSON 바디 파서 미들웨어
app.use(express.json());

app.get("/users", (req, res) => {
  const userCollection = db.collection("users");
  userCollection
    .find()
    .toArray()
    .then((res) => {
      console.log("res : ", res);
    })
    .catch((err) => {
      console.log("몽고디비 접속 에러 : ", err);
    });

  res.send("데이터 불러오기 성공");
});

app.get("/", (req, res) => {
  res.send("서버 접속");
});

app.post("/users", (req, res) => {
  const userCollection = db.collection("users");
  userCollection
    .insertOne({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    })
    .then((result) => {
      console.log("몽고디비 데이터 추가 성공 : ", result);
    });
  res.send("데이터 추가 성공");
});
