import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";

import {
  sellerRequest,
  productAddRequest,
  addOfferToProduct,
  addImagesToProductRequest,
} from "../controllers/seller.controllers.js";

const router = Router();

router.route("/create-request/seller").post(upload.single("storeLogo"), sellerRequest);
router.route("/create-request/product").post(productAddRequest); // raise a request to add a product.
router.route("/add-product-image").post(upload.array("image"), addImagesToProductRequest); // add images to the product request
router.route("/add-offer-to-product").post(addOfferToProduct);




export default router;
