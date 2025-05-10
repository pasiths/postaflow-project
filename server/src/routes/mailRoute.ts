import { Router } from "express";
import { errorHandler } from "../error-handler";
import { authMiddleware, requirePostal } from "../middlewares/authMiddleware";
import { CreateMail, GetMails } from "../controllers/mailController";

const mailRoute: Router = Router();

mailRoute.use(errorHandler(authMiddleware));
mailRoute.get("/", errorHandler(requirePostal), errorHandler(GetMails));
mailRoute.post("/", errorHandler(requirePostal), errorHandler(CreateMail));

export default mailRoute;
