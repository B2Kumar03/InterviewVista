import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createInterview } from "../controllers/interviewController.js";

const interViewRouter = Router();

interViewRouter.post("/create-interview", isAuthenticated, createInterview);

export default interViewRouter;
