import mongoose from "mongoose";

const Developer = new mongoose.Schema({
  userId: String,
  developer: String,
  city: String,
  quote: String,
  title: String,
  description: String,
  linkedIn: String,
  github: String,
  portfolio: String,
  verified: {
    type: Boolean,
    default: false,
  },
  },{
    timestamps: true
  }
);

export default mongoose.model("Developer", Developer);
