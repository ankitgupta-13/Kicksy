import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product"
    },
    sellerID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Seller"
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number
    },
    status:{
        type:String,
        default:"Pending",
        enum:["Pending" , "Accepted"]
    }
})

const Offer = new mongoose.model('Offer' , offerSchema);

export {Offer};