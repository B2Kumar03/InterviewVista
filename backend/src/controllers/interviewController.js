import InterviewSession from "../models/InterviewSession.model.js"
import generateInterviewQuestions from "../services/questionGeneratorService.js"

const createInterview=async(req,res)=>{
console.log(req.body)
const {jobProfile,experienceLevel,skills,targetCompany}=req.body
try {
    const question=await generateInterviewQuestions(jobProfile,experienceLevel,skills,targetCompany)
    const  interview=await InterviewSession({
        user:req.user._id,
        company:targetCompany,
        jobProfile:jobProfile,
        experienceLevel:experienceLevel,
        skills:skills,
        questions:question//this is 
    })
    await interview.save()
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







export {createInterview,update_interview_answer,getInterview}

