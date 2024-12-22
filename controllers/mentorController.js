const Mentor = require("../models/mentor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

//multer 설정 코드
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "mentor_img", maxCount: 1 }, // 프로필 이미지
  { name: "mentor_paper_img", maxCount: 1 }, // 재직증명서 이미지
]);

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
      const { mentor_pw, ...rest } = mentor.toObject();
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

    const { mentor_pw, ...userInfo } = user.toObject();

    res.status(200).json(userInfo);
  } catch (error) {
    console.error("유저 조회 실패 : ", error);
    res.status(500).json({ error: "유저를 조회하는 도중 오류가 발생했습니다." });
  }
};

// 특정 id로 유저 데이터 수정
const updateMentorUser = async (req, res) => {
  try {
    const { mentor_id } = req.params;
    const { mentor_nickname, mentor_company, mentor_category, mentor_position } = req.body;
    let { mentor_img, mentor_paper_img } = req.body;

    // 파일 업로드 처리
    if (req.files) {
      if (req.files["mentor_img"]) {
        mentor_img = req.files["mentor_img"][0].path; // 업로드된 프로필 이미지 경로
      }
      if (req.files["mentor_paper_img"]) {
        mentor_paper_img = req.files["mentor_paper_img"][0].path; // 업로드된 재직증명서 이미지 경로
      }
    }

    const user = await Mentor.findOne({ mentor_id: mentor_id });

    if (!user) {
      return res.status(404).json({ error: "유저를 찾을 수 없습니다." });
    }

    const fixData = { mentor_img, mentor_paper_img, mentor_nickname, mentor_company, mentor_category, mentor_position };

    if (mentor_img) user.mentor_img = mentor_img;
    if (mentor_paper_img) user.mentor_paper_img = mentor_paper_img;
    if (mentor_nickname) user.mentor_nickname = mentor_nickname;
    if (mentor_company) user.mentor_company = mentor_company;
    if (mentor_category) user.mentor_category = mentor_category;
    if (mentor_position) user.mentor_position = mentor_position;

    await user.save();
    res.status(200).json({ message: "유저를 성공적으로 수정하였습니다.", data: fixData });
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

    //JWT 발급
    const accessToken = jwt.sign(
      {
        mentor_id: user.mentor_id,
        role: "mentor",
      },
      process.env.MENTOR_ACCESS_SECRET,
      {
        expiresIn: "30m",
        issuer: "About Tech",
      }
    );

    const refreshToken = jwt.sign(
      {
        mentor_id: user.mentor_id,
        role: "mentor",
      },
      process.env.MENTOR_REFRESH_SECRET,
      {
        expiresIn: "24h",
        issuer: "About Tech",
      }
    );

    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: false,
    });

    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: false,
    });

    return res.status(200).json({ message: "로그인 성공", data: user, accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    console.error("로그인 기능 실패 : ", error);
    res.status(500).json({ error: "로그인 기능이 실패하였습니다. 서버 오류" });
  }
};

// accessToken: 엑세스 토큰 검증 및 멘토 정보 조회
// 엑세스 토큰 검증 및 멘토 정보 조회
const mentorAccessToken = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ error: "로그인이 필요합니다." });
    }

    try {
      const decoded = jwt.verify(token, process.env.MENTOR_ACCESS_SECRET);
      const user = await Mentor.findOne({ mentor_id: decoded.mentor_id });

      if (!user) {
        return res.status(404).json({ error: "해당 멘토를 찾을 수 없습니다." });
      }

      res.status(200).json({
        message: "멘토 정보 조회 성공",
        data: {
          mentor_id: user.mentor_id,
          mentor_nickname: user.mentor_nickname,
          mentor_email: user.mentor_email,
          mentor_phone: user.mentor_phone,
          mentor_company: user.mentor_company,
          mentor_category: user.mentor_category,
          mentor_position: user.mentor_position,
          mentor_career: user.mentor_career,
          mentor_img: user.mentor_img,
          mentor_paper_img: user.mentor_paper_img,
        },
      });
    } catch (err) {
      // TokenExpiredError 처리
      if (err.name === "TokenExpiredError") {
        console.log("엑세스 토큰 만료");

        // 리프레시 토큰으로 새로운 액세스 토큰을 발급하는 로직 추가
        return res.status(401).json({ error: "엑세스 토큰이 만료되었습니다. 리프레시 토큰을 사용하여 새 토큰을 발급해주세요." });
      }

      console.error("엑세스 토큰 검증 실패 : ", err);
      res.status(500).json({
        error: "엑세스 토큰 검증 중 오류가 발생했습니다.",
        details: err.message,
      });
    }
  } catch (error) {
    console.error("엑세스 토큰 검증 실패 : ", error);
    res.status(500).json({
      error: "엑세스 토큰 검증 중 오류가 발생했습니다.",
      details: error.message,
    });
  }
};

// refreshToken: 리프레시 토큰을 이용해 새로운 액세스 토큰 발급
const mentorRefreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ error: "로그인이 필요합니다." });
    }

    const decoded = jwt.verify(token, process.env.MENTOR_REFRESH_SECRET);

    const user = await Mentor.findOne({ mentor_id: decoded.mentor_id });

    if (!user) {
      return res.status(404).json({ error: "해당 멘토를 찾을 수 없습니다." });
    }

    //access Token 새로 발급
    const newAccessToken = jwt.sign(
      {
        mentor_id: user.mentor_id,
        role: "mentor",
      },
      process.env.MENTOR_ACCESS_SECRET,
      {
        expiresIn: "30m",
        issuer: "About Tech",
      }
    );

    res.cookie("accessToken", newAccessToken, {
      secure: false,
      httpOnly: false,
    });

    res.status(200).json({ message: "새로운 액세스 토큰이 발급되었습니다.", accessToken: newAccessToken });
  } catch (error) {
    console.error("리프레쉬 토큰 검증 실패 : ", error);
    res.status(500).json({
      error: "리프레쉬 토큰 검증 중 오류가 발생했습니다.",
      details: error.message,
    });
  }
};

// mentorLoginSuccess: 로그인 후 멘토 정보 반환 (비밀번호 제외)
const mentorLoginSuccess = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ error: "로그인이 필요합니다." });
    }

    const decoded = jwt.verify(token, process.env.MENTOR_ACCESS_SECRET);

    const user = await Mentor.findOne({ mentor_id: decoded.mentor_id });

    if (!user) {
      return res.status(404).json({ error: "아이디가 일치하지 않습니다." });
    }

    const { mentor_pw, ...userInfo } = user.toObject();

    res.status(200).json(userInfo);
  } catch (error) {
    console.error("실패", error);
    res.status(500).json({ error: "에러" });
  }
};

// mentorLogout: 로그아웃 처리 (액세스 토큰 제거)
const mentorLogout = (req, res) => {
  try {
    res.cookie("accessToken", "", {
      expires: new Date(0),
    });
    res.cookie("refreshToken", "", {
      expires: new Date(0),
    });
    res.status(200).json({ message: "로그아웃 성공공" });
  } catch (error) {
    console.error("로그아웃 실패");
    res.status(500).json({ error: "로그아웃 실패했습니다." });
  }
};

module.exports = {
  mentorAccessToken,
  mentorRefreshToken,
  mentorLoginSuccess,
  mentorLogout,
  createMentorUser,
  getAllMentorUser,
  getMentorUserById,
  updateMentorUser,
  deleteMentorUser,
  loginMentorUser,
  upload,
};
