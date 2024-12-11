const MentorIntroduce = require("../models/mentorIntroduce");
//버튼 클릭 시 화면
    const getMentorIntroduce = async(req,res)=>{
        //URL 요청 받음
        const {mentor_id} = req.params;        
        try{
            const mentor_intro = await MentorIntroduce.findOne({mentor_id});
            
            if(!mentor_intro){
                return res.status(404).json({error : '멘토 아이디 조회 실패',     
                    message: '멘토 정보가 없습니다. 글 작성을 진행해주세요.',
                });
            }

            res.json({
               mentor_intro:mentor_intro
        });
        }catch(error){
            res.status(500).json({error:"멘토포스팅 조회 중 오류가 발생했습니다."});
        }
    };


module.exports = { getMentorIntroduce };
