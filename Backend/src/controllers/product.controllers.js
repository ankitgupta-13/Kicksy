import { Blog } from "../models/blog.model.js";
import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnAws } from "../utils/aws.js";
import fs from "fs";

const addProductImage = async (req, res) => {
  const productImageUrl = await uploadOnAws(req.file.path);
  if (!productImageUrl) {
    return res.send(new ApiError(500, "Upload Failed"));
  }
  fs.unlinkSync(req.file.path);
  return res.json(new ApiResponse(200, productImageUrl, "Upload Success"));
};

const addProduct = async (req, res) => {
  const { productID } = req.body;

  try {
    const product = await Product.findOne({ productID });
    if (product) {
      return res.status(409).send("Product already exist!");
    }
    const newProduct = await Product.create(req.body);
    if (!newProduct) {
      return res.status(409).json(new ApiError(409, "Unable to Add Product"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, newProduct, "Product Added Successfully!"));
  } catch (error) {
    throw new ApiError(409, "Product addition failed!");
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

const addBlog = async (req, res) => {
  const { productID, location, content } = req.body;
  console.log(req.file.path);
  try {
    const blogImageUrl = await uploadOnAws(req.file.path);
    if (!blogImageUrl) {
      fs.unlinkSync(req.file.path);
      throw new ApiError(400, "unable to upload image.")
    }
    fs.unlinkSync(req.file.path);
    const product = await Product.findOne({ _id: productID });

    if (!product) throw new ApiError(404, "product not found.");
    
    if (!location) {
      console.warn("Location not specified , image will be aligned to left by default!");
      const blog = new Blog({
        productID,
        imageurl: {
          url: blogImageUrl
        },
        content
      })
    
      await blog.save();
      product.blogs.push(blog._id);
      await product.save();
    
    }
    else {
      const blog = new Blog({
        productID,
        imageurl: {
          url: blogImageUrl,
          location
        },
        content
      })
    
      await blog.save();
      product.blogs.push(blog._id);
      await product.save()
    
    }
  }
  catch (err) {
    throw new ApiError(400, "Error adding blog", err.message);
  }
}

const editBlog = async (req, res) => {
  const {blodID , imageID} = req.body;
  
}



export {
  addProduct,
  updateProduct,
  deleteProduct,
  addProductImage,
  addBlog,
  editBlog
};
