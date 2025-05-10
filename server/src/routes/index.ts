import { Router } from "express";

import authRouter from "./authRoute";
import customerRoute from "./customerRoute";
import routingAreaRoute from "./routingAreaRoute";
import mailRoute from "./mailRoute";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/customer", customerRoute);
rootRouter.use("/routingArea", routingAreaRoute);
rootRouter.use("/mail", mailRoute);

rootRouter.get("/test", (req, res) => {
  res.status(200).json({
    message: "Hello from root router",
  });
});

export default rootRouter;
