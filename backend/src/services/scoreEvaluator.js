import { genAI } from "../constant.js";

// Function to extract final score from explanation using Gemini Flash
export const scoreEvaluator = async (explanationsArray) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an evaluator AI. Given a short explanation of a student's answer evaluation, extract a final score (only a number between 0 to 10). 
Your response should contain ONLY the score, nothing else.

Example Explanation: "${explanationsArray[0]}"
`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const scoreText = response.text().trim();

    return scoreText;
  } catch (error) {
    console.error("Score extraction error:", error);
    throw error;
  }
};

export default scoreEvaluator;