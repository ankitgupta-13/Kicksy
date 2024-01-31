import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    orderStatus: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
