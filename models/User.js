import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    bio: String,
    rate: {
      type: Number,
      default: 1
    },
    ratesCount: {
      type: Number,
      default: 1
    },
    ratedUsers: {
      type: Number,
      default: 2
    },
    viewsCount: {
      type: Number,
      default: 0
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    commentedUsers: {
      type: [String],
      default: []
    },
    shareCount:{
      type: Number,
      default: 0
    },
    supportUsers: {
      type: [String],
      default: [],
    },
    supportCount: {
      type: Number,
      default: 0,
    },
    supportersCount: {
      type: Number,
      default: 0,
    },
    subscribedSupporters: {
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
  },{
    timestamps: true
  }
);

export default mongoose.model("User", UserSchema);
