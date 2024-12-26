const Admin = require("../models/admin");

const createAdminUser = async (req, res) => {
  try {
    const { admin_nickname, admin_id, admin_pw, admin_phone, admin_email, admin_access } = req.body;

    const existingAdminId = await Admin.findOne({ admin_id: admin_id });
    const existingAdminEmail = await Admin.findOne({ admin_email: admin_email });

    if (existingAdminId) {
      return res.status(404).json({
        error: "이 ID는 이미 사용중입니다. 다른 ID를 선택해주세요.",
      });
    }

    if (existingAdminEmail) {
      return res.status(404).json({
        error: "이 이메일은 이미 사용 중입니다. 다른 이메일을 선택해주세요.",
      });
    }

    const newAdmin = new Admin({
      admin_nickname,
      admin_id,
      admin_pw,
      admin_phone,
      admin_email,
      admin_access,
    });

    const saveAdmin = await newAdmin.save();
    res.status(201).json({
      message: "관리자가 성공적으로 생성되었습니다.",
      data: saveAdmin,
    });
  } catch (error) {
    console.error("관리자 생성 실패 : ", error);
    res.status(500).json({ error: "관리자 생성 기능 도중 에러가 발생했습니다." });
  }
};

const getAllAdminUser = async (req, res) => {
  try {
    const adminAllUser = await Admin.find();

    const filterAdmin = adminAllUser.map((admin) => {
      const { admin_pw, ...rest } = admin.toObject();
      return rest;
    });

    if (!adminAllUser) {
      return res.status(404).json({ error: "관리자 조회 요청이 실패했습니다." });
    }

    res.status(200).json({ message: "관리자 조회 기능이 성공했습니다.", data: filterAdmin });
  } catch (error) {
    console.error("관리자 조회 실패 : ", error);
    res.status(500).json({ error: "관리자 조회 기능 도중 에러가 발생했습니다." });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { admin_id } = req.body;
    const adminUser = await Admin.findOne({ admin_id: admin_id });
    if (!adminUser) {
      return res.status(404).json("특정 어드민 계정 조회 실패");
    }

    const { admin_pw, ...rest } = adminUser.toObject();

    res.status(200).json({ message: "어드민 조회 성공하였습니다.", data: rest });
  } catch (error) {
    console.error("특정 어드민 계정 조회 실패 : ", error);
    res.status(500).json({ error: "어드민 특정 계정 조회 기능 도중 에러가 발생했습니다." });
  }
};

module.exports = { createAdminUser, getAllAdminUser, getAdminById };
