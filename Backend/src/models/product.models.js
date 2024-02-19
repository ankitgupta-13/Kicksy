import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    productCode: {
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
    mrp:{
      type:Number
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
    color: {
      type: [String],
      required: true,
    },
    gender: {
      type: String,
      enum: ["M", "F", "K"],
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
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    tags: [
      {
        type: String
      }
    ],
    analysis: {
      total_sale: {
        type: Number,
        default: 0
      },
      users:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
        }
      ]
    }
  },
  {
    timestamps: true,
  }
);
export const Product = mongoose.model("Product", productSchema);
