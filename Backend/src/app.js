import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import adminRouter from "./routes/admin.routes.js";
import orderRouter from "./routes/order.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import productRouter from "./routes/product.routes.js";
import sellerRouter from "./routes/seller.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
dotenv.config();

// middlewares

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://stepstyle.vercel.app/",
      "https://kicksy.vercel.app/",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    exposedHeaders: ["set-cookie"],
  })
);

app.get("/health", (req, res) => {
  res.send("Health OK");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/user/order", orderRouter);
app.use("/api/user/payments", paymentRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/admin", adminRouter);

export { app };
