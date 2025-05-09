import { Router } from "express";

import authRouter from "./authRoute";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);

rootRouter.get("/test", (req, res) => {
  res.status(200).json({
    message: "Hello from root router",
  });
});

export default rootRouter;
