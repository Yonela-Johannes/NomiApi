import mongoose from "mongoose";

const Admin = new mongoose.Schema({
  userId: String,
  email: String,
  quote: String,
  title: String,
  owner: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  },{
    timestamps: true
  },
);

export default mongoose.model("Admin", Admin);
