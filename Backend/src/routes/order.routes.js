import {Router} from "express";
import { addOrder, addToOrderHistory } from "../controllers/order.controllers.js";

const router = Router();

router.route("/add").post(addToOrderHistory);
router.route("/add-order").post(addOrder);

export default router; 