import crypto from "crypto";
import dotenv from "dotenv";
import fetch from "node-fetch";
import Razorpay from "razorpay";
import { Address } from "../models/address.model.js";
import { Cart } from "../models/cart.models.js";
import { Offer } from "../models/offer.model.js";
import { Order } from "../models/order.models.js";
import { Seller } from "../models/seller.model.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

dotenv.config();

const RPAY_KEY_ID = `${process.env.RPAY_KEY_ID}`;
const RPAY_KEY_SECRET = `${process.env.RPAY_KEY_SECRET}`;
const rpayInstance = new Razorpay({
  key_id: RPAY_KEY_ID,
  key_secret: RPAY_KEY_SECRET,
});

const getKey = async (req, res) => {
  return res.status(200).json({ key: process.env.RPAY_KEY_ID });
};

const makePayment = async (req, res) => {
  let { amount, userID, cartItems, address } = req.body;
  try {
    const options = {
      amount, // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await rpayInstance.orders.create(options);
    order.userID = userID;
    order.items = cartItems;
    order.addressDetails = address;
    return res.json(new ApiResponse(200, order, "Payment Successfull"));
  } catch (err) {
    console.log(err);
    return res.json(new ApiError(400, "Unable to make payment"));
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails,
      // Object of Address
      addressDetails,
      products, // [{productID,quantity,sellerID}]
    } = req.body;

    /*
    
      variable products will be an array of objects containing productID , sellerID
  
    */

    /*
    
      SAMPLE orderDetails
  
      orderDetails: {
      id: 'order_NrhC7ziJiU1h9w',
      entity: 'order',
      amount: 500000,
      amount_paid: 0,
      amount_due: 500000,
      currency: 'INR',
      receipt: null,
      offer_id: null,
      status: 'created',
      attempts: 0,
      notes: [],
      created_at: 1711611534,
      userID: '65f0a8a37d96f0cf606f109a',
      items: [ {
        productID:"",
        sellerID:"",
        quantity:""
      } ]
    }
  
    */

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    if (expectedSign === razorpay_signature) {
      // add order to seller and user
      const userCart = await Cart.findOne({ user: orderDetails.userID });

      // console.log(orderDetails);

      console.log(addressDetails);

      const address = new Address({
        userId: orderDetails.userID,
        ...addressDetails,
      });

      await address.save();

      const user = await User.findById(orderDetails.userID);
      if (!user) return res.json(new ApiResponse(404, "user not found!"));

      const cart = await Cart.findOne({ user: orderDetails.userID });
      if (!cart) return res.json(new ApiResponse(404, "cart not found"));

      const tags = [user.username, user.email];
      // if(orderDetails.amount === cart.cartTotal){
      const order = new Order({
        user: orderDetails.userID,
        orderItems: cart.items,
        orderPrice: orderDetails.amount,
        paymentStatus: true,
        paymentMethod: "Razorpay",
        searchTags: tags,
        address: address._id,
      });

      await order.save();

      const promises = [];
      for (const item of order.orderItems) {
        // Update quantity in Offer collection
        promises.push(
          Offer.findOneAndUpdate(
            { sellerID: item.sellerID, productID: item.product },
            { $inc: { quantity: -item.quantity } }
          )
        );

        // Update orders array in Seller collection
        promises.push(
          Seller.findOneAndUpdate(
            { _id: item.sellerID, orders: { $ne: order._id } },
            { $push: { orders: order._id } }
          )
        );

        const seller = await Seller.findById(item.sellerID);
        promises.push(
          Order.findOneAndUpdate(
            { _id: order._id, adminSearchTags: { $ne: seller.storeName } },
            { $push: { adminSearchTags: seller.storeName } }
          )
        );
      }

      // Wait for all promises to complete
      await Promise.all(promises);

      cart.items = [];
      cart.cartTotal = 0;
      await cart.save();

      await User.findByIdAndUpdate(orderDetails.userID, {
        $push: { /* address: address._id,*/ orders: order._id },
      });

      return res.json(new ApiResponse(200, order, "order placed successfully"));

      // }
      // else{
      //   const paymentHandler = new InsufficientFundTransfer({
      //     user:orderDetails.userID,
      //     amount:orderDetails.amount,
      //     amountPaid:orderDetails.amount_paid,
      //     amountDue:orderDetails.amount_due
      //   })

      //   await paymentHandler.save()
      //   return res.json(new ApiResponse(422 , paymentHandler ,"Incorrect fund amount , please try to contact the owner if full amount paid"))
      // }

      //   await order.save();

      //
      // } else {
      // const order = new Order({
      //   user: userID,
      //   orderItems: userCart.items,
      //   orderPrice: orderDetails.amount,
      //   paymentStatus: true,
      //   paymentMethod: "Razorpay",
      // });
      // await order.save();
      //   return res.json(new ApiResponse(404, "products not found"));
      // }

      // user.orders.push(order._id);
    } else {
      return res.json(new ApiResponse(400, "Payment failed!"));
    }
  } catch (err) {
    console.log(err);
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
      return res.json(new ApiResponse(200, payment));
    } else {
      return res.json(new ApiResponse(404, "Payment Not Found"));
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

export { fetchall, fetchPayment, getKey, makePayment, verifyPayment };
