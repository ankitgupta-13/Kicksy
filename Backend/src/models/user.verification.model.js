import mongoose from "mongoose";

const UserOtpVerificationSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
  });
  
const UserVerificationModel = new mongoose.model("user_verification", UserOtpVerificationSchema);
export {UserVerificationModel};
