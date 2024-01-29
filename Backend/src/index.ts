import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors);
const PORT = process.env.PORT;

app.use("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(PORT, () => {
  console.log("Server is running on Port : 8000");
});
