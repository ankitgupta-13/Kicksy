import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import orderRouter from "./routes/order.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import dotenv from "dotenv"
import { getObjectUrl } from "./utils/aws.functions.js";

const app = express();
dotenv.config();

// console.log(await getObjectUrl("Picture2.png"))
// middlewares
app.use(
  cors({
    origin:"*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    exposedHeaders: ["set-cookie"]
  })
);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/user/order", orderRouter);
app.use("/api/user/payments", paymentRouter);
app.use("/api/admin", adminRouter);

export { app };
