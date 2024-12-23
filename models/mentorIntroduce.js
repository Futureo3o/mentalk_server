const mongoose = require("mongoose");

const mentorIntroduceSchema = new mongoose.Schema(
    {
      mentor_id:{type: String , ref: "Mentor",required:true},
      introduce_title: { type : String , required: true },
      introduce_content : {type : String, required: true},
      review_count : {type:Number, default: 0},
      coffeechat_count:{type:Number,default:0},
      introduce_rating:{type:Number,default:0},
      //태그
      tags: { type: [String], default: [] },
    },
    { timestamps: true }
  );
  

const MentorIntroduce = mongoose.model("MentorIntroduce", mentorIntroduceSchema);

module.exports = MentorIntroduce;