const CoffeeChat = require("../models/coffeeChat.js");
const MentorIntroduce = require("../models/mentorIntroduce.js");

//커피챗 생성
const createCoffeeChat = async (req, res) => {
  try {
    const { mentor_intro_unique_id, mentee_id, coffee_request, coffee_wanted } = req.body;

    const mentor = await MentorIntroduce.findById(mentor_intro_unique_id);
    if (!mentor) {
      return res.status(404).json({ error: "유효하지 않은 멘토 아이디입니다." });
    }

    const newCoffeeChat = new CoffeeChat({
      mentor_intro_unique_id,
      mentee_id,
      coffee_completed: null,
      coffee_status: "신청",
      coffee_cancle: null,
      coffee_request,
      coffee_wanted,
    });

    const saveNewCoffeeChat = await newCoffeeChat.save();
    res.status(201).json({
      message: "멘토 유저가 성공적으로 생성되었습니다..",
      data: saveNewCoffeeChat,
    });
  } catch (error) {
    console.error("커피챗 생성 실패 : ", error);
    res.status(500).json({
      error: "커피챗 생성 도중 에러가 발생했습니다.",
      details: error.massage,
    });
  }
};

//커피챗 조회
const getAllCoffeeChat = async (req, res) => {
  try {
    const data = await CoffeeChat.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("커피챗 조회 실패 : ", error);
    res.status(500).json({ error: "커피챗 조회 기능 도중 에러가 발생했습니다." });
  }
};

module.exports = { createCoffeeChat, getAllCoffeeChat };
