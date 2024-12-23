const Review = require("../models/review");
const CoffeeChat = require("../models/coffeeChat");
const MentorIntroduce = require("../models/mentorIntroduce");
const Mentor = require("../models/mentor");
const Mentee = require("../models/mentee");

const createReview = async (req, res) => {
    try {
      const { coffeechat_id, mentee_id } = req.params;
      const { review_content, review_rating } = req.body;
  
      if (!review_content || !review_rating) {
        return res.status(400).json({ message: '리뷰 콘텐츠와 평점은 반드시 입력해야 합니다.' });
      }
  
      if (review_rating < 1 || review_rating > 5) {
        return res.status(400).json({ message: '리뷰 평점은 1에서 5 사이여야 합니다.' });
      }
  
      const coffeeChat = await CoffeeChat.findById(coffeechat_id);
      if (!coffeeChat) return res.status(404).json({ message: '커피챗을 찾을 수 없습니다.' });
  
      const mentee = await Mentee.findOne({ mentee_id: mentee_id });
      if (!mentee) return res.status(404).json({ message: '멘티를 찾을 수 없습니다.' });
  
      const mentor_id = coffeeChat.mentor_id;  
      const introduce_id = coffeeChat.introduce_id;  
      const mentee_nickname = mentee.mentee_nickname;  
      const newReview = new Review({
        coffeechat_id,
        introduce_id,
        mentor_id,
        mentee_id,
        mentee_nickname,
        review_content,
        review_rating,
      });
  
      await newReview.save();
  
      res.status(200).json({ message: '리뷰가 성공적으로 작성되었습니다.' ,
        review_content,
      review_rating,
      mentee_id,
      coffeechat_id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };
  

//멘토로 조회!
const getReviewByMentor = async (req, res) => {
    const { mentor_id } = req.params; 
    
    try {
     
      const reviews = await Review.find({ mentor_id: mentor_id });
  
      if (reviews.length === 0) {
        return res.status(404).json({ message: '이 멘토에 대한 리뷰가 없습니다.' });
      }
  
      res.status(200).json({
        message: '멘토에 대한 모든 리뷰를 조회했습니다.',
        reviews: reviews,  
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };

  //멘티 조회
  const getReviewByMentee = async (req, res) => {
    const { mentee_id } = req.params; 
    
    try {
      const reviews = await Review.find({ mentee_id: mentee_id });
  
      if (reviews.length === 0) {
        return res.status(404).json({ message: '이 멘티에 대한 리뷰가 없습니다.' });
      }
  
      res.status(200).json({
        message: '멘티에 대한 모든 리뷰를 조회했습니다.',
        reviews: reviews,  
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };
  
  const getReviewByIntroduce = async (req, res) => {
    const { introduce_id } = req.params;  // 자기소개 페이지 고유 키
    
    try {
      // introduce_id 기준으로 리뷰 조회
      const reviews = await Review.find({ introduce_id: introduce_id });
  
      if (reviews.length === 0) {
        return res.status(404).json({ message: '이 자기소개 페이지에 대한 리뷰가 없습니다.' });
      }
  
      res.status(200).json({
        message: '자기소개 페이지에 대한 모든 리뷰를 조회했습니다.',
        reviews: reviews,  // 리뷰 내용만 반환
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };
  const updateReview = async (req, res) => {
    const { review_id } = req.params;  
    const { review_content, review_rating } = req.body; 
    
    try {
      const review = await Review.findById(review_id);
      if (!review) {
        return res.status(404).json({ message: '리뷰를 찾을 수 없습니다.' });
      }
  
      if (!review_content || !review_rating) {
        return res.status(400).json({ message: '리뷰 콘텐츠와 평점은 반드시 입력해야 합니다.' });
      }
  
      if (review_rating < 1 || review_rating > 5) {
        return res.status(400).json({ message: '리뷰 평점은 1에서 5 사이여야 합니다.' });
      }
  
      review.review_content = review_content;
      review.review_rating = review_rating;
  
      await review.save();
  
      res.status(200).json({ message: '리뷰가 성공적으로 수정되었습니다.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };
  const deleteReview = async (req, res) => {
    const { review_id } = req.params;  
    
    try {
     
      const review = await Review.findById(review_id);
      if (!review) {
        return res.status(404).json({ message: '리뷰를 찾을 수 없습니다.' });
      }
  
    
      await Review.deleteOne({ _id: review_id });
  
      res.status(200).json({ message: '리뷰가 성공적으로 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };
  
  


module.exports = { createReview, getReviewByMentor,getReviewByMentee,getReviewByIntroduce,updateReview,deleteReview};


