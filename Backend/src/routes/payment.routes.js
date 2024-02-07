import { Router } from "express";
import {
    makePayment,
    verifyPayment,
    getKey
} from "../controllers/payment.controller.js";

const router = Router();

router.route("/make-payment").post(makePayment);
router.route("/verify-payment").post(verifyPayment);
router.route("/get-key").get(getKey);

export default router;