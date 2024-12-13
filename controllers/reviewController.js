const Mentee = require('../models/mentee');
const Review = require("../models/review");
const CoffeeChat = require("../models/coffeeChat"); 
const MentorIntroduce=require('../models/mentorIntroduce');

//리뷰 작성
const createReview = async(req,res)=>{
    const{mentee_id,coffeechat_id}=req.params
    const {review_content,review_rating}=req.body;
    if(!review_content || !review_rating || !coffeechat_id || !mentee_id){
        return res.status(400).json({
            error:"모든 내용을 채워주세요",
            message:"커피챗 아이디, 멘티 아이디, 리뷰 내용, 리뷰 평점이 포함되어야합니다."
        });
    }
    try{
        const mentee = await Mentee.findOne({mentee_id:mentee_id});
        if (!mentee) {
            return res.status(404).json({
              error: "멘티를 찾을 수 없습니다.",
              message: "해당 멘티 아이디에 해당하는 멘티가 존재하지 않습니다."
            });
          }
        const mentee_nickname =mentee.mentee_nickname;

        const newReview =new Review({
            coffeechat_id,
            mentee_id,
            mentee_nickname,
            review_content,
            review_rating,
        });

        const savedReview = await newReview.save();

        res.status(201).json({
            message:'리뷰 저장 완료',
            coffeechat_id :savedReview.coffeechat_id, 
            mentee_id: savedReview.mentee_id,
            mentee_nickname:savedReview.mentee_nickname,
            review_content: savedReview.review_content,
            review_rating: savedReview.review_rating,
        
        });
    }catch(error){
        console.error('리뷰 저장 실패:',error);
        res.status(500).json({error: '리뷰 저장 중 오류 발생'});
    }
};
// 멘티 모든 리뷰 조회
const getReview_mentee_All =async (req,res) =>{
    const {mentee_id}= req.params;
    try{
        const reviews =await Review.find({mentee_id}
           
        );

        if(reviews.length===0){
            return res. status(404).json({
                error:"리뷰가 없습니다",
                message : "해당 멘티 아이디에 대한 리뷰가 존재하지 않습니다."
            });
        }
        return res.status(200).json({
            message:"리뷰 목록 리스트 성공",
            reviews: reviews ,
        });
    }catch(error){
        return res.status(500).json({
            error:'서버 오류',
            message:'리뷰 조회 중 문제가 발생했습니다.'
        });
    }
};
// 멘토 모든 리뷰 조회
const getReview_mentor_All =async (req,res) =>{
    const  {mentor_id}  = req.params;
       try{
            const mentorIntroduce_id = await MentorIntroduce.find({mentor_id:mentor_id});
            //멘토 아이디 유무 확인
            if(!mentorIntroduce_id || mentorIntroduce_id.length ===0){
                return res.status(404).json ({message:"멘토의 소개 페이지가 존재하지 않습니다."});
            }
            // 소개페이지 아이디와 일치하는 커피챗 확인
            const coffee_Chats =await CoffeeChat.find({
                mentor_id:mentor_id,
                introduce_id:{$in: mentorIntroduce_id.map(introduce_id =>introduce_id._id)}
            });
            // 커피챗 존재 유뮤 확인인
            if(!coffee_Chats||coffee_Chats.length===0){
                return res.status(404).json({message : "해당 멘토의 커피챗이 없습니다."});
            }
            
            const coffee_ChatsId=coffee_Chats.map(chat=>chat._id);
            const reviews= await Review.find({coffeechat_id:{$in: coffee_ChatsId}}).populate("mentee_id","mentee_nickname");
       
            res.json(reviews);
        }catch(error){
            res.status(500).json({message:"서버 오류"});
       }
};
//멘티 특정 리뷰 조회
const getReview =async(req,res)=>{
    const {mentee_id,coffeechat_id}= req.params;
   try{
    const mentee_review = await Review.findOne({mentee_id,coffeechat_id});

    if(!mentee_review){
        return res.status(404).json({error : '멘티 아이디 조회 실패',
            message:'리뷰 정보가 없습니다. 리뷰 작성을 진행해주세요.',
        });
    }
    res.json({
       mentee_review:mentee_review
    });
   }catch(error){
        res.status(500).json({error:'리뷰 조회 중 오류가 발생했습니다.'});
   }
};
//리뷰 수정
const updateReview = async(req,res)=>{
    const {mentee_id,coffeechat_id}= req.params;
    const{review_content,review_rating}=req.body;
    
    if(!review_content || !review_rating){
        return res.status(400).json({
            error: '필수 내용이 없습니다.',
            message: '내용과 평점을 모두 작성해야합니다.'
        });
    }
    try{
        const review_update= await Review.findOneAndUpdate(
            {mentee_id : mentee_id,coffeechat_id:coffeechat_id},
            {$set:{review_content:review_content,
                review_rating:review_rating,
            }
        },
            {new :true},
        );
        if(!review_update){
            return res.status(404).json({
                error: '리뷰가 없습니다.',
                message:'해당하는 리뷰가 없습니다.'
            })
        }
        return res.status(200).json({
            message: '리뷰 업데이트 되었습니다.',
            review_content:review_update.review_content,
            review_rating:review_update.review_rating,
        });
    }catch(error){

        console.error(error);
        return res.status(500).json({
            error:'서버 오류',
            message: '리뷰 업데이트 중 문제가 발생했습니다.'
        });
    }
};

//리뷰 삭제
const deleteReview =async(req,res)=>{
    const {mentee_id,coffeechat_id}= req.params;
    try{
        const del_review = await Review.deleteOne({
            mentee_id:mentee_id,
            coffeechat_id:coffeechat_id
        });
        if (del_review.deletedCount === 0){
            return res.status(404).json({
                error:'리뷰를 찾을 수 없습니다.',
                message:'해당 리뷰가 존재하지 않습니다.'
            });
        }
        return res.status(200).json({
            message: '리뷰가 삭제되었습니다.',
        });
    }catch(error){
        return res.status(500).json({
            error:'서버 오류',
            message: '리뷰 삭제 중 문제가 발생하였습니다.'
        });
    }
}


module.exports = { createReview, getReview, updateReview,deleteReview,getReview_mentee_All,getReview_mentor_All};
