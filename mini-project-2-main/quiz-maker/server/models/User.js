import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two users can have the same email
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

export default mongoose.model("User", userSchema);
