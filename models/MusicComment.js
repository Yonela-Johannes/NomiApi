import mongoose from "mongoose";

const MusicCommentSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    musicId: {
      type: String,
      required: true
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    likedUsers: {
      type: [String]
    },
    loveCount: {
      type: Number,
      default: 0,
    },
    lovedUsers: {
      type: [String]
    }
  },{
    timestamps: true
  }
);

export default mongoose.model("MusicComment", MusicCommentSchema);
