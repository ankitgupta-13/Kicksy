import mongoose, { Mongoose } from "mongoose";

const sellerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId
        }
    ],
    products:[
        {
            productID:mongoose.Schema.Types.ObjectId,
            qty:Number
        }
    ]    
})

const Seller = new mongoose.model('Seller' , sellerSchema)

export {Seller}

