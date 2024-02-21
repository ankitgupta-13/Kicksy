import { Router } from "express";
import {
  addProduct,
  addProductImage,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/product.controllers.js";

import { upload } from "../middlewares/multer.middlewares.js";

import {
  addBlog,
  deleteBlog,
  editBlogBody,
  editBlogImage,
  fetchAllBlog,
  fetchBlogById,
} from "../controllers/blog.controllers.js";

import {
  checkAdmin,
  createAdmin,
  getAllUsers,
} from "../controllers/admin.controllers.js";

const router = Router();

router.route("/create-admin").post(createAdmin);
router.route("/check-admin").post(checkAdmin);
router.route("/add-product-image").post(upload.array("image"), addProductImage);
router.route("/add-product").post(addProduct);
router.route("/update-product").post(updateProduct);
router.route("/delete-product").post(deleteProduct);
router.route("/add-blog").post(addBlog);
router.route("/edit-blog-image").post(upload.single("image"), editBlogImage);
router.route("/edit-blog").post(editBlogBody);
router.route("/delete-blog").post(deleteBlog);
router.route("/fetch-blog").post(fetchBlogById);
router.route("/get-all-users").get(getAllUsers);
router.route("/get-all-products").get(getAllProducts);
router.route("/fetch-blog/all").get(fetchAllBlog);

export default router;
