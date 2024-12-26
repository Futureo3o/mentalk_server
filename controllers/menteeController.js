const Mentee = require("../models/mentee");
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

const upload = multer({ storage: storage }).fields([{ name: "mentee_img", maxCount: 1 }]);

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

    const hashedPassword = await bcrypt.hash(mentee_pw, 10);

    const newMentee = new Mentee({
      mentee_id,
      mentee_pw: hashedPassword,
      mentee_email,
      mentee_phone,
      mentee_nickname,
      mentee_position,
      mentee_img,
      mentee_social_login,
      mentee_gender,
      mentee_warnning_count: mentee_warnning_count || 0, // 기본값 설정
      mentee_favorite_count: mentee_favorite_count || 0, // 기본값 설정
      mentee_suspension: mentee_suspension || false,
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
    const filterMentee = mentee.map((mentee) => {
      const { mentee_pw, ...rest } = mentee.toObject();
      return rest;
    });
    res.status(200).json(filterMentee);
  } catch (error) {
    console.error("멘티 조회 요청 실패 : ", error);
    res.status;
  }
};

//특정 멘티 id로 조회하기
const getMenteeUserById = async (req, res) => {
  try {
    const { mentee_id } = req.params;
    const user = await Mentee.findOne({ mentee_id: mentee_id });

    if (!user) {
      return res.status(404).json({ error: "유저를 찾을 수 없습니다." });
    }

    const { mentee_pw, ...userInfo } = user.toObject();

    res.status(200).json(userInfo);
  } catch (error) {
    console.error("유저 조회 실패 : ", error);
    res.status(500).json({
      error: "유저를 조회하는 도중 오류가 발생했습니다.",
    });
  }
};

//특정 멘티id로 수정하기
const updateMenteeUserById = async (req, res) => {
  try {
    const { mentee_id } = req.params;
    const { mentee_nickname, mentee_position } = req.body;
    let { mentee_img } = req.body;

    //파일 업로드 처리
    if (req.files) {
      if (req.files["mentee_img"]) {
        mentee_img = req.files["mentee_img"][0].path;
      }
    }

    const user = await Mentee.findOne({ mentee_id: mentee_id });

    if (!user) {
      return res.status(404).json({ error: "찾는 유저 id가 존재하질 않습니다." });
    }

    const fixData = { mentee_img, mentee_nickname, mentee_position };

    if (mentee_img) user.mentee_img = mentee_img;
    if (mentee_nickname) user.mentee_nickname = mentee_nickname;
    if (mentee_position) user.mentee_position = mentee_position;

    await user.save();
    res.status(200).json({ message: "유저를 성공적으로 수정하였습니다.", data: fixData });
  } catch (error) {
    console.error("멘티 유저 정보 실패 : ", error);
    res.status(500).json({ error: "유저를 업데이트하는 도중 오류가 발생했습니다." });
  }
};

//특정 멘티id로 삭제하기
const deleteMenteeUserById = async (req, res) => {
  try {
    const { mentee_id } = req.params;
    const deleteduser = await Mentee.findOne({ mentee_id: mentee_id });

    if (!deleteduser) {
      return res.status(404).json({ error: "삭제 하려는 id가 존재하지 않습니다." });
    }
    await Mentee.deleteOne({ mentee_id });

    res.status(200).json({
      message: "멘티 유저가 성공적으로 삭제되었습니다.",
      data: deleteduser,
    });
  } catch (error) {
    console.error("멘티 유저 삭제 실패 : ", error);
    res.status(500).json({ error: "유저를 삭제하는 도중 오류가 발생했습니다." });
  }
};

const loginMenteeUser = async (req, res) => {
  try {
    const { mentee_id, mentee_pw } = req.body;

    const user = await Mentee.findOne({ mentee_id: mentee_id });

    if (!user) {
      return res.status(404).json({ error: "멘티 아이디가 존재하지 않거나 잘못 입력하셨습니다." });
    }

    const isMatch = await bcrypt.compare(mentee_pw, user.mentee_pw);

    if (!isMatch) {
      return res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
    }

    const accessToken = jwt.sign(
      {
        mentee_id: user.mentee_id,
        role: "mentee",
      },
      process.env.MENTEE_ACCESS_SECRET,
      {
        expiresIn: "30m",
        issuer: "About Tech",
      }
    );

    const refreshToken = jwt.sign(
      {
        mentee_id: user.mentee_id,
        role: "mentee",
      },
      process.env.MENTEE_REFRESH_SECRET,
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

    return res.status(200).json({ message: "로그인 성공", accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    console.error("멘티 로그인 실패 : ", error);
    res.status(500).json({ error: "멘티 로그인 기능에 오류가 발생했습니다." });
  }
};

const menteeAccessToken = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ error: "로그인이 필요합니다." });
    }

    const decoded = jwt.verify(token, process.env.MENTEE_ACCESS_SECRET);

    const user = await Mentee.findOne({ mentee_id: decoded.mentee_id });

    if (!user) {
      return res.status(404).json({ error: "해당 멘토를 찾을 수 없습니다." });
    }

    res.status(200).json({
      message: "멘티 정보 조회 성공",
      data: {
        mentee_id: user.mentee_id,
        mentee_nickname: user.mentee_nickname,
        mentee_email: user.mentee_email,
        mentee_phone: user.mentee_phone,
        mentee_position: user.mentee_position,
        mentee_img: user.mentee_img,
      },
    });
  } catch (error) {
    console.error("엑세스 토큰 검증 실패 : ", error);
    res.status(500).json({
      error: "엑세스 토큰 검증 중 오류가 발생했습니다.",
      details: error.message,
    });
  }
};

const menteeRefreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ error: "로그인이 필요합니다." });
    }

    const decoded = jwt.verify(token, process.env.MENTEE_REFRESH_SECRET);

    const user = await Mentee.findOne({ mentee_id: decoded.mentee_id });

    if (!user) {
      return res.status(404).json({ error: "해당 멘토를 찾을 수 없습니다." });
    }

    //access Token 새로 발급..
    const newAccessToken = jwt.sign(
      {
        mentor_id: user.mentor_id,
        role: "mentee",
      },
      process.env.MENTEE_ACCESS_SECRET,
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

const menteeLoginSuccess = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ error: "로그인이 필요합니다." });
    }

    const decoded = jwt.verify(token, process.env.MENTEE_ACCESS_SECRET);

    const user = await Mentee.findOne({ mentee_id: decoded.mentee_id });

    if (!user) {
      return res.status(404).json({ error: "아이디가 일치하지 않습니다." });
    }

    const { mentee_pw, ...userInfo } = user.toObject();

    res.status(200).json(userInfo);
  } catch (error) {
    console.error("실패", error);
    res.status(500).json({ error: "에러" });
  }
};

const menteeLogout = (req, res) => {
  try {
    res.cookie("accessToken", "", {
      expires: new Date(0),
    });
    res.cookie("refreshToken", "", {
      expires: new Date(0),
    });
    res.status(200).json({ message: "로그아웃 성공" });
  } catch (error) {
    console.error("로그아웃 실패");
    res.status(500).json({ error: "로그아웃 실패했습니다." });
  }
};

module.exports = {
  loginMenteeUser,
  menteeAccessToken,
  menteeRefreshToken,
  menteeLoginSuccess,
  menteeLogout,
  createMenteeUser,
  getAllMenteeUser,
  getMenteeUserById,
  updateMenteeUserById,
  deleteMenteeUserById,
  upload,
};
