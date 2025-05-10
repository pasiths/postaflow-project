import { Router } from "express";
import { errorHandler } from "../error-handler";
import { authMiddleware, requirePostal } from "../middlewares/authMiddleware";
import {
  CreateRoutingArea,
  GetRoutingAreaById,
  GetRoutingAreas,
} from "../controllers/routingAreaController";

const routingAreaRoute: Router = Router();

routingAreaRoute.use(errorHandler(authMiddleware));
routingAreaRoute.get(
  "/",
  errorHandler(requirePostal),
  errorHandler(GetRoutingAreas)
);
routingAreaRoute.get(
  "/:id",
  errorHandler(requirePostal),
  errorHandler(GetRoutingAreaById)
);
routingAreaRoute.post(
  "/",
  errorHandler(requirePostal),
  errorHandler(CreateRoutingArea)
);

export default routingAreaRoute;
