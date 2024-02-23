import Razorpay from "razorpay";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import crypto from "crypto";
import { Payment } from "../models/payment.models.js";
import fetch from "node-fetch";
import { User } from "../models/user.models.js";
import { Order } from "../models/order.models.js";


const rpayInstance = new Razorpay({
  key_id: process.env.RPAY_KEY_ID,
  key_secret: process.env.RPAY_KEY_SECRET,
});

const getKey = async (req, res) => {
  return res.status(200).json({ key: process.env.RPAY_KEY_ID });
};

const makePayment = async (req, res) => {
  const { amount } = req.body;
  try {
    const options = {
      amount, // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await rpayInstance.orders.create(options);
    res.json(new ApiResponse(200, order, "Payment Successfull"));
  } catch (err) {
    console.log(err);
    throw new ApiError(400, "Unable to make payment");
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const {userID} = req.params;
  try {
    const user = await User.findOne({_id:userID})
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    if (expectedSign === razorpay_signature) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      const cartItems = [];
      user.cart.forEach((item)=>{
        cartItems.push(item);
      })

      const data = await fetch(`${process.env.BACKEND_URI}/api/user/payments/fetch-by-id` , {
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          paymentId:razorpay_payment_id
        })
      })

      const payment = await data.json()
      
      // console.log(data);
      
      const order = new Order({
        customer:user._id,
        orderItems:cartItems,
        orderPrice:payment.data.amount,
        paymentStatus:true,
        paymentMethod:payment.data.method
      })

      await order.save();
      // console.log(payment)
      res.json(new ApiResponse(200, order, "order placed"))
      

      // res.redirect(
      //   `/paymentsuccess?reference=${razorpay_payment_id}`
      // );
    } else {
      res.json(new ApiResponse(400, "Payment failed!"));
    }
  } catch (err) {
    console.log(err.message);
    return res.json(new ApiError(400, err));
  }
};

const fetchall = async (req, res) => {
  const payments = await fetch("https://api.razorpay.com/v1/payments/", {
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.RPAY_KEY_ID + ":" + process.env.RPAY_KEY_SECRET).toString("base64")}`,
      "Content-Type": "application/json",
    },
  });
  const response = await payments.json();
  console.log(response);
  const data = {
    totalPayments: response.count,
    payments: response.items,
  };
  res.json(new ApiResponse(200, data));
};

const fetchPayment = async (req, res) => {
  const { paymentId } = req.body;
  try {
    const payment = await rpayInstance.payments.fetch(paymentId);
    // console.log(payment)
    if (payment) {
      return res.json(new ApiResponse(200 ,payment));
    } else {
      return res.json(new ApiResponse(404 ,"Payment Not Found"));
    }
  } catch (err) {
    throw new ApiError(
      400,
      "Error while fetching payment through payment id",
      err.message
    );
  }
};

const fetchPaymentByTime = async (req, res) => {
  // time should be in yyyy-mm-dd format
  const { start, end } = req.body;
  try {
    const payments = await rpayInstance.payments
      .all({
        from: start,
        to: end,
      })
      .then((response) => {
        console.log("payments fetched successfully!");
      })
      .catch((err) => {
        console.log(err.message);
      });

    if (payments) {
      res.json(new ApiResponse(200, payments));
    }
  } catch (err) {
    throw new ApiError(400, "Error while fetching payments using time.", err);
  }
};

export { getKey, makePayment, verifyPayment, fetchall, fetchPayment };
