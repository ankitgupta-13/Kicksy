import { Router } from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controllers.js";

const router = Router();

router.route("/add-product").post(addProduct);
router.route("/update-product").post(updateProduct);
router.route("/delete-product").post(deleteProduct);
// router.route("/update-product").post(updateProduct);
export default router;
