import mongoose from "mongoose";

const InsufficientFundTransferSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  amount:Number,
  amountPaid:Number,
  amountDue:Number
})

const InsufficientFundTransfer = new mongoose.model("InsufficientFundTransfer" , InsufficientFundTransferSchema);

export {InsufficientFundTransfer}