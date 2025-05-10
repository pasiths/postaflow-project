import { Router } from "express";

import authRouter from "./authRoute";
import customerRoute from "./customerRoute";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/customer", customerRoute);

rootRouter.get("/test", (req, res) => {
  res.status(200).json({
    message: "Hello from root router",
  });
});

export default rootRouter;
