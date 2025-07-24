import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createInterview, getInterview, getSingleInterview, updateInterviewAnswers } from "../controllers/interviewController.js";

const interViewRouter = Router();

interViewRouter.post("/create-interview", isAuthenticated, createInterview);
interViewRouter.get("/get-interview", isAuthenticated, getInterview);
interViewRouter.get("/interview/:id", getSingleInterview);
interViewRouter.put("/interview/:id/answers", updateInterviewAnswers);

export default interViewRouter;
