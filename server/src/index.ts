import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import { PORT } from "./secrets";
import { errorMiddleware } from "./middlewares/errors";
import rootRouter from "./routes";

const app: Express = express();

app.use(express.json());
app.use(cookiesParaser());
app.use(cors());

app.use("/api", rootRouter);
app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Hello from API",
  });
});

export const prisma = new PrismaClient();

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
