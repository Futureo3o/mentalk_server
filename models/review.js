const mongoose = require("mongoose");

//리뷰 
const reviewSchema = new mongoose.Schema(
    {
        //커피챗 구현 시 아이디 추가
      mentee_id:{type: String , ref: "Mentee",required:true},
      review_content:{type:String, required:true},
      review_rating:{type:Number,required:true,min:1,max:5},
    },
    { timestamps: true }
  );
  

const review = mongoose.model("review", reviewSchema);

module.exports = review;