const Favorite = require('../models/favorite');
const Mentor = require('../models/mentor');

//북마크 추가
const addFavorite = async (req, res) => {
  const { mentor_id } = req.params;
  const { mentee_id } = req.body;

  try {
    const mentor = await Mentor.findOne({ mentor_id });
    if (!mentor) {
      return res.status(404).json({
        error: '멘토를 찾을 수 없습니다.',
        message: '해당 멘토는 존재하지 않습니다.',
      });
    }

    const existingFavorite = await Favorite.findOne({ mentor_id, mentee_id });
    if (existingFavorite) {
      return res.status(400).json({
        error: '이미 즐겨찾기에 추가된 멘토입니다.',
        message: '해당 멘토는 이미 즐겨찾기 리스트에 있습니다.',
      });
    }

    const newFavorite = new Favorite({
      mentor_id,
      mentee_id,
    });

    await newFavorite.save();
    res.status(200).json({
      message: '멘토 자기소개 페이지가 즐겨찾기에 추가되었습니다.',
      mentor_id,
      mentee_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: '서버 오류',
      message: '즐겨찾기 추가 중 오류가 발생했습니다.',
    });
  }
};

//북마크 조회
const getFavorites = async (req, res) => {
  const { mentee_id } = req.params;

  try {
    const favorites = await Favorite.find({ mentee_id }); 

    if (favorites.length === 0) {
      return res.status(404).json({
        error: '즐겨찾기 목록이 없습니다.',
        message: '이 멘티는 아직 즐겨찾기를 하지 않았습니다.',
      });
    }

   
    const mentorIds = favorites.map(fav => fav.mentor_id); 
    const mentors = await Mentor.find({ mentor_id: { $in: mentorIds } }); 

   
    const favoritesWithMentors = favorites.map(fav => {
      const mentor = mentors.find(m => m.mentor_id === fav.mentor_id);
      return {
        ...fav.toObject(),  
        mentor_title: mentor ? mentor.mentor_title : null,
        mentor_content: mentor ? mentor.mentor_content : null,
        mentor_rating: mentor ? mentor.mentor_rating : null
      };
    });

    res.status(200).json({
      message: '멘토의 즐겨찾기 목록을 조회했습니다.',
      favorites: favoritesWithMentors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: '서버 오류',
      message: '즐겨찾기 목록 조회 중 오류가 발생했습니다.',
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
  
      res.status(200).json({
        message: '멘토가 즐겨찾기에서 제거되었습니다.',
        mentor_id,
        mentee_id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: '서버 오류',
        message: '즐겨찾기 삭제 중 오류가 발생했습니다.',
      });
    }
  };
  
  module.exports = { addFavorite,getFavorites,removeFavorite };
  
  