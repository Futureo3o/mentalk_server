const CoffeeChat = require("../models/coffeeChat.js");

//커피챗 생성
const createCoffeeChat = async (req, res) => {
  try {
  } catch (error) {
    console.error("커피챗 생성 실패 : ", error);
    res.status(500).json({ error: "커피챗 생성 도중 에러가 발생했습니다." });
  }
};
