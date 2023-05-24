import mongoose from "mongoose";

const VideoCommentSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    videoId: {
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

export default mongoose.model("VideoComment", VideoCommentSchema);
