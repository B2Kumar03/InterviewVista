// API key from environment or config

import { genAI } from "../constant.js";

// Main evaluation function
export const evaluateAnswer = async (question, studentAnswer, codeSubmission = "") => {
  try {
    // Use the lighter and faster Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an interview evaluator.\n\nQuestion: ${question}\nStudent's Answer: ${studentAnswer}\nCode Submission: ${codeSubmission}\n\nEvaluate the answer and code. Give a score out of 10 (as a number) and a short feedback.\n\nRespond ONLY in this JSON format:\n{\n  \"score\": <number>,\n  \"feedback\": \"<short feedback>\"\n}`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    // Try to parse the response as JSON
    let score = 0;
    let feedback = "";
    try {
      const match = response.text().match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        score = parsed.score;
        feedback = parsed.feedback;
      } else {
        feedback = response.text();
      }
    } catch (e) {
      feedback = response.text();
    }
    return { score, feedback };
  } catch (error) {
    console.error("Evaluation error:", error);
    throw error;
  }
};
