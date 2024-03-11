import { Offer } from "../models/offer.model.js";
import { Product } from "../models/product.models.js";
import { ProductRequest } from "../models/request.model.js";
import { Seller } from "../models/seller.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getProductRequests = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const requests = await ProductRequest.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(
      new ApiResponse(200, { requests, page }, "requests fetched successfully")
    );
  } catch (err) {
    return res.json(new ApiError(400, err.message));
  }
};

/* this api is for accepting the request and hence adding a new product */
const addProductViaOffer = async (req, res) => {
  const { requestID } = req.body;
};

/* this api is for adding offer to the existing product */
const addOfferToProduct = async (req, res) => {
  const { productID, requestID } = req.body;
  try {
    const product = await Product.findOne({ _id: productID });

    if (!product) return res.json(new ApiError(422, "Invalid productID"));

    const request = await ProductRequest.findOne({ _id: requestID });
    // const request = await Request.findOne({ _id: requestID });

    if (!request) return res.json(new ApiError(422, "Invalid requestID"));

    const offer = new Offer({
      productID,
      sellerID: request.seller,
      price: request.price,
      quantity: request.stock,
    });

    await offer.save();

    product.offers.concat(offer._id);
    await product.save();

    const seller = await Seller.findOne({ _id: request.seller });
    seller.offers.concat(offer._id);

    return res.json(new ApiResponse(200, product, "offer added successfully"));
  } catch (err) {
    return res.json(new ApiError(400, err.message));
  }
};

export { getProductRequests, addOfferToProduct, addProductViaOffer };
