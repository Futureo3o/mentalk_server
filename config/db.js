const mongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://june:june1274@cluster0.1lwcd.mongodb.net/";

const connectDB = async () => {
  let mydb;
  try {
    mongoClient.connect(url).then((client) => {
      console.log("몽고db 접속 성공");

      mydb = client.db("mentalking");
      mydb.collection("users").find();
    });
  } catch (err) {
    console.error("몽고DB 연결 실패 : ", err);
  }
};

module.exports = connectDB;
