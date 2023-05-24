import mongoose from 'mongoose'

const extendedPlaySchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    releasedDate: {
      type: Date,
      required: true
    },
    ePId: {
      type: String,
      required: true,
    },
    tracks: {
      type: [String],
      required: true,
    },
    artists: {
      type: [String],
    },
    supportMusicEP: {
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
    shareCount:{
      type: Number,
      default: 0
    },
    tags: {
      type: [String],
      default: [],
    }
  },
  {timestamps: true
});

export default mongoose.model("MusicEP", extendedPlaySchema)
