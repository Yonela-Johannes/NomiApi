import mongoose from 'mongoose';

const devSchema = mongoose.Schema({
  title: String,
  message: String,
  userId: String,
  tags: String,
  image: String,
  viewCount: {
    type: Number,
    default: 0
  },
  loveCount: {
    type: Number,
    default: 0
  },
  supportDev: {
    type: [String],
    default: [],
  },
  supportCount: {
    type: Number,
    default: 0,
  },
  lovedUsers: {
    type: [String],
    default: []
  },
  likeCount: {
    type: Number,
    default: 0
  },
  likedUsers: {
    type: [String],
    default: []
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
  createdAt: {
    type: Date,
    default: new Date()
  },
});

const Dev = mongoose.model("Dev", devSchema);

export default Dev;
