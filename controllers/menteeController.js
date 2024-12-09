const Mentee = require("../models/mentee");

//멘티 유저 생성
const createMenteeUser = async (req, res) => {
  try {
    const {
      mentee_id,
      mentee_pw,
      mentee_email,
      mentee_phone,
      mentee_nickname,
      mentee_position,
      mentee_img = null,
      mentee_social_login,
      mentee_gender,
      mentee_warnning_count = 0,
      mentee_favorite_count = 0,
      mentee_suspension = false,
    } = req.body;

    const existingMenteeById = await Mentee.findOne({ mentee_id });
    const existingMenteeByEmail = await Mentee.findOne({ mentee_email });

    if (existingMenteeById) {
      return res.status(400).json({
        error: "이 ID는 이미 사용 중입니다. 다른 ID를 선택해주세요.",
      });
    }

    if (existingMenteeByEmail) {
      return res.status(400).json({
        error: "이 이메일은 이미 사용중입니다. 다른 이메일을 선택해주세요.",
      });
    }

    const newMentee = new Mentee({
      mentee_id,
      mentee_pw,
      mentee_email,
      mentee_phone,
      mentee_nickname,
      mentee_position,
      mentee_img,
      mentee_social_login,
      mentee_gender,
      mentor_warnning_count: mentee_warnning_count || 0, // 기본값 설정
      mentor_favorite_count: mentee_favorite_count || 0, // 기본값 설정
      mentor_suspension: mentee_suspension || false,
    });

    const saveMentee = await newMentee.save();

    res.status(201).json({
      message: "멘티 유저가 성공적으로 생성되었습니다.",
      data: saveMentee,
    });
  } catch (error) {
    console.error("멘티 유저 생성 실패 : ", error);
    res.status(500).json({
      error: "멘티 유저를 생성하는 도중 오류가 발생했습니다.",
      details: error.message,
    });
  }
};

//멘티 모든 유저 조회
const getAllMenteeUser = async (req, res) => {
  try {
    const mentee = await Mentee.find();

    if (!mentee) {
      return res.status(404).json({
        error: "멘티 유저 정보를 실패했습니다.",
      });
    }

    res.status(200).json(mentee);
  } catch (error) {
    console.error("멘티 조회 요청 실패 : ", error);
    res.status;
  }
};
