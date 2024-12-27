const Favorite = require("../models/favorite");
const Mentor = require("../models/mentor");

//북마크 추가
const addFavorite = async (req, res) => {
  const { mentor_id } = req.params;
  const { mentee_id } = req.body;

  try {
    const mentor = await Mentor.findOne({ mentor_id });
    if (!mentor) {
      return res.status(404).json({
        error: "멘토를 찾을 수 없습니다.",
        message: "해당 멘토는 존재하지 않습니다.",
      });
    }

    const existingFavorite = await Favorite.findOne({ mentor_id, mentee_id });
    if (existingFavorite) {
      return res.status(400).json({
        error: "이미 즐겨찾기에 추가된 멘토입니다..",
        message: "해당 멘토는 이미 즐겨찾기 리스트에 있습니다.",
      });
    }

    const newFavorite = new Favorite({
      mentor_id,
      mentee_id,
    });

    await newFavorite.save();

    mentor.mentor_favorite_count+=1;
    await mentor.save();

    res.status(200).json({
      message: "멘토 자기소개 페이지가 즐겨찾기에 추가되었습니다.",
      mentor_id,
      mentee_id,
      favorite_count:mentor.mentor_favorite_count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "서버 오류",
      message: "즐겨찾기 추가 중 오류가 발생했습니다.",
    });
  }
};
// 북마크 체크
const getFavoritescheck = async (req, res) => {
  const { mentor_id, mentee_id } = req.params;
  try {
    const favoriteCheck = await Favorite.findOne({
      mentor_id: mentor_id,
      mentee_id: mentee_id,
    });
    if (favoriteCheck) {
      return res.status(200).json({ check: true });
    } else {
      return res.status(200).json({ check: false });
    }
  } catch (error) {
    res.status(500).json({ message: "즐겨찾기 조회 중 오류 발생", error: error });
  }
}

//북마크 리스트 조회
const getFavorites = async (req, res) => {
  const { mentee_id } = req.params;

  try {
    const favorites = await Favorite.find({ mentee_id });

    if (favorites.length === 0) {
      return res.status(404).json({
        error: "즐겨찾기 목록이 없습니다.",
        message: "이 멘티는 아직 즐겨찾기를 하지 않았습니다.",
      });
    }

    const mentorIds = favorites.map((fav) => fav.mentor_id);
    const mentors = await Mentor.find({ mentor_id: { $in: mentorIds } });

    const favoritesWithMentors = favorites.map((fav) => {
      const mentor = mentors.find((m) => m.mentor_id === fav.mentor_id);
      return {
        ...fav.toObject(),
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
      };
    });

    res.status(200).json({
      message: "멘토의 즐겨찾기 목록을 조회했습니다.",
      favorites: favoritesWithMentors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "서버 오류",
      message: "즐겨찾기 목록 조회 중 오류가 발생했습니다.",
    });
  }
};

//북마크 취소
const removeFavorite = async (req, res) => {
    const { mentor_id } = req.params;
    const { mentee_id } = req.body;
  
    try {
      const favorite = await Favorite.findOneAndDelete({ mentor_id, mentee_id });
      
      if (!favorite) {
        return res.status(404).json({
          error: '즐겨찾기 항목을 찾을 수 없습니다.',
          message: '이 멘티는 해당 멘토를 즐겨찾기에 추가한 적이 없습니다.',
        });
      }
      const mentor =await Mentor.findOne({mentor_id});
      mentor.mentor_favorite_count-=1;
      await mentor.save();

      res.status(200).json({
        message: '멘토가 즐겨찾기에서 제거되었습니다.',
        mentor_id,
        mentee_id,
         favorite_count:mentor.mentor_favorite_count,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: '서버 오류',
        message: '즐겨찾기 삭제 중 오류가 발생했습니다.',
 
    });
  }
};

module.exports = { addFavorite, getFavorites, removeFavorite, getFavoritescheck };
