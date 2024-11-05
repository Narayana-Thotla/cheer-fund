// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  profilepic: {
    type: String,
    // default: "default-profile-pic-url",
  },
  coverpic: {
    type: String,
    // default:"",
  },
  description: {
    type: String,
  },
  phno: {
    type: Number,
  },
  razorpayId: {
    type: String,
    // required: true,
  },
  razorpaySecret: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
