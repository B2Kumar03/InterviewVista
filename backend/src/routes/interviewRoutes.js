import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createInterview, getInterview, getSingleInterview } from "../controllers/interviewController.js";

const interViewRouter = Router();

interViewRouter.post("/create-interview", isAuthenticated, createInterview);
interViewRouter.get("/get-interview", isAuthenticated, getInterview);
interViewRouter.get("/interview/:id", getSingleInterview);

export default interViewRouter;
