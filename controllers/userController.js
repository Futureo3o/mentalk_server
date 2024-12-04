const { getDB } = require("../config/db");

const getAllUsers = async (req, res) => {
  try {
    const db = await getDB();
    const collection = db.collection("users");
    const users = await collection.find().toArray();
    res.send("몽고디비 데이터 가져오기 성공");
  } catch (err) {
    console.error("몽고디비 user collection data 가져오기 실패 : ", err);
    res.status(500).json({ error: "유저 목록을 가져오는 중 오류가 발생했습니다." });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const data = { name, email, age };
    const db = await getDB();
    const collection = db.collection("users");

    const result = await collection.insertOne(data);
    res.status(201).send("유저생성 성공");
  } catch (err) {
    console.error("아이템 생성 실패:", error);
    res.status(500).json({ error: "아이템을 생성하는 중 오류가 발생했습니다." });
  }
};

module.exports = { getAllUsers, createUser };
