import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
    default: "Admin",
  },
  school: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("admin", adminSchema);
