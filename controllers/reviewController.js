const Review = require("../models/review");

//리뷰 작성
const createReview = async(req,res)=>{
    const {review_content,review_rating,mentee_id}=req.body;
    if(!review_content||!review_rating){
        return res.status(400).json({error:"리뷰 내용과 평점은 필수"});
    }
    try{
        const newReview =new Review({
            review_content:review_content,
            review_rating:review_rating,
            mentee_id: mentee_id,
        });

        const savedReview = await newReview.save();
        res.status(201).json({
            message:'리뷰 저장 완료', 
            review_content: savedReview.review_content,
            review_rating: savedReview.review_rating,
            mentee_id: savedReview.mentee_id,});
    }catch(error){
        console.error('리뷰 저장 실패:',error);
        res.status(500).json({error: '리뷰 저장 중 오류 발생'});
    }
};
//리뷰 요청
const getReview =async(req,res)=>{
   const {mentee_id}= req.params;
   try{
    const mentee_review = await Review.findOne({mentee_id});

    if(!mentee_review){
        return res.status(404).json({error : '멘티 아이디 조회 실패',
            message:'리뷰 정보가 없습니다. 리뷰 작성을 진행해주세요.',
        });
    }
    res.json({
        mentee_id:mentee_review.mentee_id,
        review_content: mentee_review.review_content,
        review_rating:mentee_review.review_rating,
    });
   }catch(error){
        res.status(500).json({error:'리뷰 조회 중 오류가 발생했습니다.'});
   }
};
//리뷰 수정


module.exports = { createReview,getReview };
