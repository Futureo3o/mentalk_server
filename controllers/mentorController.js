const Mentor = require("../models/mentor");
const bcrypt = require("bcrypt");

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
      mentor_img = null,
      mentor_paper_img = null,
      mentor_company,
      mentor_category,
      mentor_position,
      mentor_career,
      mentor_is_checked,
      mentor_social_login,
      mentor_gender,
      mentor_warnning_count = 0,
      mentor_favorite_count = 0,
      mentor_suspension = false,
    } = req.body;

    const existingMentorById = await Mentor.findOne({ mentor_id: mentor_id });
    const existingMentorByEmail = await Mentor.findOne({ mentor_email: mentor_email });

    if (existingMentorById) {
      return res.status(400).json({
        error: "이 ID는 이미 사용중입니다. 다른 ID를 선택해주세요.",
      });
    }

    if (existingMentorByEmail) {
      return res.status(400).json({
        error: "이 이메일은 이미 사용 중입니다. 다른 이메일을 선택해주세요.",
      });
    }

    const hashedPassword = await bcrypt.hash(mentor_pw, 10);

    const newMentor = new Mentor({
      mentor_id,
      mentor_pw: hashedPassword,
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

    const filterMentors = mentors.map((mentor) => {
      const { mentor_pw, ...rest } = mentor;
      return rest;
    });

    res.status(200).json(filterMentors);
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
    const { mentor_id } = req.params;
    const user = await Mentor.findOne({ mentor_id: mentor_id });
    if (!user) {
      return res.status(404).json({ error: "유저를 찾을 수 없습니다." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("유저 조회 실패 : ", error);
    res.status(500).json({ error: "유저를 조회하는 도중 오류가 발생했습니다." });
  }
};

// 특정 id로 유저 데이터 수정
const updateMentorUser = async (req, res) => {
  try {
    const { mentor_id } = req.params;
    const { mentor_img, mentor_nickname, mentor_company, mentor_category, mentor_position } = req.body;

    const user = await Mentor.findOne({ mentor_id: mentor_id });

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

// 특정 id로 유저 데이터 삭제.
const deleteMentorUser = async (req, res) => {
  try {
    const { mentor_id } = req.params;
    const deleteduser = await Mentor.findOne({ mentor_id: mentor_id });

    if (!deleteduser) {
      return res.status(404).json({ message: "특정 유저를 삭제할 수 없습니다." });
    }

    await Mentor.deleteOne({ mentor_id: mentor_id });

    res.status(200).json({
      message: "멘토 유저가 성공적으로 삭제되었습니다.",
      data: deleteduser,
    });
  } catch (error) {
    console.error("특정 유저 데이터 삭제 실패 : ", error);
    res.status(500).json({ error: "특정 멘토 유저를 삭제하는 도중 오류가 발생했습니다." });
  }
};

// 멘토 로그인 설정 코드
const loginMentorUser = async (req, res) => {
  try {
    const { mentor_id, mentor_pw } = req.body;

    const user = await Mentor.findOne({ mentor_id: mentor_id });
    if (!user) {
      return res.status(404).json({ error: "멘토 아이디가 존재하지 않거나 잘못 입력하셨습니다." });
    }

    const isMatch = await bcrypt.compare(mentor_pw, user.mentor_pw);

    if (!isMatch) {
      return res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
    }

    return res.status(200).json({ message: "로그인 성공" });
  } catch (error) {
    console.error("로그인 기능 실패 : ", error);
    res.status(500).json({ error: "로그인 기능이 실패하였습니다. 서버 오류" });
  }
};

module.exports = { createMentorUser, getAllMentorUser, getMentorUserById, updateMentorUser, deleteMentorUser, loginMentorUser };
