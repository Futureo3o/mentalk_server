const mongoose = require("mongoose");

const mentorIntroduceSchema = new mongoose.Schema(
    {
      mentor_id:{type: String , required:true},
      mentor_title: { type : String , required: true },
      mentor_content : {type : String, required: true},

    },
    { timestamps: true }
  );
  

const MentorIntroduce = mongoose.model("MentorIntroduce", mentorIntroduceSchema);

module.exports = MentorIntroduce;