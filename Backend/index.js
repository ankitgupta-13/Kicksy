require('dotenv').config();
const express = require("express");
const cors = require("cors");
const authRoute  = require("./src/routes/authRoutes.js");
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const userRoute = require('./src/routes/userRoute.js');
mongoose.connect(process.env.DB).then(() => {
  console.log("Database connected!")
}).catch((err) => {
  console.error(err);
})

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoute);
app.use(userRoute);

app.use("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on Port : ${PORT}`);
});
