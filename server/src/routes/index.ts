import { Router } from "express";

import authRouter from "./authRoute";
import customerRoute from "./customerRoute";
import routingAreaRoute from "./routingAreaRoute";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/customer", customerRoute);
rootRouter.use("/routingArea", routingAreaRoute);

rootRouter.get("/test", (req, res) => {
  res.status(200).json({
    message: "Hello from root router",
  });
});

export default rootRouter;
