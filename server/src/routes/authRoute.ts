import { Router } from "express";
import { errorHandler } from "../error-handler";

import { SignIn, SignUp } from "../controllers/authController";

const authRouter: Router = Router();

authRouter.post("/signup", errorHandler(SignUp));
authRouter.post("/signin", errorHandler(SignIn));

export default authRouter;
