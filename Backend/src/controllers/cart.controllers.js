import { Cart } from "../models/cart.models.js";
import { Offer } from "../models/offer.model.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addToCart = async (req, res) => {
  try {
    const { userID, productID, sellerID } = req.body;
    if (!userID || !productID) return res.json(new ApiResponse(401, "Fields are required"));

    const cart = await Cart.findOne({ user: userID });
    const offer = await Offer.findOne({ productID, sellerID });
    console.log(offer);
    cart.cartTotal += offer.price;

    // If user does not have a cart, create a new cart and add the product to it
    if (!cart) {
      const newCart = new Cart({
        user: userID,
        items: [{ product: productID, sellerID }],
      });

      newCart.cartTotal += offer.price;

      await newCart.save();

      const user = await User.findOne({ _id: userID });

      if (!user) return res.json(new ApiResponse(404, 'user not found'));

      user.cart = newCart._id
      await user.save()

      return res.json(new ApiResponse(200, newCart, "Product added to cart"));
    }
    // If product is already present in the cart increase the quantity by one
    const index = cart.items.findIndex((item) => {
      return item["product"]["_id"].equals(productID);
    });
    if (index !== -1) {
      cart.items[index].quantity += 1;
      // cart.cartTotal += offer.price
      await cart.save();

      return res.json(
        new ApiResponse(
          200,
          { cart, offer },
          "Product added to cart, quantity increased by 1"
        )
      );
    }
    // if product is not present in the cart, add the product to the cart
    cart.items = cart.items.concat({ product: productID, sellerID });
    await cart.save();
    return res.json(new ApiResponse(200, { cart }, "Product added to cart"));
  } catch (err) {
    console.error(err);
    res.json(new ApiError(400, "Error adding to cart ", err));
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userID, productID } = req.body;

    if (!userID || !productID) {
      return res.json(
        new ApiResponse(400, "Fields 'userID' and 'productID' are required")
      );
    }

    const cart = await Cart.findOne({ user: userID });
    if (!cart) {
      return res.json(new ApiResponse(404, "Cart not found"));
    }

    const userCart = await Cart.findByIdAndUpdate(
      cart._id,
      { $pull: { items: { product: productID } } },
      { new: true }
    );

    const index = cart.items.findIndex((item) =>
      item.product.equals(productID)
    );

    if (index !== -1) {
      const offer = await Offer.findOne({
        productID,
        sellerID: cart.items[index]["sellerID"],
      });
      console.log(offer);

      cart.cartTotal -= offer.price;
    } else {
    }

    await cart.save();

    return res.json(
      new ApiResponse(200, "Product removed from cart", { cart, userCart })
    );
  } catch (error) {
    console.error("Error removing from cart:", error);
    return res.json(new ApiError(500, "Internal server error", error));
  }
};

const addSubtractCartQuantity = async (req,res)=>{
  try{
    const {userID , productID , operator} = req.body;
    if(!userID||!productID||!operator) return res.json(new ApiResponse(422 , "Insufficient IDs in the body sent to the backend "))
    
    if(operator !== "+"||operator !== "-") return res.json(new ApiResponse(422 , "Invalid Operator!"));
  
  }
  catch(err){

  }
}

const getCartByUser = async (req, res) => {
  try {
    const { userID } = req.body;
    if (!userID) {
      return res.json(new ApiResponse(400, "userID is required"));
    }
    const cart = await Cart.findOne({ user: userID });
    if (!cart) {
      return res.json(new ApiResponse(404, "Cart not found"));
    }
    return res.json(new ApiResponse(200, cart, "Cart found"));
  } catch (error) {
    console.error("Error getting cart:", error);
    return res.json(
      new ApiError(500, "Error getting user cart details", error)
    );
  }
};

// const deleteFromCart = async (req, res) => {
//   try {
//     const { userID, productID } = req.body;

//     if (!userID || !productID) {
//       return res.json(
//         new ApiResponse(400, "Fields 'userID' and 'productID' are required")
//       );
//     }

//     const cart = await Cart.findOne({ user: userID });
//     if (!cart) {
//       return res.status(404).json({ error: "Cart not found for this user" });
//     }

//     const updatedCart = await Cart.findByIdAndUpdate(
//       cart._id,
//       {
//         $pull: { items: { product: productID } },
//       },
//       { new: true }
//     );

//     return res
//       .status(200)
//       .json({ cart: updatedCart, message: "Product removed from cart" });
//   } catch (error) {
//     console.error("Error deleting from cart:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

const addListName = async (req, res) => {
  try {
    const { userID, listName } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userID },
      { $push: { wishlist: { listName } } }
    );
    res.json(new ApiResponse(200, updatedUser, "wishlist name added"));
  } catch (error) {
    console.log(error);
  }
};

const addToList = async (req, res) => {
  try {
    const { userID, productID, listID } = req.body;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      throw new ApiError(400, "invalid user id");
    }
    const updatedList = await user.addToList(listID, productID);
    res.json(new ApiResponse(200, updatedList, "item added to list"));
  } catch (error) {
    throw new ApiError(400, "error while adding to wishlist", error);
  }
};

const removeList = async (req, res) => {
  try {
    const { userID, listID } = req.body;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      throw new ApiError(404, "Invalid userID");
    }
    const updatedWishlist = await user.removeList(listID);
    res.json(new ApiResponse(200, updatedWishlist));
  } catch (error) {
    throw new ApiError(400, "unable to remove list", error);
  }
};

const removeFromList = async (req, res) => {
  try {
    const { userID, listID, productID } = req.body;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      throw new ApiError(404, "Invalid user id, user not found!");
    }
    const updatedList = await user.removeProductFromList(listID, productID);
    res.json(new ApiResponse(200, updatedList));
  } catch (err) {
    throw new ApiError(
      400,
      "Error while removing the product from the list.",
      err
    );
  }
};

export {
  addToCart,
  removeFromCart,
  // deleteFromCart,
  getCartByUser,
  addListName,
  addToList,
  removeFromList,
  removeList,
};
