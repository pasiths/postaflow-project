import { Router } from "express";
import { errorHandler } from "../error-handler";
import { authMiddleware, requirePostal } from "../middlewares/authMiddleware";
import { CreateBill, CreatePayment, GetBills } from "../controllers/billController";

const billRoute: Router = Router();

billRoute.use(errorHandler(authMiddleware));
billRoute.get("/", errorHandler(requirePostal), errorHandler(GetBills));
billRoute.post("/", errorHandler(requirePostal), errorHandler(CreateBill));
billRoute.post("/:id/pay", errorHandler(requirePostal), errorHandler(CreatePayment));

export default billRoute;
