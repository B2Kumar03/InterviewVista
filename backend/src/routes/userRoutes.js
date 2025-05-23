import { Router } from "express";
import { getUserById, login, register } from "../controllers/useController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/get-user",isAuthenticated,getUserById)

export default userRouter;
