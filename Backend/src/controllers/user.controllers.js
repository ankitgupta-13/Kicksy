import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
    res.json(new ApiError(400, "Error generating token! ", err));
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;
    const userexist = await User.findOne({ email });
    if (userexist) {
      throw new ApiError(409, "User with same email aleady exists!");
    }
    const user = await User.create({
      username,
      email,
      mobile,
      password,
    });
    const createdUser = await User.findById(user._id).select("-password");

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User succesfully created!"));
  } catch (err) {
    console.log(err);
    res.json(new ApiError(400, "Error registering user ", err));
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      throw new ApiError(410, "All fields are required!");
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.json(new ApiError(404, "User does not exist!"));
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.json(new ApiError(401, "Password incorrect!"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
  } catch (err) {
    console.log(err);
    res.json(new ApiError(400, "Error logging in user ", err));
  }
};

const getCurrentUser = async (req, res) => {
  try {
    return res
      .status(200)
      .json(new ApiResponse(200, req.user, "User found successfully!"));
  } catch (err) {
    res.json(new ApiError(400, "Error getting user "));
  }
};

const logoutUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $unset: { refreshToken: "" },
      },
      {
        new: true,
      }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, "You have been logged out successfully"));
  } catch (error) {
    res.json(new ApiError(400, "An error occured during logout"));
  }
};

const addToCart = async (req, res) => {
  try {
    const { userID, productID } = req.body;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      throw new ApiError(400, "invalid user id");
    }
    const updatedCart = await user.addToCart(productID);
    res.json(new ApiResponse(200, updatedCart, "cart updated"));
  } catch (err) {
    console.log(err);
    res.json(new ApiError(400, "Error adding to cart ", err));
  }
};

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
          cart: productID,
        },
      }
    );
    await user.save();
    res.json(new ApiResponse(200, updatedCart, "cart updated"));
  } catch (err) {
    console.error(err);
    res.json(new ApiError(400, "Error deleting from cart ", err));
  }
};

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
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  addToCart,
  deleteFromCart,
  addListName,
  addToList,
  removeList,
  removeFromList,
};
