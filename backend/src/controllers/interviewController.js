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
        questions:question
    })
    await interview.save()
    return res.status(200).json({success:true,interview})
} catch (error) {
    
}

 return res.status(200).json({success:true,question})
}


const update_interview_answer=async(req,res)=>{

}

const getInterview=async(req,res)=>{
    
}




export {createInterview,update_interview_answer}

