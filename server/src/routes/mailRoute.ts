import { Router } from "express";
import { errorHandler } from "../error-handler";
import { authMiddleware, requirePostal } from "../middlewares/authMiddleware";
import { CreateMail, GetMailById, GetMails } from "../controllers/mailController";

const mailRoute: Router = Router();

mailRoute.use(errorHandler(authMiddleware));
mailRoute.get("/", errorHandler(requirePostal), errorHandler(GetMails));
mailRoute.get("/:id", errorHandler(requirePostal), errorHandler(GetMailById));
mailRoute.post("/", errorHandler(requirePostal), errorHandler(CreateMail));

export default mailRoute;
