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
  editBlog,
  fetchBlog,
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
router.route("/edit-blog").post(editBlog);
router.route("/delete-blog").post(deleteBlog);
router.route("/fetch-blog").post(fetchBlog);
router.route("/get-all-users").get(getAllUsers);
router.route("/get-all-products").get(getAllProducts);
export default router;
