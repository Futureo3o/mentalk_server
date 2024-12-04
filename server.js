// npm init
// npm i express
// npm i nodemon --save-dev
// npm i mongodb  --save

const express = require("express");
const app = express();

const PORT = 8080;

app.listen(PORT, () => {
  console.log("서버가 실행되었습니다...");
});

app.get("/", (req, res) => {
  res.send("서버 접속");
});

app.get("/contacts", (req, res) => {
  res.send("Contact Page");
});

//특정 아이템을 가져올 때는
app.get("/contacts/:id", (req, res) => {
  res.send(`get view contact for id : ${req.params.id}`);
});

app.post("/contacts", (req, res) => {
  res.send("Create Page");
});

//특정 아이템을 수정할 때는
app.put("/contacts/:id", (req, res) => {
  res.send(`update contact for id : ${req.params.id}`);
});

//특정 아이템을 삭제할 때는
app.put("/contacts/:id", (req, res) => {
  res.send(`delete contact for id : ${req.params.id}`);
});
