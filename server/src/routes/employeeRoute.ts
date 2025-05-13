import { Router } from "express";
import { errorHandler } from "../error-handler";
import { authMiddleware, requirePostal } from "../middlewares/authMiddleware";
import { getEmployees } from "../controllers/employeeController";

const employeeRoute: Router = Router();

employeeRoute.use(errorHandler(authMiddleware));
employeeRoute.get("/", errorHandler(requirePostal), errorHandler(getEmployees));

export default employeeRoute;
