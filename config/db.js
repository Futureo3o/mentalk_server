// db.js
const { MongoClient } = require("mongodb");
const url = "mongodb+srv://june:june1274@cluster0.1lwcd.mongodb.net/";
const dbName = "testDB"; // 사용할 데이터베이스 이름

let db;

async function connectDB() {
  if (db) return db;
  try {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
    return db;
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
}

module.exports = connectDB;
