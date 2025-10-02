const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "super_admin"],
    default: "user",
  },
  RollNo: {
    type: String,
    required: true,
    unique: true,
  },
  Branch: {
    type: String,
    required: true,
  },
    Year: {
    type: Number,
    required: true,
  },
  Mobile: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
