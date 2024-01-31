import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String, //stroring mobile number as String since there could be leading zeroes
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
