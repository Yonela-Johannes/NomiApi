import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
  post: String,
  userId: String,
  tags: String,
  image: String,
  tags: [String],
  viewCount: {
    type: Number,
    default: 0
  },
  loveCount: {
    type: Number,
    default: 0
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
  supportCount: {
    type: Number,
    default: 0,
  },
  supportedUsers: {
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

const Post = mongoose.model("Post", PostSchema);

export default Post;
