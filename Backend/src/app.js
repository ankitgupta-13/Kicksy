import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { registerUser } from "./controllers/user.controller.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

export { app };
