import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    title: {
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
    cover: {
      type: String,
      required: true,
    },
    musicUrl: {
      type: String,
      required: true,
    },
    artists: [String],
    producer: String,
    beatMaker: String,
    genre: String,
    supportMusic: {
      type: [String],
      default: [],
    },
    supportCount: {
      type: Number,
      default: 0,
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
    shareCount:{
      type: Number,
      default: 0
    }
  },{
    timestamps: true
  }
);

export default mongoose.model("Music", MusicSchema);
