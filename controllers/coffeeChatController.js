const CoffeeChat = require("../models/coffeeChat.js");
const MentorIntroduce = require("../models/mentorIntroduce.js");
const Mentor = require("../models/mentor.js");
const Mentee = require("../models/mentee.js");

//커피챗 생성
const createCoffeeChat = async (req, res) => {
  try {
    const { introduce_id,mentor_id ,mentee_id, coffee_request_date, coffee_request, coffee_wanted } = req.body;

    const mentorIntroduceId = await MentorIntroduce.findById(introduce_id);
    if (!mentorIntroduceId) {
      return res.status(404).json({ error: "유효하지 않은 멘토 아이디입니다." });
    }

    const mentor = await Mentor.findOne({ mentor_id: mentor_id });

    if (!mentor) {
      return res.status(404).json({ error: "해당 멘토가 존재하지 않습니다." });
    }

    const mentee = await Mentee.findOne({ mentee_id: mentee_id });

    if (!mentee) {
      return res.status(404).json({ error: "해당 멘티티가 존재하지 않습니다." });
    }

    const newCoffeeChat = new CoffeeChat({
      introduce_id,
      mentor_id,
      mentee_id,
      coffee_request_date,
      coffee_completed: null,
      coffee_meeting_date: null,
      coffee_status: "신청",
      coffee_cancel: null,
      coffee_request,
      coffee_wanted,
    });

    const saveNewCoffeeChat = await newCoffeeChat.save();
    res.status(201).json({
      message: "커피챗이 성공적으로 생성되었습니다.",
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
    res.status(200).json({ message: "커피챗 조회 성공했습니다.", data: data });
  } catch (error) {
    console.error("커피챗 조회 실패 : ", error);
    res.status(500).json({ error: "커피챗 조회 기능 도중 에러가 발생했습니다." });
  }
};

//커피챗 특정 조회
const getCoffeeChatById = async (req, res) => {
  try {
    const { introduce_id } = req.params;
    const coffeeChat = await CoffeeChat.findOne({ introduce_id: introduce_id });

    if (!coffeeChat) {
      return res.status(404).json({ error: "해당 커피챗이 존재하지 않습니다." });
    }

    res.status(200).json({ message: "커피챗 조회 성공하셨습니다.", data: coffeeChat });
  } catch (error) {
    console.error("커피챗 조회 실패 : ", error);
    res.status(500).json({ error: "특정 커피챗 조회 기능 도중 에러가 발생했습니다." });
  }
};

//커피챗 멘토아이디로 조회
const getAllCoffeeChatByMentorID = async (req, res) => {
  try {
    const { mentor_id } = req.params;
    const coffeechat = await CoffeeChat.find({ mentor_id: mentor_id });

    if (!coffeechat) {
      return res.status(404).json({ error: "해당 멘토가 존재하지 않습니다." });
    }
    const mentor = await Mentor.findOne({mentor_id:mentor_id});
    
    if(!mentor){
      return res.status(404).json({error:"멘토 정보가 존재하지 않습니다."});
    }
    const menteeIds = coffeechat.map(chat =>chat.mentee_id);

    const mentee = await Mentee.find({mentee_id:{$in:menteeIds}});

    if(!mentee){
      return res.status(404).json({error: "멘티 정보가 존재하지 않습니다."});
    }

    res.status(200).json({ message: "멘토 아아디로 커피챗 조회가 성공하였습니다.", data: coffeechat,mentor,mentee, });
  } catch (error) {
    console.error("특정 멘토 아디로 조회한 커피챗 데이터 기능 실패");
    res.status(500).json({ error: "멘토아이디로 조회한 커피챗 목록 가져오기 기능 도중 에러가 발생했습니다." });
  }
};

//커피챗 멘티 아이디로 조회
const getAllCoffeeChatByMenteeID = async (req, res) => {
  try {
    const { mentee_id } = req.params;

    const coffeechat = await CoffeeChat.find({ mentee_id: mentee_id });

    if (!coffeechat || coffeechat.length === 0) {
      return res.status(404).json({ error: "해당 멘티의 커피챗이 존재하지 않습니다." });
    }

    const mentee = await Mentee.findOne({ mentee_id: mentee_id });

    if (!mentee) {
      return res.status(404).json({ error: "멘티 정보가 존재하지 않습니다." });
    }

    const mentorIds = coffeechat.map(chat => chat.mentor_id);

    const mentor = await Mentor.find({ mentor_id: { $in: mentorIds } });

    if (!mentor) {
      return res.status(404).json({ error: "멘토 정보가 존재하지 않습니다." });
    }

    res.status(200).json({
      message: "멘티 아이디로 커피챗, 멘티, 멘토 정보 조회가 성공하였습니다.",
      data: {
        coffeechat,
        mentee,
        mentor,
      },
    });
  } catch (error) {
    console.error("특정 멘티 아이디로 조회한 데이터 가져오기 실패", error);
    res.status(500).json({
      error: "멘티 아이디로 조회한 데이터 가져오기 도중 에러가 발생했습니다.",
    });
  }
};


//커피챗 수정
const updateCoffeeChat = async (req, res) => {
  try {
    const { _id } = req.params;
    const { coffee_completed, coffee_meeting_date, coffee_status, coffee_cancel } = req.body;

    const coffeeChatData = await CoffeeChat.findOne({ _id: _id });

    if (!coffeeChatData) {
      return res.status(404).json({ error: "해당 커피챗이 존재하지 않습니다." });
    }

    if (coffee_completed) coffeeChatData.coffee_completed = coffee_completed;
    if (coffee_status) coffeeChatData.coffee_status = coffee_status;
    if (coffee_cancel) coffeeChatData.coffee_cancel = coffee_cancel;
    if (coffee_meeting_date) coffeeChatData.coffee_meeting_date = coffee_meeting_date;

    await coffeeChatData.save();
    res.status(200).json({ message: "커피챗 업데이트를 성공적으로 수정하였습니다.", data: coffeeChatData });
  } catch (error) {
    console.error("커피챗 수정 실패 : ", error);
    res.status(500).json({ error: "커피챗 수정 요청 기능 도중 에러가 발생했습니다." });
  }
};

module.exports = { getCoffeeChatById, createCoffeeChat, getAllCoffeeChat, updateCoffeeChat, getAllCoffeeChatByMentorID,getAllCoffeeChatByMenteeID };
