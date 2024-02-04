import { Router } from "express";
import {
    addListName,
    addToCart,
    addToList,
    deleteFromCart,
    loginUser,
    registerUser,
    removeFromList,
    removeList
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/add-to-cart").post(addToCart);
router.route("/delete-from-cart").post(deleteFromCart);
router.route("/add-list-name").post(addListName);
router.route("/add-to-list").post(addToList);
router.route("/remove-list").post(removeList);
router.route("/remove-product-from-list").post(removeFromList);

export default router;
