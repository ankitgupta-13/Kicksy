import { Offer } from "../models/offer.model.js";
import { Product } from "../models/product.models.js";
import { ProductRequest } from "../models/request.model.js";
import { Seller } from "../models/seller.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const handleErr = (err) => {
  console.log(err);
  return res.json(new ApiError(400, err.message));
}

const getAllProductRequests = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {

    const requests = await ProductRequest.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(
      new ApiResponse(200, { requests, page }, "requests fetched successfully")
    );

  }
  catch (err) {
    return res.json(new ApiError(400, err.message));
  }
};

const editProductRequest = async (req, res) => {
  const { requestID } = req.body;
  try {

    const request = await ProductRequest.findOne({ _id: requestID });
    if (!request) return res.json(new ApiResponse(404, 'product request not found'));

    const updatedRequest = await ProductRequest.findByIdAndUpdate(requestID, req.body);
    
    return res.json(new ApiResponse(200, updatedRequest));

  }
  catch (err) {
    return handleErr(err);
  }
}


/* this api is for accepting the request and hence adding a new product */
const addProductViaRequest = async (req, res) => {
  const { requestID } = req.body;
  try {

    const request = await ProductRequest.findOne({ _id: requestID });
    if (!request) return res.json(new ApiResponse(404, 'product request not found'));

    const product = new Product(request);
    await product.save();

    return res.json(200, product, "product added successfully!");

  }
  catch (err) {
    return handleErr(err);
  }
};



export { getAllProductRequests, addProductViaRequest, editProductRequest }
