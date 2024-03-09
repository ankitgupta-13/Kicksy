import mongoose from "mongoose";

// sellerSchema
const priceSchema = new mongoose.Schema({
  originalPrice: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
});

const productSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
      unique: true,
    },
    skuID: {
      type: String,
      // required: true,
      unique: true,
    },
    sellers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true
      }
    ],
    title: {
      type: String,
      required: true,
    },
    price: {
      type: priceSchema,
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
      type: [String],
      enum: ['anime', 'boots', 'sneakers', 'sandals'],
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

export { Product }