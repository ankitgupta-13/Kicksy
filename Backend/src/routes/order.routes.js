import {Router} from "express";
import { addToOrderHistory } from "../controllers/order.controllers.js";

const router = Router();

router.route("/add").post(addToOrderHistory);

export default router; 