import Razorpay from "razorpay";
import dotenv from "dotenv"
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";
dotenv.config()

const rpayInstance = new Razorpay({
    key_id: process.env.RPAY_KEY_ID,
    key_secret: process.env.RPAY_KEY_SECRET
});

const makePayment = async (req, res) => {
    const { amount } = req.body;
    console.log(amount);
    try {
        const options = {
            amount,
            currency: "INR"
        }
        const order = await rpayInstance.orders.create(options);
        console.log(order);

        res.json(ApiResponse(200, order.id, "Payment Successfull"))
    }
    catch (err) {
        throw new ApiError(400, "unable to make payment");
    }
}

const verifyPayment = async (req, res) => {
    const { rpay_order_id, rpay_payment_id, rpay_signature } = req.body;
    try {
        const body = rpay_order_id + "|" + rpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');
        if (expectedSign === rpay_signature) {
            await Payment.create({
                rpay_order_id,
                rpay_payment_id,
                rpay_signature
            })
            res.redirect(process.env.FRONTEND+`/paymentsuccess?reference=${rpay_payment_id}`);
            // res.json(new ApiResponse(200, { success: true }, "Payment Successfull"));
        }
        else {
            throw new ApiError(400, "Payment unsucessfull!");
        }
    }
    catch (err) {
        throw new ApiError(400, err.message);
    }
}

const getKey = async(req,res)=>{
    return res.status(200).json({key:process.env.RPAY_KEY_ID});
}

export {
    makePayment,
    verifyPayment,
    getKey
}
