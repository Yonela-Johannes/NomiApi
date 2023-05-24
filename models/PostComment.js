import mongoose from "mongoose";

const PostCommentSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    postMessageId: {
      type: String,
      required: true
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    likedUsers: {
      type: [String],
      default: []
    },
    loveCount: {
      type: Number,
      default: 0,
    },
    lovedUsers: {
      type: [String],
      default: []
    }
  },{
    timestamps: true
  }
);

export default mongoose.model("PostComment", PostCommentSchema);
