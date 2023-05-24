import mongoose from "mongoose";

const Entrepreneur = new mongoose.Schema({
  userId: String,
  logo: String,
  businessName: String,
  email: String,
  phone: String,
  quote: String,
  title: String,
  city: String,
  town: String,
  areaCode: String,
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

export default mongoose.model("Entrepreneur", Entrepreneur);
