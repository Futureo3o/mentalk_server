const Mentor = require("../models/mentor");

//멘토 유저 생성
const createMentorUser = async (req, res) => {
  try {
    // 요청 데이터에서 멘토 정보를 추출
    const {
      mentor_id,
      mentor_pw,
      mentor_email,
      mentor_phone,
      mentor_nickname,
      mentor_img,
      mentor_paper_img,
      mentor_company,
      mentor_category,
      mentor_position,
      mentor_career,
      mentor_is_checked,
      mentor_social_login,
      mentor_gender,
      mentor_warnning_count,
      mentor_favorite_count,
      mentor_suspension,
    } = req.body;

    const newMentor = new Mentor({
      mentor_id,
      mentor_pw,
      mentor_email,
      mentor_phone,
      mentor_nickname,
      mentor_img,
      mentor_paper_img,
      mentor_company,
      mentor_category,
      mentor_position,
      mentor_career,
      mentor_is_checked,
      mentor_social_login,
      mentor_gender,
      mentor_warnning_count: mentor_warnning_count || 0, // 기본값 설정
      mentor_favorite_count: mentor_favorite_count || 0, // 기본값 설정
      mentor_suspension: mentor_suspension || false,
    });

    const savedMentor = await newMentor.save();

    res.status(201).json({
      message: "멘토 유저가 성공적으로 생성되었습니다.",
      data: savedMentor,
    });
  } catch (error) {
    console.error("멘토 유저 생성 실패 : ", error);
    res.status(500).json({
      error: "멘토 유저를 생성하는 도중 오류가 발생했습니다.",
      details: error.message,
    });
  }
};

//멘토 모든 유저 조회
const getAllMentorUser = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    console.error("멘토 조회 요청 실패 : ", error);
    res.status(500).json({
      error: "멘토 유저 정보를 요청하는 도중 오류가 발생했습니다.",
      details: error.message,
    });
  }
};

// 특정 멘토 id로 조회하기
const getMentorUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Mentor.findById(id);
    if (!user) {
      return res.status(404).json({ error: "유저를 찾을 수 없습니다." });
    }
    res.json(user);
  } catch (error) {
    console.error("유저 조회 실패 : ", error);
    res.status(500).json({ error: "유저를 조회하는 도중 오류가 발생했습니다." });
  }
};

// 특정 id로 유저 데이터 수정
const updateMentorUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { mentor_img, mentor_nickname, mentor_company, mentor_category, mentor_position } = req.body;

    const user = await Mentor.findById(id);

    if (!user) {
      return res.status(404).json({ error: "유저를 찾을 수 없습니다." });
    }

    if (mentor_img) user.mentor_img = mentor_img;
    if (mentor_nickname) user.mentor_nickname = mentor_nickname;
    if (mentor_company) user.mentor_company = mentor_company;
    if (mentor_category) user.mentor_category = mentor_category;
    if (mentor_position) user.mentor_position = mentor_position;

    await user.save();
    res.status(200).json({ message: "유저를 성공적으로 수정되었습니다." });
  } catch (error) {
    console.error("멘토 유저 수정 실패 : ", error);
    res.status(500).json({ error: "유저를 업데이트하는 도중 오류가 발생했습니다." });
  }
};

// 특정 id로 유저 데이터 삭제
const deleteMentorUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteduser = await Mentor.findByIdAndDelete(id);

    if (!deleteduser) {
      return res.status(404).json({ message: "특정 유저를 삭제할 수 없습니다." });
    }

    res.status(200).json({
      message: "멘토 유저가 성공적으로 삭제되었습니다.",
      data: deleteduser,
    });
  } catch (error) {
    console.error("특정 유저 데이터 삭제 실패 : ", error);
    res.status(500).json({ error: "특정 멘토 유저를 삭제하는 도중 오류가 발생했습니다." });
  }
};

module.exports = { createMentorUser, getAllMentorUser, getMentorUserById, updateMentorUser, deleteMentorUser };