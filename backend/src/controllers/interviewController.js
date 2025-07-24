import InterviewSession from "../models/InterviewSession.model.js"
import generateInterviewQuestions from "../services/questionGeneratorService.js"
import { evaluateAnswer } from "../services/evaluateAnswer.js"

const createInterview=async(req,res)=>{

const {jobProfile,experienceLevel,skills,targetCompany}=req.body
try {
    const question=await generateInterviewQuestions(jobProfile,experienceLevel,skills,targetCompany)
    console.log(question)
    const  interview=await InterviewSession({
        user:req.user._id,
        company:targetCompany,
        jobProfile:jobProfile,
        experienceLevel:experienceLevel,
        skills:skills,
        questions:question//this is 
    })
    await interview.save()
    console.log(interview)
    return res.status(200).json({success:true,interview})
} catch (error) {
    
}

 return res.status(200).json({success:true,question})
}


const update_interview_answer=async(req,res)=>{

}

const getInterview = async (req, res) => {
  try {
    const interviews = await InterviewSession.find({ user: req.user._id });
    if (!interviews || interviews.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No interview sessions found.",
        interviews: [],
      });
    }
    return res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.error("Error fetching interview sessions:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching interviews.",
    });
  }
};



export const getSingleInterview = async (req, res) => {
  try {
    const { id } = req.params;
  
    // Find interview by ID and populate user details if needed
    const interview = await InterviewSession.findById(id).populate("user");

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found.",
      });
    }

    return res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error("Error fetching interview session:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the interview.",
    });
  }
};

const updateInterviewAnswers = async (req, res) => {
  try {
    const { id } = req.params;
    const responses = req.body; // Array of {question, Code, answer}
    if (!Array.isArray(responses)) {
      return res.status(400).json({ success: false, message: 'Responses must be an array.' });
    }
    // Evaluate each response
    let totalScore = 0;
    let feedbackArr = [];
    let answers = [];
    let codeArr = [];
    for (let i = 0; i < responses.length; i++) {
      const { question, answer = "No answer", Code = "" } = responses[i];
      answers.push(answer);
      codeArr.push(Code);
      if (answer && answer !== "No answer") {
        const evalResult = await evaluateAnswer(question, answer, Code);
        totalScore += evalResult.score || 0;
        feedbackArr.push(`Q${i+1}: ${evalResult.feedback}`);
      } else {
        feedbackArr.push(`Q${i+1}: No answer provided.`);
      }
    }
    const avgScore = responses.length ? Math.round(totalScore / responses.length) : 0;
    const feedback = feedbackArr.join("\n");
    const interview = await InterviewSession.findByIdAndUpdate(
      id,
      { answers, code: codeArr.join("\n---\n"), score: avgScore, feedback, status: true },
      { new: true }
    );
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }
    return res.status(200).json({ success: true, interview });
  } catch (error) {
    console.error('Error updating interview answers:', error);
    return res.status(500).json({ success: false, message: 'Failed to update answers.' });
  }
};

export {createInterview,update_interview_answer,getInterview, updateInterviewAnswers};

