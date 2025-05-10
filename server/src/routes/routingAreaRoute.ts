import { Router } from "express";
import { errorHandler } from "../error-handler";
import { authMiddleware, requirePostal } from "../middlewares/authMiddleware";
import { CreateRoutingArea } from "../controllers/routingAreaController";

const routingAreaRoute: Router = Router();

routingAreaRoute.use(errorHandler(authMiddleware));
routingAreaRoute.post(
  "/",
  errorHandler(requirePostal),
  errorHandler(CreateRoutingArea)
);

export default routingAreaRoute;
