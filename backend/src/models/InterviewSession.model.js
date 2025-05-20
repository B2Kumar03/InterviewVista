import mongoose from "mongoose";

const interViewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  company: {
    type: String,
    required: true,
  },
  jobProfile: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  questions: {
    type: [String],
    required: true,
  },
  answers: {
    type: [String],
  },
  score: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  feedback: {
    type: String,
  },
  code: {
    type: String,
  },
});

const InterviewSession = mongoose.model("InterviewSession", interViewSchema);
