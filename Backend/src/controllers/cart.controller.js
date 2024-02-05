import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const addToCart = async (req, res) => {
    try {
        const { userID, productID } = req.body;
        const user = await User.findOne({ _id: userID });
        if (!user) {
            throw new ApiError(400, "invalid user id");
        }
        const updatedCart = await user.addToCart(productID);
        res.json(new ApiResponse(200, updatedCart, "cart updated"));
    }
    catch (err) {
        console.log(err);
        res.json(new ApiError(400, "Error adding to cart ", err));
    }
}

const deleteFromCart = async (req, res) => {
    try {
        const { userID, productID } = req.body;
        const user = await User.findOne({ _id: userID });
        if (!user) {
            throw new ApiError(400, "invalid user id");
        }
        const updatedCart = await User.findByIdAndUpdate(
            { _id: userID },
            {
                $pull: {
                    cart: productID
                }
            });
        await user.save()
        res.json(new ApiResponse(200, updatedCart, "cart updated"));
    }
    catch (err) {
        console.error(err);
        res.json(new ApiError(400, "Error deleting from cart ", err));
    }
}

const addListName = async (req, res) => {
    try {
        const { userID, listName } = req.body;
        const updatedUser = await User.findByIdAndUpdate({ _id: userID }, { $push: { wishlist: { listName } } });
        res.json(new ApiResponse(200, updatedUser, "wishlist name added"));
    }
    catch (error) {
        console.log(error);
    }
}

const addToList = async (req, res) => {
    try {
        const { userID, productID, listID } = req.body;
        const user = await User.findOne({ _id: userID })
        if (!user) {
            throw new ApiError(400, "invalid user id");
        }
        const updatedList = await user.addToList(listID, productID);
        res.json(new ApiResponse(200, updatedList, "item added to list"))
    }
    catch (error) {
        throw new ApiError(400, "error while adding to wishlist", error);
    }
}

const removeList = async (req, res) => {
    try {
        const { userID, listID } = req.body;
        const user = await User.findOne({ _id: userID });
        if (!user) {
            throw new ApiError(404, "Invalid userID");
        }
        const updatedWishlist = await user.removeList(listID);
        res.json(new ApiResponse(200, updatedWishlist));
    }
    catch (error) {
        throw new ApiError(400, "unable to remove list", error);
    }
}

const removeFromList = async (req, res) => {
    try {
        const { userID, listID, productID } = req.body;
        const user = await User.findOne({ _id: userID });
        if (!user) {
            throw new ApiError(404, "Invalid user id, user not found!");
        }
        const updatedList = await user.removeProductFromList(listID, productID);
        res.json(new ApiResponse(200, updatedList));

    }
    catch (err) {
        throw new ApiError(400, "Error while removing the product from the list.", err);
    }
}

export {
    addToCart,
    addListName,
    addToList,
    deleteFromCart,
    removeFromList,
    removeList
}