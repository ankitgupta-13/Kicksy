import { Router } from "express";
import {
  addProduct,
  addProductImage,
  updateProduct,
  deleteProduct,
  getProducts,
  handleProductStock,
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
  changeUserState,
  checkAdmin,
  createAdmin,
  getActiveUsersCount,
  getUsers,
  fetchAdmins,
} from "../controllers/admin.controllers.js";

const router = Router();

router.route("/create-admin").post(createAdmin);
router.route("/check-admin").post(checkAdmin);
router.route("/fetch-admins").post(fetchAdmins);
router.route("/add-product-image").post(upload.array("image"), addProductImage);
router.route("/add-product").post(addProduct);
router.route("/update-stock").post(handleProductStock);
router.route("/update-product").post(updateProduct);
router.route("/delete-product").post(deleteProduct);
router.route("/add-blog").post(addBlog);
router.route("/edit-blog-image").post(upload.single("image"), editBlogImage);
router.route("/edit-blog-body").post(editBlogBody);
router.route("/delete-blog").post(deleteBlog);
router.route("/fetch-blog/id").post(fetchBlogById);
router.route("/fetch-blogs").get(fetchAllBlog);
router.route("/get-users").get(getUsers);
router.route("/get-products").get(getProducts);
router.route("/change-user-state").post(changeUserState);
router.route("/total-active-users").get(getActiveUsersCount);

export default router;
