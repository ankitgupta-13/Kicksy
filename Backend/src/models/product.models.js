const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
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
    size:[{
        type:String
    }],
    productImage: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
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
    ],
}, {
    timestamps: true,
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product