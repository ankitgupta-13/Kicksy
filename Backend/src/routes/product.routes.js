import {Router} from "express";
import { fetchOffers } from "../controllers/product.controllers.js";

const router = Router();

router.route("/fetch-offers").post(fetchOffers);

export default router;