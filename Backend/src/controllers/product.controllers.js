import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnAws } from "../utils/aws.js";
import fs from "fs";

const addProductImage = async (req, res) => {
  const productImageUrl = await uploadOnAws(req.files[0].path);
  if (!productImageUrl) {
    return res.send(new ApiError(500, "Upload Failed"));
  }
  fs.unlinkSync(req.files[0].path);
  return res.json(new ApiResponse(200, productImageUrl, "Upload Success"));
};

const addProduct = async (req, res) => {
  const { productCode } = req.body;
  const { images } = req.body;
  if (!images || images.length === 0) {
    return res.status(409).send("Please add images");
  }
  try {
    const product = await Product.findOne({ productCode });
    if (product) {
      return res.status(409).send("Product already exist!");
    }
    const newProduct = await Product.create(req.body);
    newProduct.tags.push(newProduct.title.toLowerCase());
    newProduct.tags.push(newProduct.brand.toLowerCase());
    newProduct.tags.push(newProduct.gender.toLowerCase());
    await newProduct.save();
    if (!newProduct) {
      return res
        .status(409)
        .json(new ApiResponse(409, "Unable to Add Product"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, newProduct, "Product Added Successfully!"));
  } catch (error) {
    console.log(error);
    throw new ApiError(409, "Product addition failed!");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productCode } = req.body;
    const product = await Product.findOne({ productCode });
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedProduct) {
      throw new ApiError(409, "Can't find product!");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, { updatedProduct }, "Product updated successfully")
      );
  } catch (error) {
    throw new ApiError(409, "Product Updation failed");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productID } = req.body;
    const deleted_product = await Product.findByIdAndDelete({ _id: productID });
    if (!deleted_product) {
      throw new ApiError("invalid product id");
    }
    return res.json(
      new ApiResponse(200, { deleted_product }, "Product Deleted Successfully")
    );
  } catch (err) {
    console.log(err);
  }
};

const getRecentProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(5);
    if (!products || products.length === 0) {
      return res.json(new ApiResponse(404, "No products found"));
    }
    return res.json(new ApiResponse(200, products, "Products found"));
  } catch (error) {
      return new ApiError(404, "No products found");
  }
};

const getProductById = async (req, res) => {
  try {
    const { productID } = req.body;
    const product = await Product.findOne({ _id: productID });

    if (!product) {
      res.json(new ApiError(404, "Invalid product id , product not found"));
    }

    res.json(new ApiResponse(200, product, "product fetched successfully."));
  } catch (err) {
    console.log(err);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(new ApiResponse(200, products, "products fetched successfully"));
  } catch (err) {
    console.log(err);
  }
};

export {
  addProduct,
  updateProduct,
  deleteProduct,
  addProductImage,
  getRecentProducts,
  getProductById,
  getAllProducts,
};
