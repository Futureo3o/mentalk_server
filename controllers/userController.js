const User = require("../models/user");

// 유저 생성
const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    const saveUserd = await newUser.save();
    res.status(201).json({
      message: "유저 생성 성공",
      data: saveUserd,
    });
    console.log("유저 생성 성공");
  } catch (error) {
    console.error("유저 생성 실패 : ", error);
    res.status(500).json({ error: "유저를 생성하는 도중 오류가 발생했습니다." });
  }
};

// 모든 유저 데이터 조회
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("유저 목록 가져오기 실패 : ", error);
    res.status(500).json({ error: "유저 목록을 가져오는 도중 오류가 발생했습니다." });
  }
};

// 특정 이름으로 유저 데이터 조회
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "유저를 찾을 수 없습니다." });
    }
    res.json(user);
  } catch (error) {
    console.error("유저 조회 실패 : ", error);
    res.status(500).json({ error: "유저를 조회하는 도중 오류가 발생했습니다." });
  }
};

//특정 id로 유저 데이터 수정
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "유저를 찾을 수 없습니다." });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;

    await user.save();
    res.status(200).json({ message: "유저가 성공적으로 수정되었습니다." });
  } catch (error) {
    console.error("유저 수정 실패 : ", error);
    res.status(500).json({ error: "유저를 업데이트하는 도중 오류가 발생했습니다." });
  }
};

// 특정 id로 유저 삭제
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "유저를 찾을 수 없습니다." });
    }

    //유저가 존재하면 삭제
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "유저가 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("유저 삭제 실패 : ", error);
    res.status(500).json({ error: "유저를 삭제하는 도중 오류가 발생했습니다." });
  }
};

module.exports = { getAllUsers, getUserById, createUser, deleteUser, updateUser };
