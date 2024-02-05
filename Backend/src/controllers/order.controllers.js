import mongoose from "mongoose";
import { Order } from "../models/order.models.js";
import { Product } from "../models/product.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addOrder = async (req, res) => {
    const { userID, qty, productID, paymentMethod ,addressID} = req.body;

    /*
    * in case of buying from cart :
    * no value will be given to variable 'qty' and instead
    * productID will be an array of objects containing id and qty 
    * const productID  = { productID:<id> , quantity:<Number> }
    */

    try {
        const user = await User.findOne({ _id: userID })
        if (!user) throw new ApiError(404, "user not found")

        if (typeof (productID) === 'object') {
            console.log("123")
            const order = new Order({
                customer:userID,
                orderItems:[],
                paymentMethod:paymentMethod,
                address:addressID
            })
            await order.save()
            productID.forEach(async (item) => {
                const product = await Product.findOne({ _id: item['productID'] });
                if (!product) throw new ApiError(404, "product not found");
                const update = await Order.findOne({_id:order._id})
                update.orderPrice += product.price;
                update.orderItems.push(item) 
                await update.save();
            })
            const id = order._id;
            user.orders.push(id);
            await user.save();
            res.json(new ApiResponse(200 , user._id , "order placed!"));
        }
        else if (typeof (productID) === 'string') {
            const product = await Product.findOne({ _id: productID });
            if (!product) throw new ApiError(404, "Product not found");
            const order = new Order({
                customer:userID,
                orderItems:{
                    productId:productID,
                    quantity:qty
                },
                paymentMethod,
                address:addressID,
                orderPrice:product.price
            })
            await order.save();
            user.orders.push(order._id);
            await user.save();
            res.json(new ApiResponse(200 , user._id , "order placed!"));
        }
        else{
            throw new ApiError(400 , "invalid product type");
        }
    }
    catch (err) {
        throw new ApiError(400, "error", err.message)
    }
}

const setOrderStatus = async (req, res) => {

}


const addToOrderHistory = async (req, res) => {
    try {
        const { userID, orderID } = req.body;
        const user = await User.findOne({ _id: userID });
        const order = await Order.findOne({ _id: orderID });
        const isEmpty = await Order.find({});

        if (isEmpty.length <= 0) throw new ApiError(422, "no orders in the DB.")

        if (!order) throw new ApiError(422, "invalid orderID");

        if (!user) throw new ApiError(422, "invalid userID");

        const updated = await User.findByIdAndUpdate({ _id: userID }, { $push: { orders: orderID } });
        res.json(new ApiResponse(200, updated, "updated successfully"));
    }
    catch (err) {
        throw new ApiError(400, "error while adding to order history", err.message);
    }
}

export { addToOrderHistory, addOrder };