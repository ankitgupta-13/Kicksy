import { SellerRequest } from "../models/request.model";
import { Seller } from "../models/seller.model";
import { User } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const acceptSellerRequest = async (req, res) => {
  const { requestID } = req.bopdy;
  try {

    const request = await SellerRequest.findOne({ _id: requestID })
    if (!request) return res.json(new ApiResponse(404, 'request not found'));


    const user = await User.findOne({ _id: request.userID });
    if (!user) return res.json(new ApiResponse(404, 'user not found'))

    user.role = 'seller';
    await user.save();

    const seller = new Seller(request);
    await seller.save();

    await SellerRequest.findByIdAndDelete({ _id: requestID });

  }
  catch (err) {
    return res.json(new ApiError(400, err.message))
  }
}

const declineSellerRequest = async (req, res) => {
  const { requestID } = req.body;
  try {
    const request = await SellerRequest.findByIdAndDelete({ _id: requestID });

    if (!request) return res.json(new ApiResponse(404, 'request not found'));

    return res.json(new ApiResponse(200, request, 'Seller request deleted successfully'));
  }
  catch (err) {
    return res.json(new ApiError(400, err.message, err));
  }
}

export { acceptSellerRequest, declineSellerRequest };
