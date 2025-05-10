import { Router } from "express";
import { errorHandler } from "../error-handler";
import { CreateCustomer } from "../controllers/customerController";
import { authMiddleware, requirePostal } from "../middlewares/authMiddleware";


const customerRoute : Router = Router();

customerRoute.use(errorHandler(authMiddleware))
customerRoute.post("/",errorHandler(requirePostal), errorHandler(CreateCustomer))

export default customerRoute;