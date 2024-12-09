const MentorIntro = require("../models/mentorIntro");
//버튼 클릭 시 화면
    const getMentorIntro = async(req,res)=>{
        try{
            const intros = await MentorIntro.find();

            res.status(200).send("test");
        }catch(error){
            console.error('포스트 조회 실패:',error);
            res.status(500).json({error:"포스트 조회 중 오류가 발생했습니다."});
        }
    };

    const createMentorIntro =async(req,res)=>{
        try{
            const{mentor_title,mentor_content}=req.body;
            const newintro = new MentorIntro({mentor_title,mentor_content});

            const savedIntro=await newintro.save();
            res.status(201).json({message:'포스트가 성공적으로 생성되었습니다.',post:savedIntro});
        }catch(error){
            console.error('포스트 생성 실패',error);
            res.status(500).json({error:'포스트 생성 중 오류가 발생했습니다.'});
        }
    };
      module.exports={
        getMentorIntro,
        createMentorIntro
      }  ;
//포스팅 글 작성

//포스팅 글 수정

//포스팅 글 삭제


module.exports = { createMentorIntro, getMentorIntro };


