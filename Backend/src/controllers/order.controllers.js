import { Order } from "../models/order.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addOrder = async(req,res)=>{
    
}

const addToOrderHistory = async (req, res) => {
    try {
        const { userID, orderID } = req.body;
        const user = await User.findOne({ _id: userID });
        const order = await Order.findOne({ _id: orderID });
        const isEmpty = await Order.find({});
        if(isEmpty.length <=0) throw new ApiError(422, "no orders in the DB.")
        if (!order) throw new ApiError(422, "invalid orderID");
        if (!user) throw new ApiError(422, "invalid userID");
        const updated = await User.findByIdAndUpdate({_id:userID} , {$push:{orders:orderID}});
        res.json(new ApiResponse(200 , updated , "updated successfully"));
    }
    catch (err) {
        throw new ApiError(400, "error while adding to order history", err.message);
    }
}

export {addToOrderHistory};