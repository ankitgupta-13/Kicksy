import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    rpay_order_id:{
        type:String,
        required:true
    },
    rpay_payment_id:{
        type:String,
        required:true
    },
    rpay_signature:{
        type:String,
        required:true
    }
})

const Payment = new mongoose.model("payment" , paymentSchema)
export {Payment}