import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNum: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sclassName: {
    type: String,
    ref: "slcass",
    required: true,
  },
  school: {
    type: String,
    ref: "admin",
    required: "true",
  },
  role: {
    type: String,
    default: "Student",
  },
  examResult: [
    {
      subName: {
        type: String,
        ref: "subject",
      },
      marketObtained: {
        type: Number,
        default: 0,
      },
    },
  ],
  attendance: [
    {
      date: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true,
      },
      subName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("student", studentSchema);
