import mongoose, { Mongoose } from "mongoose";
import { productSchema } from "./product.models";

const sellerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    products: [
        {
            productID: mongoose.Schema.Types.ObjectId,
            qty: Number
        }
    ]
})

const requestSchema = new mongoose.Schema({
    product:productSchema,
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }

} , {
    timestamps:true
})

const Seller = new mongoose.model('Seller', sellerSchema);
const Request = new mongoose.model('Request', requestSchema);

export { Seller, Request }

