
// API key from environment or config

import { genAI } from "../constant.js";

// Main evaluation function
export const evaluateAnswer = async (question, studentAnswer) => {
  try {
    // Use the lighter and faster Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Question: ${question}\nStudent's Answer: ${studentAnswer}\nEvaluate this answer and give a score out of 10 with a short explanation.`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Evaluation error:", error);
    throw error;
  }
};
