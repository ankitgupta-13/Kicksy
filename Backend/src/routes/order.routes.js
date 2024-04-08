import { Router } from "express";
import {
    addOrder,
    getOrderByID,
    orderTracking
} from "../controllers/order.controllers.js";

const router = Router();

router.route("/add-order").post(addOrder);
router.route("/order-tracking").post(orderTracking);
router.route("/get-order/id").post(getOrderByID);

export default router; 