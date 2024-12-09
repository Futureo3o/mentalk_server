const mongoose = require("mongoose");

const mentorIntroSchema = new mongoose.Schema(
    {
      mentor_title: { type : String , required: true },
      mentor_content : {type : String, required: true},

    },
    { timestamps: true }
  );
  

const MentorIntro = mongoose.model("MentorIntro", mentorIntroSchema);

module.exports = MentorIntro;