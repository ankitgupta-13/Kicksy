import { Router } from "express";
import {
  addProduct,
  addProductImage,
  updateProduct,
} from "../controllers/product.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/add-product-image")
  .post(upload.single("productImage"), addProductImage);
router.route("/add-product").post(addProduct);
router.route("/update-product").post(updateProduct);
export default router;
