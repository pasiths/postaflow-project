import { Router } from "express";

const rootRouter: Router = Router();

rootRouter.get("/test", (req, res) => {
  res.status(200).json({
    message: "Hello from root router",
  });
});

export default rootRouter;
