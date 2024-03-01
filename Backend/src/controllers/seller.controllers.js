import { Seller } from "../models/seller.model";
import { User } from "../models/user.models";
import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"

const createSeller = async (req, res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email})

        if(!user) return res.json(new ApiResponse(404 , 'user not found'))

        user.role = 'seller';
        await user.save()

        const seller = new Seller({
            email:user.email,
            userID:user._id
        })

        await seller.save();

        return res.json(new ApiResponse(200 , `role updated to ${user.role}`))

    }
    catch(err){
        return res.json(new ApiError(400 , err.message));
    }
}








export {createSeller}