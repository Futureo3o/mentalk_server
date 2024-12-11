const mongoose = require("mongoose");

//리뷰 
const reviewSchema = new mongoose.Schema(
    {
        //커피챗 구현 시 유니크 아이디
      coffeechat_id :{type :String ,require:true},
      mentee_id:{type: String , ref: "Mentee",required:true},
      review_content:{type:String, required:true},
      review_rating:{type:Number,required:true,min:1,max:5},
    },
    { timestamps: true }
  );
  

const review = mongoose.model("review", reviewSchema);

module.exports = review;