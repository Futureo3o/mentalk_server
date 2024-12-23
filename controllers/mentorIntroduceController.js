const MentorIntroduce = require("../models/mentorIntroduce");
const Mentor = require("../models/mentor");
//멘토 아이디로 자기 소개페이지 리스트 조회
    const getMentorIntroduce = async(req,res)=>{
        //URL 요청 받음
        const {mentor_id} = req.params;        
        try{
            const mentor_introduce = await MentorIntroduce.findOne({mentor_id});
            
            if(!mentor_introduce){
                return res.status(404).json({error : '멘토 아이디 조회 실패',     
                    message: '멘토 정보가 없습니다. 글 작성을 진행해주세요.',
                });
            }
            const mentor_info =await Mentor.findOne({mentor_id});
            if(!mentor_info){
                return res.status(404).json({
                    error:"멘토 아이디 조회 실패",
                    message: "멘토 기본 정보가 없습니다."
                })
            }
            const result = {
                mentor_id: mentor_introduce.mentor_id,
                introduce_title: mentor_introduce.introduce_title,
                introduce_content: mentor_introduce.introduce_content,
                review_count: mentor_introduce.review_count,
                coffeechat_count: mentor_introduce.coffeechat_count,
                introduce_rating: mentor_introduce.introduce_rating,
                tags: mentor_introduce.tags,
                mentor_nickname: mentor_info.mentor_nickname,
                mentor_email: mentor_info.mentor_email,
                mentor_phone: mentor_info.mentor_phone,
                mentor_company: mentor_info.mentor_company,
                mentor_position: mentor_info.mentor_position,
                mentor_img: mentor_info.mentor_img,  
                mentor_career: mentor_info.mentor_career,
                mentor_is_checked: mentor_info.mentor_is_checked,
                mentor_social_login: mentor_info.mentor_social_login,
                mentor_gender: mentor_info.mentor_gender,
                mentor_warnning_count: mentor_info.mentor_warnning_count,
                mentor_favorite_count: mentor_info.mentor_favorite_count,
                mentor_suspension: mentor_info.mentor_suspension,
              };
            res.json(result);
        }catch(error){
            res.status(500).json({error:"멘토포스팅 조회 중 오류가 발생했습니다."});
        }
    };

//자기 소개페이지 리스트 조회

const getMentorIntroduceList =async(req,res)=>{
    try{
        const IntroduceList =await MentorIntroduce.find();

        if(IntroduceList.length === 0 )
        {
            return res.status(404).json({message:"자기 소개페이지가 존재하지 않습니다."});
        }
        const resultList =await Promise.all(
            IntroduceList.map(async(introduce)=>{
                const mentor =await Mentor.findOne({mentor_id:introduce.mentor_id});

                if(mentor){
                    return{
                        ...introduce.toObject(),
                        mentor:mentor,
                    };
                }else{
                    return{
                        ...introduce.toObject(),
                        mentor:null,
                    };
                }
            })
        )
        return res.status(200).json(resultList);

    }catch(error){
        return res.status(500).json({message: "서버 에러"});
    }
}

    //멘토 자기소개페이지 작성
    const postMentorIntroduce =async(req,res)=>{
        const {mentor_id}=req.params;
        const{introduce_title,introduce_content,tags}=req.body;


        if (!introduce_title || !introduce_content||!tags||!Array.isArray(tags)) {
            return res.status(400).json({
              error: "모든 내용을 채워주세요",
              message: "멘토 소개 제목, 내용, 그리고 태그를 모두 입력해야 합니다."
            });
          }


          try{
            const mentor_check =await Mentor.findOne({mentor_id:mentor_id});
            if (!mentor_check) {
                return res.status(404).json({
                  error: "멘토를 찾을 수 없습니다.",
                  message: "해당 멘토 아이디에 해당하는 멘토가 존재하지 않습니다."
                });
              }


              const newMentorIntroduce = new MentorIntroduce({
                mentor_id,
                introduce_title,
                introduce_content,
                tags
              });
              const savedMentorIntroduce = await newMentorIntroduce.save();
              res.status(201).json({
                message: "멘토 자기소개 페이지 작성 완료",
                mentor_id: savedMentorIntroduce.mentor_id,
                introduce_title: savedMentorIntroduce.introduce_title,
                introduce_content: savedMentorIntroduce.introduce_content,
                tags:savedMentorIntroduce.tags,
                review_count: savedMentorIntroduce.review_count,
                coffeechat_count: savedMentorIntroduce.coffeechat_count,
                introduce_rating: savedMentorIntroduce.introduce_rating,
              });
              
          }catch (error) {
            console.error("멘토 자기소개 작성 중 오류 발생:", error);
            res.status(500).json({
              error: "서버 오류",
              message: "멘토 자기소개 페이지 작성 중 문제가 발생했습니다."
            });

    }
}

//멘토 자기소개 수정
const updateMentorIntroduce= async(req,res)=>{
    const {mentor_id}=req.params;
    const{introduce_title,introduce_content,tags}=req.body;

    if (!introduce_title || !introduce_content||(tags && !Array.isArray(tags))) {
        return res.status(400).json({
            error: "자기소개 페이지 내용이없습니다.",
            message: "멘토 소개 페이지 내용과 태그가 없습니다."
        });
    }
    try{
        const mentor_check = await Mentor.findOne({ mentor_id: mentor_id });
     
        if (!mentor_check) {
            return res.status(404).json({
                error: "멘토를 찾을 수 없습니다.",
                message: "해당 멘토 아이디에 해당하는 멘토가 존재하지 않습니다."
            });
        }
        const updatedMentorIntroduce = await MentorIntroduce.findOneAndUpdate(
            { mentor_id }, 
            { 
                introduce_title,   
                introduce_content, 
                tags,
            },
            { new: true } 
        );
        if (!updatedMentorIntroduce) {
            return res.status(404).json({
                error: "수정할 멘토 자기소개를 찾을 수 없습니다.",
                message: "해당 멘토 자기소개가 존재하지 않거나 수정할 수 없습니다."
            });
        }
        res.status(200).json({
            message: "멘토 자기소개 수정 완료",
            mentor_id: updatedMentorIntroduce.mentor_id,
            introduce_title: updatedMentorIntroduce.introduce_title,
            tags: updatedMentorIntroduce.tags,
            introduce_content: updatedMentorIntroduce.introduce_content,
            review_count: updatedMentorIntroduce.review_count,
            coffeechat_count: updatedMentorIntroduce.coffeechat_count,
            mentor_rating: updatedMentorIntroduce.mentor_rating,
        });
    }catch (error) {
        console.error("멘토 자기소개 수정 중 오류 발생:", error);
        res.status(500).json({
            error: "서버 오류",
            message: "멘토 자기소개 수정 중 문제가 발생했습니다."
        });
    }

};


module.exports = { getMentorIntroduce,postMentorIntroduce,updateMentorIntroduce,getMentorIntroduceList };
