import { Router } from "express";
import {
  addProduct,
  addProductImage,
  updateProduct,
  deleteProduct,
  addBlog,
  editBlog,
} from "../controllers/product.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/add-product-image")
  .post(upload.single("productImage"), addProductImage);

router.route("/add-product").post(addProduct);
router.route("/update-product").post(updateProduct);
router.route("/delete-product").post(deleteProduct);

router.route("/add-blog").post(upload.single("blogImage"), addBlog);

router.route("/edit-blog").post(upload.single("editedBlogImage"), editBlog);

// router.route("/update-product").post(updateProduct);
export default router;
