const { MongoClient } = require("mongodb");

const url = "mongodb+srv://june:june1274@cluster0.1lwcd.mongodb.net/";
const dbName = "mentalking";
let db;

async function connectDB() {
  try {
    const client = await MongoClient.connect(url);
    db = client.db(dbName);
    console.log("MongoDB 연결 성공");
  } catch (err) {
    console.error("몽고디비 연결 에러 : ", err);
    throw new Error();
  }
}

const getDB = () => {
  if (!db) {
    throw new Error("몽고db에 연결되지 않았습니다.");
  }
  return db;
};

module.exports = { connectDB, getDB };
