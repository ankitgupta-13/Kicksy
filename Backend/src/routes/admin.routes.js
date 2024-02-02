import { Router } from "express";
import {
  addProduct,
  updateProduct,
} from "../controllers/product.controllers.js";

const router = Router();

router.route("/add-product").post(addProduct);
router.route("/update-product").post(updateProduct);
// router.route("/update-product").post(updateProduct);
export default router;
