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
You are an expert interviewer. Generate a raw JSON array of 10 interview questions (give code also to write in question) tailored for:
- Job Profile: ${jobProfile}
- Experience Level: ${experienceLevel}
- Key Skills: ${skills.join(", ")}
- Target Company: ${targetCompany}

Respond with ONLY a raw JSON array of strings (no markdown or code formatting). Example:
[
  "Question 1?",
  "Question 2?"
]
`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const raw = await result.response.text();

    // Clean up any code block formatting (e.g., ```json ... ```)
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/, "")
      .trim();

    let questions;
    try {
      questions = JSON.parse(cleaned);
      if (!Array.isArray(questions)) {
        throw new Error("Response is not a JSON array");
      }
    } catch (err) {
      throw new Error(
        "Failed to parse JSON response from model: " + cleaned.slice(0, 200)
      );
    }

    return questions;
  } catch (error) {
    console.error("Question generation error:", error);
    throw error;
  }
};

export default generateInterviewQuestions;
