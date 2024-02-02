import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addProduct = async (req, res) => {
  const { productID } = req.body;

  try {
    const product = await Product.findOne({ productID });
    if (product) {
      const updatedProduct = await Product.findOneAndUpdate(
        product.productID,
        {
          $inc: { quantity: 1, "product.quantity": 1 },
        },
        { new: true }
      );
      return res
        .status(201)
        .json(
          new ApiResponse(
            200,
            updatedProduct,
            "Product Quantity Updated Successfully!"
          )
        );
    }
    const newProduct = await Product.create(req.body);
    if (!newProduct)
      throw new ApiError(409, "Unable to Add Product")
        .status(200)
        .json(new ApiResponse(200, newProduct, "Product Added Successfully!"));
  } catch (error) {
    throw new ApiError(409, error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productID } = req.body;
    const product = await Product.findOne({ productID });
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
    const deleted_product = await Product.findByIdAndDelete({ _id:productID });
    if (!deleted_product) {
      throw new ApiError("invalid product id");
    }
    return res.json(new ApiResponse(200 , {deleted_product} , "Product Deleted Successfully"))
  }
  catch (err) {
    console.log(err);
  }
}

export { addProduct, updateProduct ,deleteProduct};
