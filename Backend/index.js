import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoute from './src/routes/authRoutes.js';
import mongoose from 'mongoose';
import userRoute from './src/routes/userRoute.js';
import adminRoute from './src/routes/adminRoutes.js';

dotenv.config();

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
app.use( "/admin" , adminRoute);

app.listen(PORT, () => {
  console.log(`Server is running on Port : ${PORT}`);
});
