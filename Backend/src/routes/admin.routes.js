import { Router } from "express";
import {
  addProduct,
  addProductImage,
  updateProduct,
  deleteProduct,
  getProducts,
  handleProductStock,
  getProductsCount,
  deleteProductImage,
} from "../controllers/product.controllers.js";

import { upload } from "../middlewares/multer.middlewares.js";

import {
  addBlog,
  attachProductToBlog,
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
  getUsersCount,
} from "../controllers/admin.controllers.js";

import {
  acceptSellerRequest,
  declineSellerRequest,
  getSellerRequests,
  getSellers,
} from "../controllers/admin-seller.controllers.js";

import {
  addOfferToProduct,
  addProductViaOffer,
  getProductRequests,
} from "../controllers/admin-product.controllers.js";
import { addImagesToProductRequest } from "../controllers/seller.controllers.js";

const router = Router();

router.route("/create-admin").post(createAdmin);
router.route("/check-admin").post(checkAdmin);
router.route("/fetch-admins").post(fetchAdmins);
router.route("/add-product-image").post(upload.array("image"), addProductImage);
router.route("/add-product").post(addProduct);
router.route("/update-stock").post(handleProductStock);
router.route("/update-product").post(updateProduct);
router.route("/delete-product").post(deleteProduct);
router.route("/delete-product-image").post(deleteProductImage);
router.route("/add-blog").post(addBlog);
router.route("/edit-blog-image").post(upload.single("image"), editBlogImage);
router.route("/edit-blog-body").post(editBlogBody);
router.route("/attach-product-to-blog").post(attachProductToBlog);
router.route("/delete-blog").post(deleteBlog);
router.route("/fetch-blog/id").post(fetchBlogById);
router.route("/fetch-blogs").get(fetchAllBlog);
router.route("/get-users").get(getUsers);
router.route("/get-products").get(getProducts);
router.route("/change-user-state").post(changeUserState);
router.route("/total-active-users").get(getActiveUsersCount);
router.route("/total-products-count").get(getProductsCount);
router.route("/total-users-count").get(getUsersCount);

// routes for handling seller requests
router.route("/get-sellers").get(getSellers);
router.route("/get-seller-requests").get(getSellerRequests);
router.route("/accept-seller-request").post(acceptSellerRequest);
router.route("/decline-seller-request").post(declineSellerRequest);

// routes for handling product requests
router
  .route("/add-product-image")
  .post(upload.array("image"), addImagesToProductRequest);
router.route("/get-product-requests").get(getProductRequests);
router.route("/requests/product/add-offer-to-product").get(addOfferToProduct);

// router.route("/requests/product/add-product-via-offer").get(addProductViaOffer);

export default router;
