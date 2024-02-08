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
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    size: [{
      type: Number,
      required: true
    }],
    color: [{
      type: String,
      required: true,
    }],
    gender: {
      type: String,
      enum: ["M", "F", "O"],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
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
    blogs:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
      }
    ]
  },
  {
    timestamps: true,
  }
);
export const Product = mongoose.model("Product", productSchema);
