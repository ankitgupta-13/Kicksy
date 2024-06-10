import mongoose from "mongoose";

// sellerSchema
const priceSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  sellerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
  offerID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Offer",
  }
});

const productSchema = new mongoose.Schema(
  {
    skuID: {
      type: String,
      required: true,
      unique: true,
    },
    bestPrice: {
      type: priceSchema,
    },
    offers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Offer",
      },
    ],
    title: {
      type: String,
      required: true,
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
      type: String,
      enum: ["anime", "boots", "sneakers", "sandals"],
      required: true,
    },
    color: {
      type: [String],
      required: true,
    },
    gender: {
      type: [String],
      enum: ["M", "F", "K", "male", "female", "kids"],
      required: true,
    },
    stock: {
      type: Number,
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
    tags: [
      {
        type: String,
      },
    ],
    analysis: {
      total_sale: {
        type: Number,
        default: 0,
      },
      users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

export { Product };
