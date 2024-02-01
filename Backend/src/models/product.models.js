const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
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
        type: mongoose.Schema.Types.ObjectId,
        
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