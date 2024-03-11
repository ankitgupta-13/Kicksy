import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";

import {
  sellerRequest,
  productAddRequest,
} from "../controllers/seller.controllers.js";

const router = Router();

router
  .route("/create-request/seller")
  .post(upload.single("storeLogo"), sellerRequest);
router.route("/create-request/product").post(productAddRequest); // raise a request to add a product.

export default router;
