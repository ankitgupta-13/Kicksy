import mongoose from "mongoose";
const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
    },
});
const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    orderItems: [
        {
            type: [orderItemSchema],
        },
    ],
    orderPrice: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ["PENDING", "CANCELLED", "DELIVERED"],
        default: "PENDING",
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
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    },
}, {
    timestamps: true,
});
export const Order = mongoose.model("Order", orderSchema);
