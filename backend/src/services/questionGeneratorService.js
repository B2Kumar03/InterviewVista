// services/questionGeneratorService.js
import { genAI } from "../constant.js";

/**
 * Generate a set of interview questions based on the candidate's profile.
 *
 * @param {string} jobProfile       e.g. "Frontend Engineer"
 * @param {string} experienceLevel  e.g. "Senior (5+ years)"
 * @param {string[]} skills         e.g. ["React", "TypeScript", "GraphQL"]
 * @param {string} targetCompany    e.g. "Google"
 * @returns {Promise<string[]>}     An array of question strings
 */
export const generateInterviewQuestions = async (
  jobProfile,
  experienceLevel,
  skills,
  targetCompany
) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build prompt
    const prompt = `
You are an expert interviewer. Generate a JSON array of 7 interview questions tailored for:
- Job Profile: ${jobProfile}
- Experience Level: ${experienceLevel}
- Key Skills: ${skills.join(", ")}
- Target Company: ${targetCompany}

Respond with ONLY a valid JSON array of strings, for example:
[
  "Question 1?",
  "Question 2?",
  ...
]
`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });
    const raw = await result.response.text();
    
    // Parse JSON safely
    let questions;
    try {
      questions = JSON.parse(raw);
      if (!Array.isArray(questions)) throw new Error("Not an array");
    } catch (err) {
      throw new Error(
        "Failed to parse JSON response from model: " + raw.slice(0, 200)
      );
    }

    return questions;
  } catch (error) {
    console.error("Question generation error:", error);
    throw error;
  }
};
export default generateInterviewQuestions;