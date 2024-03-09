import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";

import {
  addProductViaOffer,
  sellerRequest,
  getAllRequests,
  productAddRequest,
} from "../controllers/seller.controllers.js";

const router = Router();

router.route("/request-seller").post(upload.single("storeLogo"), sellerRequest);
router.route("/create-request").post(productAddRequest);
router.route("/fetch-requests").post(getAllRequests);
router.route("/accept-request").post(addProductViaOffer);

export default router;
