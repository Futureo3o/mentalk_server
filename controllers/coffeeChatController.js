const CoffeeChat = require("../models/coffeeChat.js");
const MentorIntroduce = require("../models/mentorIntroduce.js");
const Mentor = require("../models/mentor.js");
const Mentee = require("../models/mentee.js");

//커피챗 생성
const createCoffeeChat = async (req, res) => {
  try {
    const {
      introduce_id,
      mentor_id,
      mentee_id,
      coffee_request_date,
      coffee_request,
      coffee_wanted,
    } = req.body;

    const mentorIntroduceId = await MentorIntroduce.findById(introduce_id);
    if (!mentorIntroduceId) {
      return res
        .status(404)
        .json({ error: "유효하지 않은 멘토 아이디입니다." });
    }

    const mentor = await Mentor.findOne({ mentor_id: mentor_id });

    if (!mentor) {
      return res.status(404).json({ error: "해당 멘토가 존재하지 않습니다." });
    }

    const mentee = await Mentee.findOne({ mentee_id: mentee_id });

    if (!mentee) {
      return res
        .status(404)
        .json({ error: "해당 멘티티가 존재하지 않습니다." });
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
    res
      .status(500)
      .json({ error: "커피챗 조회 기능 도중 에러가 발생했습니다." });
  }
};

//커피챗 특정 조회
const getCoffeeChatById = async (req, res) => {
  try {
    const { introduce_id } = req.params;
    const coffeeChat = await CoffeeChat.findOne({ introduce_id: introduce_id });

    if (!coffeeChat) {
      return res
        .status(404)
        .json({ error: "해당 커피챗이 존재하지 않습니다." });
    }

    res
      .status(200)
      .json({ message: "커피챗 조회 성공하셨습니다.", data: coffeeChat });
  } catch (error) {
    console.error("커피챗 조회 실패 : ", error);
    res
      .status(500)
      .json({ error: "특정 커피챗 조회 기능 도중 에러가 발생했습니다." });
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
    const mentor = await Mentor.findOne({ mentor_id: mentor_id });

    if (!mentor) {
      return res.status(404).json({ error: "멘토 정보가 존재하지 않습니다." });
    }

    const menteeIds = coffeechat.map((chat) => chat.mentee_id);
    const menteeList = await Mentee.find({ mentee_id: { $in: menteeIds } });

    if (!menteeList) {
      return res.status(404).json({ error: "멘티 정보가 존재하지 않습니다." });
    }
    const result = coffeechat.map((chat) => {
      const mentee =
        menteeList.find((m) => m.mentee_id === chat.mentee_id) || {}; // mentee에서 해당 mentee_id 찾기

      return {
        coffeechat: {
          coffeechat_id: chat._id,
          coffeechat_status: chat.coffee_status,
          coffeechat_wanted: chat.coffee_wanted,
          coffeechat_meeting_date: chat.coffee_meeting_date,
          introduce_id: chat.introduce_id,
        },
        mentor: {
          mentor_id: mentor.mentor_id,
          mentor_email: mentor.mentor_email,
          mentor_phone: mentor.mentor_phone,
          mentor_nickname: mentor.mentor_nickname,
          mentor_company: mentor.mentor_company,
          mentor_category: mentor.mentor_category,
          mentor_position: mentor.mentor_position,
          mentor_img: mentor.mentor_img,
          mentor_paper_img: mentor.mentor_paper_img,
          mentor_career: mentor.mentor_career,
          mentor_is_checked: mentor.mentor_is_checked,
          mentor_social_login: mentor.mentor_social_login,
          mentor_gender: mentor.mentor_gender,
          mentor_warnning_count: mentor.mentor_warnning_count,
          mentor_favorite_count: mentor.mentor_favorite_count,
          mentor_suspension: mentor.mentor_suspension,
        },
        mentee: {
          mentee_id: mentee.mentee_id || null,
          mentee_email: mentee.mentee_email || null,
          mentee_phone: mentee.mentee_phone || null,
          mentee_nickname: mentee.mentee_nickname || null,
          mentee_position: mentee.mentee_position || [],
          mentee_img: mentee.mentee_img || null,
          mentee_social_login: mentee.mentee_social_login || false,
          mentee_gender: mentee.mentee_gender || null,
          mentee_warnning_count: mentee.mentee_warnning_count || 0,
          mentee_favorite_count: mentee.mentee_favorite_count || 0,
          mentee_suspension: mentee.mentee_suspension || false,
        },
      };
    });

    res.status(200).json({
      message: "멘토 아아디로 커피챗 조회가 성공하였습니다.",
      data: result,
    });
  } catch (error) {
    console.error("특정 멘토 아이디로 조회한 커피챗 데이터 기능 실패");
    res.status(500).json({
      error:
        "멘토아이디로 조회한 커피챗 목록 가져오기 기능 도중 에러가 발생했습니다.",
    });
  }
};

//커피챗 멘티 아이디로 조회
const getAllCoffeeChatByMenteeID = async (req, res) => {
  try {
    const { mentee_id } = req.params;
    const coffeechat = await CoffeeChat.find({ mentee_id: mentee_id });

    if (!coffeechat || coffeechat.length === 0) {
      return res
        .status(404)
        .json({ error: "해당 멘티의 커피챗이 존재하지 않습니다." });
    }

    const mentee = await Mentee.findOne({ mentee_id: mentee_id });

    if (!mentee) {
      return res.status(404).json({ error: "멘티 정보가 존재하지 않습니다." });
    }

    const mentorIds = coffeechat.map((chat) => String(chat.mentor_id));
    const mentorList = await Mentor.find({ mentor_id: { $in: mentorIds } });

    if (!mentorList || mentorList.length === 0) {
      return res.status(404).json({ error: "멘토 정보가 존재하지 않습니다." });
    }

    const result = coffeechat.map((chat) => {
      const mentor =
        mentorList.find((m) => m.mentor_id === chat.mentor_id) || {};
      return {
        coffeechat: {
          coffeechat_id: chat._id,
          coffeechat_status: chat.coffee_status,
          coffeechat_wanted: chat.coffee_wanted,
          coffeechat_meeting_date: chat.coffee_meeting_date,
          introduce_id: chat.introduce_id,
        },
        mentor: {
          mentor_id: mentor.mentor_id,
          mentor_email: mentor.mentor_email,
          mentor_phone: mentor.mentor_phone,
          mentor_nickname: mentor.mentor_nickname,
          mentor_company: mentor.mentor_company,
          mentor_category: mentor.mentor_category,
          mentor_position: mentor.mentor_position,
          mentor_img: mentor.mentor_img,
          mentor_paper_img: mentor.mentor_paper_img,
          mentor_career: mentor.mentor_career,
          mentor_is_checked: mentor.mentor_is_checked,
          mentor_social_login: mentor.mentor_social_login,
          mentor_gender: mentor.mentor_gender,
          mentor_warnning_count: mentor.mentor_warnning_count,
          mentor_favorite_count: mentor.mentor_favorite_count,
          mentor_suspension: mentor.mentor_suspension,
        },
        mentee: {
          mentee_id: mentee.mentee_id || null,
          mentee_email: mentee.mentee_email || null,
          mentee_phone: mentee.mentee_phone || null,
          mentee_nickname: mentee.mentee_nickname || null,
          mentee_position: mentee.mentee_position || [],
          mentee_img: mentee.mentee_img || null,
          mentee_social_login: mentee.mentee_social_login || false,
          mentee_gender: mentee.mentee_gender || null,
          mentee_warnning_count: mentee.mentee_warnning_count || 0,
          mentee_favorite_count: mentee.mentee_favorite_count || 0,
          mentee_suspension: mentee.mentee_suspension || false,
        },
      };
    });

    res.status(200).json({
      message: "멘티 아아디로 커피챗 조회가 성공하였습니다.",
      data: result,
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
    const {
      coffee_completed,
      coffee_meeting_date,
      coffee_status,
      coffee_cancel,
    } = req.body;

    const coffeeChatData = await CoffeeChat.findOne({ _id: _id });

    if (!coffeeChatData) {
      return res
        .status(404)
        .json({ error: "해당 커피챗이 존재하지 않습니다." });
    }

    if (coffee_completed) coffeeChatData.coffee_completed = coffee_completed;
    if (coffee_status) coffeeChatData.coffee_status = coffee_status;
    if (coffee_cancel) coffeeChatData.coffee_cancel = coffee_cancel;
    if (coffee_meeting_date)
      coffeeChatData.coffee_meeting_date = coffee_meeting_date;

    await coffeeChatData.save();
    res.status(200).json({
      message: "커피챗 업데이트를 성공적으로 수정하였습니다.",
      data: coffeeChatData,
    });
  } catch (error) {
    console.error("커피챗 수정 실패 : ", error);
    res
      .status(500)
      .json({ error: "커피챗 수정 요청 기능 도중 에러가 발생했습니다." });
  }
};

module.exports = {
  getCoffeeChatById,
  createCoffeeChat,
  getAllCoffeeChat,
  updateCoffeeChat,
  getAllCoffeeChatByMentorID,
  getAllCoffeeChatByMenteeID,
};
