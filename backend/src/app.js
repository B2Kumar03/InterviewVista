import express from 'express';
import cors from 'cors';
import runEval from './services/runEval.js';
import scoreEvaluator from './services/scoreEvaluator.js';

const app = express();
app.use(express.json({ limit: '50mb' }));  // Adjust the limit as needed
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(cors({
  origin: '*', // Allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));


//imported user routes
import userRouter from './routes/userRoutes.js';
app.use("/api", userRouter);


import interViewRouter from './routes/interviewRoutes.js';
app.use("/api", interViewRouter);

import { createInterview } from "./controllers/interviewController.js";
app.use("/api", createInterview);



// runEval();

// console.log(evaluateCode())

// const explanation = [
//   "Explanation: The student correctly identifies HTML as a markup language. However,  the statement used to write logic is incorrect. HTML is used to *structure* content on a webpage, not to write the logic (which is handled by things like JavaScript).  The answer shows some understanding but a significant misunderstanding of HTML's primary function."
// ];

// const score = await scoreEvaluator(explanation);
// console.log("Extracted Score:", score); // Should log something like "1"

// import { generateInterviewQuestions } from "./services/questionGeneratorService.js";
// import { evaluateCode } from './services/codeEvaluationService.js';

// (async () => {
//   const questions = await generateInterviewQuestions(
//     "Frontend Engineer",
//     "fresher",
//     ["React", "JavaScript", "Mongodb"],
//     "Google"
//   );
//   console.log(questions[0]);
//   /**
//    * [
//    *   "Explain the virtual DOM in React and how it improves performance.",
//    *   "How would you architect a large-scale React application with TypeScript?",
//    *   …
//    * ]
//    */
// })();




export default app;