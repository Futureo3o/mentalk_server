const mongoose = require("mongoose");

const mentorIntroduceSchema = new mongoose.Schema(
    {
      mentor_id:{type: String , ref: "Mentor",required:true},
      mentor_title: { type : String , required: true },
      mentor_content : {type : String, required: true},
      review_count : {type:Number, default: 0},
      coffeechat_count:{type:Number,default:0},
      mentor_rating:{type:Number,default:0},
    },
    { timestamps: true }
  );
  

const MentorIntroduce = mongoose.model("MentorIntroduce", mentorIntroduceSchema);

module.exports = MentorIntroduce;