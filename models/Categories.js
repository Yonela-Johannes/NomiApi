import mongoose from "mongoose";

const Categories = new mongoose.Schema({
  admin: String
  writers: {
    type: [String],
    default: [],
  },
  artists: {
    type: [String],
    default: [],
  },
  developers: {
    type: [String],
    default: [],
  },
  entrepreneurs: {
    type: [String],
    default: [],
  }
  },{
    timestamps: true
  }
);

export default mongoose.model("Categories", Categories);
