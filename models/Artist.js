import mongoose from "mongoose";

const Artist = new mongoose.Schema({
  userId: String,
  stageName: String,
  quote: String,
  title: String,
  address: String,
  description: String,
  website: String,
  perks: [String],
  extraInfo: String,
  verified: {
    type: Boolean,
    default: false,
  },
  },{
    timestamps: true
  }
);

export default mongoose.model("Artist", Artist);
