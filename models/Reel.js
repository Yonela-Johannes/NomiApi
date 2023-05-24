import mongoose from "mongoose";

const ReelSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    supportVideo: {
      type: [String],
      default: [],
    },
    supportCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    commentedUsers: {
      type: [String]
    },
    playCount: {
      type: Number,
      default: 0,
    },
    playedUser: {
      type: [String]
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    viewsUsers: {
      type: [String]
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
    },
    tags: {
      type: [String],
      default: []
    },
    shareCount:{
      type: Number,
      default: 0
    },
    tagUsers: [String],
  },{
    timestamps: true
  }
);

export default mongoose.model("Reel", ReelSchema);
