import { Router } from "express";

import {
    loginUser,
    registerUser,
    verifyOtp,
} from "../controllers/user.controllers.js";

import {
    addListName,
    addToCart,
    addToList,
    deleteFromCart,
    removeFromList,
    removeList
} from "../controllers/cart.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/verify-otp").post(verifyOtp);
router.route("/login").post(loginUser);
router.route("/add-to-cart").post(addToCart);
router.route("/delete-from-cart").post(deleteFromCart);
router.route("/add-list-name").post(addListName);
router.route("/add-to-list").post(addToList);
router.route("/remove-list").post(removeList);
router.route("/remove-product-from-list").post(removeFromList);

export default router;
