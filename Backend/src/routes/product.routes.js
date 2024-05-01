import {Router} from "express";
import { filterProduct } from "../controllers/product.controllers.js";

const router = Router();

router.route('/filter-product').post(filterProduct)


export default router;