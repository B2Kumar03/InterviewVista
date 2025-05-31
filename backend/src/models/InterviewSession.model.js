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
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  feedback: {
    type: String,
    default: "",
  },
  code: {
    type: String,
  },
});

const InterviewSession = mongoose.model("InterviewSession", interViewSchema);

export default InterviewSession;