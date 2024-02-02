<<<<<<< HEAD
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
=======
import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    productID: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
>>>>>>> 62b736682a72adbce74fcfeba87ca8d151b3d2ab
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: [{
        type: String
    }],
    productImage: {
<<<<<<< HEAD
        type: mongoose.Schema.Types.ObjectId,
=======
      type: String,
      required: true,
>>>>>>> 62b736682a72adbce74fcfeba87ca8d151b3d2ab
    },
    brand: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["M", "F", "O"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
      },
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
<<<<<<< HEAD
});

const Product = mongoose.model("Product", productSchema);

export default Product;
=======
  }
);
export const Product = mongoose.model("Product", productSchema);
>>>>>>> 62b736682a72adbce74fcfeba87ca8d151b3d2ab
