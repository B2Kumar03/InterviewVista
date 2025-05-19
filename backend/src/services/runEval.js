import { evaluateAnswer } from "./evaluateAnswer.js";


const runEval = async () => {
  const result = await evaluateAnswer(
    "what is HTML ?",
    "HTML is a markup language which is used to write logic"
  );
  console.log(result);
};

export default runEval;
