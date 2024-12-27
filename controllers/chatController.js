const Chat = require("../models/chat");

const getChat = async (req, res) => {
  try {
    const { coffeechat_id } = req.params;
    const chatList = await Chat.find({ coffeechat_id: coffeechat_id });
    res.status(200).json({ message: "이전 채팅 로딩 성공", data: chatList });
  } catch (error) {
    console.error("조회 실패 : ", error);
    res.status(500).json({ error: "이전 채팅 로드 실패." });
  }
};

module.exports = { getChat };
