import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
  title: String,
  header: String,
  message: String,
  userId: String,
  tags: String,
  cover: String,
  image: String,
  cover: String,
  viewCount: {
    type: Number,
    default: 0
  },
  loveCount: {
    type: Number,
    default: 0
  },
  supportBlog: {
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

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
