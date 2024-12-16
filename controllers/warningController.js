const Warning = require("../models/warning");
const Mentor = require("../models/mentor");
const Mentee = require("../models/mentee");

//경고 업데이트
const updateWarning = async (req, res) => {
  try {
    const { mentor_id, mentee_id, role } = req.user;
    const { warnning_reason } = req.body;

    let updatedCount;
    let userData;

    if (role === "mentor") {
      const mentee = await Mentee.findOne({ mentee_id: mentee_id });
      if (!mentee) {
        return res.status(404).json({ error: "멘티를 찾을 수 없습니다." });
      }
      updatedCount = mentee.mentee_warnning_count + 1;
      mentee.mentee_warnning_count = updatedCount;
      await mentee.save();

      const warning = new Warning({
        mentor_id: mentor_id,
        mentee_id: mentee_id,
        warnning_reason: warnning_reason,
      });
      await warning.save();
      userData = {
        mentee_id: mentee.mentee_id,
        mentee_name: mentee.name,
        mentee_email: mentee.email,
        mentee_warnning_count: mentee.mentee_warnning_count,
      };
    } else if (role === "mentee") {
      const mentor = await Mentor.findOne({ mentor_id: mentor_id });
      if (!mentor) {
        return res.status(404).json({ error: "멘토를 찾을 수 없습니다." });
      }
      updatedCount = mentor.mentor_warnning_count + 1;
      mentor.mentor_warnning_count = updatedCount;
      await mentor.save();

      const warning = new Warning({
        mentor_id: mentor_id,
        mentee_id: mentee_id,
        warnning_reason: warnning_reason,
      });

      await warning.save(); // 경고 정보 저장
      userData = {
        mentor_id: mentor.mentor_id,
        mentor_name: mentor.name,
        mentor_email: mentor.email,
        mentor_warnning_count: mentor.mentor_warnning_count,
      };
    } else {
      return res.status(400).json({ error: "유효하지 않은 사용자입니다." });
    }

    res.status(200).json({
      message: "경고 업데이트 성공",
      data: {
        userId: role === "mentor" ? mentor_id : mentee_id,
        updatedCount,
        userData,
      },
    });
  } catch (error) {
    console.error("경고 업데이트 에러 : ", error);
    res.status(500).json({ error: "경고 업데이트 기능 도중 에러가 발생했습니다." });
  }
};

module.exports = { updateWarning };
