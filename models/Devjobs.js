import mongoose from 'mongoose';

const devSchema = mongoose.Schema({
  title: String,
  message: String,
  userId: String,
  tags: {
    type: [String],
    default: [],
  },
  image: String,
  email: String,
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
  shareCount:{
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
});

const Devjobs = mongoose.model("Devjobs", devSchema);

export default Devjobs;
