import { Router } from "express";
import { addOrder } from "../controllers/order.controllers.js";

const router = Router();

router.route("/add-order").post(addOrder);

export default router; 