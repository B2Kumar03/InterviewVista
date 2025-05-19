// services/codeEvaluationService.js
export const evaluateCode = (code) => {
  try {
    const result = eval(code); // ⚠️ Use with caution
    return { success: true, output: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
