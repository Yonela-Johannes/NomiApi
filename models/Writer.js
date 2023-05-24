import mongoose from "mongoose";

const Writer = new mongoose.Schema({
  userId: String,
  name: String,
  last_name: String,
  email: String,
  quote: String,
  title: String,
  city: String,
  town: String,
  description: String,
  website: String,
  verified: {
    type: Boolean,
    default: false,
  },
  },{
    timestamps: true
  }
);

export default mongoose.model("Writer", Writer);
