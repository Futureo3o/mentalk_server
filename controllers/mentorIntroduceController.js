const MentorIntroduce = require("../models/mentorIntroduce");
//버튼 클릭 시 화면
    const getMentorIntroduce = async(req,res)=>{
        //URL 요청 받음
        const {mentor_id} = req.params;
        console.log('Received mentor_id:', mentor_id);
        
        try{
            const mentor_intro = await MentorIntroduce.findOne({mentor_id });
            console.log('Received mentor_id:', mentor_intro);
            
            if(!mentor_intro){
                return res.status(404).json({error : '멘토 아이디 조회 실패'});
            }

            res.json(mentor_intro);
        }catch(error){
            res.status(500).json({error:"멘토포스팅 조회 중 오류가 발생했습니다."});
        }
    };

    const createUser = async(req,res) => {
        try {
            const {mentor_id, mentor_title, mentor_content} = req.body
            const newMentor = new MentorIntroduce({mentor_id, mentor_title, mentor_content})
            const saveUser = await newMentor.save()
            res.status(201).json({
                message: "유저 생성 성공",
                data: saveUser,
              });
              console.log("유저 생성 성공");
        }catch (error) {
            console.error("유저 생성 실패 : ", error);
            res.status(500).json({ error: "유저를 생성하는 도중 오류가 발생했습니다." });
          }
        

    }

    const getMentorAllIntroduce = async(req, res) => {
        try {
            const user = await MentorIntroduce.find()

            if(!user) {
                return res.status(500).json({error: "실패"})
            }
            res.json(user)
        } catch(error) {
            console.error("에러")
        }
    }

    // const createMentorIntroduce =async(req,res)=>{
    //     try{
    //         const{mentor_title,mentor_content}=req.body;
    //         const newintro = new MentorIntroduce({mentor_title,mentor_content});

    //         const savedIntro=await newintro.save();
    //         res.status(201).json({message:'포스트가 성공적으로 생성되었습니다.',post:savedIntro});
    //     }catch(error){
    //         console.error('포스트 생성 실패',error);
    //         res.status(500).json({error:'포스트 생성 중 오류가 발생했습니다.'});
    //     }
    // };
    
module.exports = { getMentorIntroduce, getMentorAllIntroduce, createUser };
//createMentorIntroduce