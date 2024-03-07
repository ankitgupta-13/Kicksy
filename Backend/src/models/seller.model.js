import mongoose from "mongoose";
import { productSchema } from "./product.models.js";

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
    offers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Offer'
        }
    ]
})


const requestSchema = new mongoose.Schema({
    product: productSchema,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Seller'
    }
}, {
    timestamps: true
})

const Seller = new mongoose.model('Seller', sellerSchema);
const Request = new mongoose.model('Request', requestSchema);

export { Seller, Request }

