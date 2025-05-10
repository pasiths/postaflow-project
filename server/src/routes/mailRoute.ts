import { Router } from "express";
import { errorHandler } from "../error-handler";
import { authMiddleware, requirePostal } from "../middlewares/authMiddleware";
import { CreateMail } from "../controllers/mailController";

const mailRoute: Router = Router();

mailRoute.use(errorHandler(authMiddleware));
mailRoute.post("/", errorHandler(requirePostal), errorHandler(CreateMail));

export default mailRoute;
