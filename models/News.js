import mongoose from 'mongoose';

const newsSchema = mongoose.Schema({
  title: String,
  header: String,
  message: String,
  userId: String,
  image: String,
  viewCount: {
    type: Number,
    default: 0
  },
  loveCount: {
    type: Number,
    default: 0
  },
  supportNews: {
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

const News = mongoose.model("News", newsSchema);

export default News;
