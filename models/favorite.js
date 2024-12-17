const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    mentor_id: {
        type: String,
        ref: 'Mentor', 
        required: true,
      },
      mentee_id: {
        type: String,  
        required: true,
      }
  },
  { timestamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
